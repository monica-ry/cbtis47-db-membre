require('dotenv').config()
const mysql = require('mysql2')
const bcrypt = require('bcrypt')

const username = process.argv[2] || 'admin'
const email = process.argv[3] || username + '@mail.com'
const password = process.argv[4] || 'admin123'

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'membership_park'
})

;(async () => {
    const hash = await bcrypt.hash(password, 10)
    db.query(
        'INSERT INTO USERS (username, email, phone, password, role) VALUES (?, ?, ?, ?, ?)',
        [username, email, '0000000000', hash, 'admin'],
        (err, res) => {
            if (err) return console.error('Error:', err.sqlMessage || err.message)
            console.log('Admin created successfully!')
            console.log('Username:', username)
            console.log('Password:', password)
            process.exit(0)
        }
    )
})()
