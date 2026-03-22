const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Conexión a MariaDB
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

//registro
app.post("/register", async (req, res) => {

    console.log("BODY RECIBIDO:", req.body);

    const { username, email, phone, password } = req.body;

    if (!username || !email || !phone || !password) {
        console.log("FALTAN DATOS");
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users (username, email, phone, password)
            VALUES (?, ?, ?, ?)
        `;

        db.query(sql, [username, email, phone, hashedPassword], (err, result) => {

            if (err) {
                console.error("SQL ERROR:", err);
                return res.status(500).json({ message: "Database error" });
            }

            console.log("USUARIO INSERTADO CORRECTAMENTE");
            res.json({ message: "User registered successfully" });
        });

    } catch (error) {
        console.error("SERVER ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// LOGIN USUARIO
app.post("/loginUser", (req, res) => {
    const { input, password } = req.body;

    if (!input || !password) return res.status(400).json({ message: "All fields are required" });

    const sql = `SELECT * FROM users WHERE (email = ? OR username = ?) AND role = 'user'`;

    db.query(sql, [input, input], async (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (results.length === 0) return res.status(401).json({ message: "User not found" });

        const user = results[0];
        let match = false;

        if (user.password.startsWith("$2b$")) {
            match = await bcrypt.compare(password, user.password);
        } else {
            // Si no, compara en texto plano
            match = password === user.password;
        }

        if (!match) return res.status(401).json({ message: "Invalid credentials" });



        res.json({
            message: "Login successful",
            user: { id: user.id, username: user.username, role: user.role }
        });
    });
});

// LOGIN ADMIN
app.post("/loginAdmin", (req, res) => {
    const { input, password } = req.body;

    if (!input || !password) return res.status(400).json({ message: "All fields are required" });

    const sql = `SELECT * FROM users WHERE (email = ? OR username = ?) AND role = 'admin'`;

    db.query(sql, [input, input], async (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (results.length === 0) return res.status(401).json({ message: "Admin not found" });

        const admin = results[0];
        const match = await bcrypt.compare(password, admin.password);
        if (!match) return res.status(401).json({ message: "Invalid credentials" });

        res.json({
            message: "Admin login successful",
            user: { id: admin.id, username: admin.username, role: admin.role }
        });
    });
});
//membresias
app.get("/memberships", (req, res) => {
    const sql = "SELECT * FROM affiliation";
    db.query(sql, (err, rows) => {
        if (err) {
            console.error("MYSQL ERROR:", err);
            return res.status(500).json({ message: "Error loading memberships" });
        }
        console.log("Memberships fetched:", rows);
        res.json(rows);
    });
});
app.post("/buyMembership", (req, res) => {
    const { planId, startDate, endDate } = req.body;
    const user = JSON.parse(req.headers['user'] || '{}');

    if (!user || !user.id) return res.status(401).json({ message: "Debes iniciar sesión" });

    const sql = `INSERT INTO purchases (user_id, plan_id, start_date, end_date) VALUES (?, ?, ?, ?)`;
    db.query(sql, [user.id, planId, startDate, endDate], (err, result) => {
        if (err) {
            console.error("MYSQL ERROR:", err);
            return res.status(500).json({ message: "Error al guardar la compra" });
        }
        res.json({ message: "Compra realizada correctamente" });
    });
});
//purchase
app.post("/purchase", (req, res) => {

    console.log("PETICION DE COMPRA RECIBIDA")
    console.log("BODY RECIBIDO:", req.body)

    const { user_id, plan_id, start_date, end_date, quantity } = req.body

    if (!user_id || !plan_id || !start_date || !end_date) {
        console.log("FALTAN DATOS")
        return res.json({ success: false })
    }

    const sql = `
        INSERT INTO purchases
        (user_id, plan_id, start_date, end_date, quantity)
        VALUES (?, ?, ?, ?, ?)
    `

    db.query(sql, [user_id, plan_id, start_date, end_date, quantity], (err, result) => {

        if (err) {
            console.error("MYSQL ERROR:", err)
            return res.json({ success: false })
        }

        console.log("COMPRA GUARDADA")
        console.log("ID DE COMPRA:", result.insertId)

        res.json({
            success: true,
            purchase_id: result.insertId
        })

    })
})
app.post("/validate-ticket", (req, res) => {

    const { purchase_id } = req.body;

    const query = "SELECT * FROM purchases WHERE purchase_id = ?";

    db.query(query, [purchase_id], (err, results) => {

        if (err) {
            return res.status(500).json({ success: false });
        }

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

        const updateQuery =
            "UPDATE purchases SET used = TRUE, used_at = NOW() WHERE purchase_id = ?";

        db.query(updateQuery, [purchase_id]);

        res.json({
            success: true,
            message: "Acceso permitido"
        });

    });

});
//games
app.get("/api/games", (req, res) => {

    const sql = "SELECT * FROM games";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});
//restaurants
app.get("/api/restaurants", (req, res) => {

    const sql = "SELECT * FROM restaurants";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});

//events
app.get("/api/events", (req, res) => {

    const sql = `
        SELECT * 
        FROM events 
        WHERE NOW() BETWEEN start_date AND end_date
    `;

    db.query(sql, (err, results) => {

        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }

        res.json(results);

    });

});
// START SERVER
app.listen(3000, "0.0.0.0", () => {
    console.log("Server running on http://localhost:3000");
});