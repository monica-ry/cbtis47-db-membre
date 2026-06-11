require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const bcrypt = require('bcrypt');
const multer = require('multer');
const { Server } = require('socket.io');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, 'public', 'images')),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/[^a-zA-Z0-9._-]/g, ''))
});
const upload = multer({ storage });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));

// ----------------------
// DB CONNECTION
// ----------------------
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'chachas01',
    database: process.env.DB_NAME || 'membership_park',
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MariaDB');
});

// ----------------------
// TEST
// ----------------------
app.get("/test", (req, res) => {
    res.json({ ok: true });
});

// ----------------------
// REGISTER
// ----------------------
app.post("/register", async (req, res) => {

    const { username, email, phone, password } = req.body;

    // VALIDAR CAMPOS
    if (!username || !email || !phone || !password) {

        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {

        // ENCRIPTAR PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        // ROL POR DEFECTO
        const role = "user";

        // QUERY
        const sql = `
            INSERT INTO users
            (username, email, phone, password, role)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [username, email, phone, hashedPassword, role],
            (err, result) => {

                // ERROR MYSQL
                if (err) {

                    console.error("MYSQL REGISTER ERROR:", err);

                    // DUPLICADOS
                    if (err.code === "ER_DUP_ENTRY") {

                        return res.status(400).json({
                            message: "Email or username already exists"
                        });
                    }

                    return res.status(500).json({
                        message: "Database error",
                        error: err.message
                    });
                }

                // EXITO
                return res.json({
                    message: "User registered successfully"
                });
            }
        );

    } catch (error) {

        console.error("SERVER ERROR:", error);

        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

// ----------------------
// LOGIN USER
// ----------------------
app.post("/loginUser", (req, res) => {
    console.log("LOGIN REQUEST:", req.body);

    const { input, password } = req.body;

    const sql = `
        SELECT * FROM users 
        WHERE (email = ? OR username = ?) 
        AND role = 'user'
    `;

    db.query(sql, [input, input], async (err, results) => {

        if (err) return res.status(500).json({ message: "Database error" });
        if (results.length === 0) return res.status(401).json({ message: "User not found" });

        const user = results[0];

        let match = false;

        if (user.password.startsWith("$2b$")) {
            match = await bcrypt.compare(password, user.password);
        } else {
            match = password === user.password;
        }if (!match) return res.status(401).json({ message: "Invalid credentials" });

        
        return res.json({
            message: "Login successful",
            user: {
                id: user.id,
                username: user.username,
                email: user.email || "",   
                role: user.role
            }
        });
    });
});

// ----------------------
// LOGIN ADMIN
// ----------------------
app.post("/loginAdmin", (req, res) => {

    const { input, password } = req.body;

    const sql = `
        SELECT * FROM users 
        WHERE (email = ? OR username = ?) 
        AND role = 'admin'
    `;

    db.query(sql, [input, input], async (err, results) => {

        if (err) return res.status(500).json({ message: "Database error" });
        if (results.length === 0) return res.status(401).json({ message: "Admin not found" });

        const admin = results[0];

        const match = await bcrypt.compare(password, admin.password);

        if (!match) return res.status(401).json({ message: "Invalid credentials" });

        return res.json({
            message: "Admin login successful",
            user: {
                id: admin.id,
                username: admin.username,
                email: admin.email || "",  
                role: admin.role
            }
        });
    });
});

// ----------------------
// MEMBERSHIPS
// ----------------------
app.get("/memberships", (req, res) => {

    const sql = "SELECT * FROM affiliation";

    db.query(sql, (err, rows) => {

        if (err) {
            return res.status(500).json({ message: "Error loading memberships" });
        }

        res.json(rows);
    });
});

// ----------------------
// PURCHASE (SUBSCRIPTION FIXED)
// ----------------------
app.post("/purchase", (req, res) => {

    const {
        user_id,
        plan_id,
        start_date,
        end_date
    } = req.body;

    if (!user_id || !plan_id || !start_date || !end_date) {
        return res.json({
            success: false,
            error: "Missing data"
        });
    }

    const sql = `
        INSERT INTO subscription
        (start_date, finish_date, state, id_user, id_affiliation, used, used_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql,
        [
            start_date,
            end_date,
            "active",
            user_id,
            plan_id,
            0,
            null
        ],
        (err, result) => {

            if (err) {
                console.error(err);
                return res.json({
                    success: false,
                    error: err.message
                });
            }

            res.json({
                success: true,
                purchase_id: result.insertId
            });
        }
    );
});

// ----------------------
// VALIDATE TICKET (FIXED)
// ----------------------
app.post("/validate-ticket", (req, res) => {

    const { purchase_id } = req.body;

    const query = "SELECT * FROM subscription WHERE id = ?";

    db.query(query, [purchase_id], (err, results) => {

        if (err) return res.status(500).json({ success: false });

        if (results.length === 0) {
            return res.json({
                success: false,
                message: "Ticket no válido"
            });
        }

        const ticket = results[0];

        if (ticket.used) {
            return res.json({
                success: false,
                message: "Ticket ya fue utilizado"
            });
        }

        const update =
            "UPDATE subscription SET used = 1, used_at = NOW() WHERE id = ?";

        db.query(update, [purchase_id]);

        res.json({
            success: true,
            message: "Acceso permitido"
        });
    });
});

// ----------------------
// USER SUBSCRIPTIONS
// ----------------------
app.get("/api/user/subscriptions", (req, res) => {
    const userId = req.query.userId
    if (!userId) return res.status(400).json({ error: "userId is required" })

    const sql = `
        SELECT s.*, a.name as plan_name, a.price, a.duration, a.description, a.benefits
        FROM subscription s
        JOIN affiliation a ON s.id_affiliation = a.id
        WHERE s.id_user = ?
        ORDER BY s.created_at DESC
    `
    db.query(sql, [userId], (err, rows) => {
        if (err) return res.status(500).json(err)
        res.json(rows)
    })
})

// ----------------------
// OTHER MODULES
// ----------------------
app.get("/api/games", (req, res) => {

    db.query("SELECT * FROM games", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });

});

app.get("/api/restaurants", (req, res) => {

    db.query("SELECT * FROM restaurants", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });

});

