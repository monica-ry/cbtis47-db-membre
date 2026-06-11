const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ----------------------
// DB CONNECTION
// ----------------------
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'chachas01',
    database: 'membership_park',
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
// START SERVER
// ----------------------
app.listen(4000, "0.0.0.0", () => {
    console.log("Server running on http://localhost:4000");
});