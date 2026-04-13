const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ✅ REGISTER
exports.register = async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, phone || null]
        );

        return res.status(201).json({
            Status: "Success",
            message: "User registered successfully"
        });

    } catch (err) {
        console.error("Register Error:", err);
        return res.status(500).json({ error: "Server error during registration" });
    }
};

// ✅ LOGIN
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(400).json({ error: "User not found" });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user.id },
            "roopa_secret_key_2026",
            { expiresIn: "1d" }
        );

        return res.json({
            Status: "Success",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ error: "Server error during login" });
    }
};

// ✅ FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) {
            return res.status(400).json({ error: "Email required" });
        }

        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json({
            Status: "Success",
            message: "Email verified"
        });
    } catch (err) {
        console.error("Forgot PW Error:", err);
        return res.status(500).json({ error: "Server error" });
    }
};

// ✅ RESET PASSWORD
exports.resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        if (!email || !newPassword) {
            return res.status(400).json({ error: "Email & password required" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const [result] = await db.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json({
            Status: "Success",
            message: "Password updated"
        });
    } catch (err) {
        console.error("Reset PW Error:", err);
        return res.status(500).json({ error: "Server error" });
    }
};

// ✅ GET USER
exports.getMe = async (req, res) => {
    return res.json({ user: req.user });
};