app.get("/api/events", (req, res) => {

    const sql = `
        SELECT * FROM events 
        WHERE NOW() BETWEEN start_date AND end_date
    `;

    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });

});

//park-info
app.get("/park-info", (req, res) => {

    const query = "SELECT * FROM park_info LIMIT 1";

    db.query(query, (err, results) => {

        if (err) {
            console.error("DB ERROR:", err);
            return res.status(500).json({ error: err.message });
        }

        res.json(results);

    });

});

// ----------------------
// IMAGE UPLOAD
// ----------------------
app.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.file) return res.status(400).json({ success: false, error: "No file uploaded" });
    res.json({ success: true, filename: req.file.filename });
});

// ----------------------
// API ADMIN ENDPOINTS
// ----------------------

// Games CRUD
app.post("/api/admin/games", (req, res) => {
    const { name, description, image, status } = req.body;
    const sql = "INSERT INTO games (name, description, image, status) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, description, image, status || 'active'], (err, result) => {
        if (err) return res.json({ success: false, error: err.message });
        res.json({ success: true, id: result.insertId });
    });
});

app.put("/api/admin/games/:id", (req, res) => {
    const { name, description, image, status } = req.body;
    const sql = "UPDATE games SET name=?, description=?, image=?, status=? WHERE id=?";
    db.query(sql, [name, description, image, status, req.params.id], (err) => {
        if (err) return res.json({ success: false, error: err.message });
        res.json({ success: true });
    });
});

app.delete("/api/admin/games/:id", (req, res) => {
    db.query("DELETE FROM games WHERE id=?", [req.params.id], (err) => {
        if (err) return res.json({ success: false, error: err.message });
        res.json({ success: true });
    });
});

// Restaurants CRUD
app.post("/api/admin/restaurants", (req, res) => {
    const { name, type, description, image } = req.body;
    const sql = "INSERT INTO restaurants (name, type, description, image) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, type, description, image], (err, result) => {
        if (err) return res.json({ success: false, error: err.message });
        res.json({ success: true, id: result.insertId });
    });
});

app.put("/api/admin/restaurants/:id", (req, res) => {
    const { name, type, description, image } = req.body;
    const sql = "UPDATE restaurants SET name=?, type=?, description=?, image=? WHERE id=?";
    db.query(sql, [name, type, description, image, req.params.id], (err) => {
        if (err) return res.json({ success: false, error: err.message });
        res.json({ success: true });
    });
});

app.delete("/api/admin/restaurants/:id", (req, res) => {
    db.query("DELETE FROM restaurants WHERE id=?", [req.params.id], (err) => {
        if (err) return res.json({ success: false, error: err.message });
        res.json({ success: true });
    });
});

// Users list
app.get("/api/admin/users", (req, res) => {
    db.query("SELECT id, username, email, phone, role, created_at FROM users ORDER BY id ASC", (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Park Info update
app.put("/api/admin/parkinfo", (req, res) => {
    const { park_name, location, description, open_time, close_time, open_days, phone, email } = req.body;
    const sql = "UPDATE park_info SET park_name=?, location=?, description=?, open_time=?, close_time=?, open_days=?, phone=?, email=?, updated_at=NOW() WHERE id=1";
    db.query(sql, [park_name, location, description, open_time, close_time, open_days, phone, email], (err) => {
        if (err) return res.json({ success: false, error: err.message });
        res.json({ success: true });
    });
});

app.get("/api/memberships", (req, res) => {
    const sql = "SELECT * FROM affiliation";
    db.query(sql, (err, rows) => {
        if (err) return res.status(500).json({ message: "Error loading memberships" });
        res.json(rows);
    });
});

// Memberships CRUD
app.post("/api/admin/memberships", (req, res) => {
    const { name, price, duration, description, benefits } = req.body;
    const sql = "INSERT INTO affiliation (name, price, duration, description, benefits) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, price, duration, description, benefits], (err, result) => {
        if (err) return res.json({ success: false, error: err.message });
        res.json({ success: true, id: result.insertId });
    });
});

app.put("/api/admin/memberships/:id", (req, res) => {
    const { name, price, duration, description, benefits } = req.body;
    const sql = "UPDATE affiliation SET name=?, price=?, duration=?, description=?, benefits=? WHERE id=?";
    db.query(sql, [name, price, duration, description, benefits, req.params.id], (err) => {
        if (err) return res.json({ success: false, error: err.message });
        res.json({ success: true });
    });
});

app.delete("/api/admin/memberships/:id", (req, res) => {
    db.query("DELETE FROM affiliation WHERE id=?", [req.params.id], (err) => {
        if (err) return res.json({ success: false, error: err.message });
        res.json({ success: true });
    });
});

// Stats for admin dashboard
app.get("/api/admin/stats/games", (req, res) => {
    db.query("SELECT COUNT(*) as count FROM games", (err, rows) => res.json({ count: rows[0].count }));
});
app.get("/api/admin/stats/restaurants", (req, res) => {
    db.query("SELECT COUNT(*) as count FROM restaurants", (err, rows) => res.json({ count: rows[0].count }));
});
app.get("/api/admin/stats/users", (req, res) => {
    db.query("SELECT COUNT(*) as count FROM users WHERE role='user'", (err, rows) => res.json({ count: rows[0].count }));
});
app.get("/api/admin/stats/memberships", (req, res) => {
    db.query("SELECT COUNT(*) as count FROM affiliation", (err, rows) => res.json({ count: rows[0].count }));
});
app.get("/api/admin/stats/messages", (req, res) => {
    db.query("SELECT COUNT(*) as count FROM messages", (err, rows) => res.json({ count: rows[0].count }));
});

// ----------------------
// SOCKET.IO (REAL-TIME MESSAGES)
// ----------------------
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {

    // Register user
    socket.on("register_user", (username) => {
        socket.username = username;
        socket.join(username);
    });

    // Admin registers
    socket.on("register_admin", () => {
        socket.isAdmin = true;
        socket.join("admin");
    });

    // User sends a message
    socket.on("send_message", (data) => {
        const username = data.username || "Anonymous";
        const userQuery = "SELECT id FROM users WHERE username = ? LIMIT 1";
        db.query(userQuery, [username], (err, users) => {
            const userId = (users && users.length > 0) ? users[0].id : null;
            const insert = "INSERT INTO messages (user_id, message, from_admin, status) VALUES (?, ?, 0, 'pending')";
            db.query(insert, [userId, data.text], (err2, result) => {
                const msg = {
                    id: result ? result.insertId : Date.now(),
                    username,
                    text: data.text,
                    time: new Date().toLocaleTimeString(),
                    type: "user",
                };
                io.to("admin").emit("new_message", msg);
                socket.emit("message_sent", msg);
            });
        });
    });

    // Admin gets conversation list
    socket.on("get_conversations", () => {
        const sql = `
            SELECT u.username, m.message, m.timestamp
            FROM messages m
            JOIN users u ON m.user_id = u.id
            WHERE m.id IN (
                SELECT MAX(m2.id) FROM messages m2 GROUP BY m2.user_id
            )
            ORDER BY m.timestamp DESC
        `;
        db.query(sql, (err, rows) => {
            if (err) { socket.emit("conversations", []); return; }
            const convos = rows.map((r) => ({
                username: r.username,
                lastMessage: r.message,
                lastTime: new Date(r.timestamp).toLocaleTimeString(),
            }));
            socket.emit("conversations", convos);
        });
    });

    // Admin gets messages for a specific user
    socket.on("get_user_messages", (username) => {
        const sql = `
            SELECT m.id, m.message, m.from_admin, m.timestamp
            FROM messages m
            JOIN users u ON m.user_id = u.id
            WHERE u.username = ?
            ORDER BY m.timestamp ASC
        `;
        db.query(sql, [username], (err, rows) => {
            if (err) { socket.emit("user_messages", { username, messages: [] }); return; }
            const msgs = rows.map((r) => ({
                id: r.id,
                username: r.from_admin ? "Admin" : username,
                text: r.message,
                time: new Date(r.timestamp).toLocaleTimeString(),
                type: r.from_admin ? "admin" : "user",
            }));
            socket.emit("user_messages", { username, messages: msgs });
        });
    });

    // Admin replies to a user
    socket.on("admin_reply", (data) => {
        const userQuery = "SELECT id FROM users WHERE username = ? LIMIT 1";
        db.query(userQuery, [data.toUser], (err, users) => {
            const userId = (users && users.length > 0) ? users[0].id : null;
            const insert = "INSERT INTO messages (user_id, message, from_admin, status) VALUES (?, ?, 1, 'answered')";
            db.query(insert, [userId, data.text], (err2, result) => {
                const userMsg = {
                    id: result ? result.insertId : Date.now(),
                    username: "Admin",
                    text: data.text,
                    time: new Date().toLocaleTimeString(),
                    type: "admin",
                    toUser: data.toUser,
                };
                io.to(data.toUser).emit("admin_reply", userMsg);

                const adminMsg = {
                    id: userMsg.id,
                    username: data.toUser,
                    text: data.text,
                    time: userMsg.time,
                    type: "admin",
                };
                io.to("admin").emit("new_message", adminMsg);
            });
        });
    });

});

// ----------------------
// START SERVER
// ----------------------
const PORT = process.env.PORT || 4000;
server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
});