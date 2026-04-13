const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2'); // Added to check connection on start
const authRoutes = require('./routes/authRoutes');

// 1. Load environment variables
dotenv.config();

const app = express();

// 2. Optimized Middlewares
app.use(cors({
    origin: "http://127.0.0.1:5173", // Updated to match your Vite host
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json()); 

// 3. Database Connection Check (Helpful for debugging ECONNREFUSED)
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "mern_auth_db"
});

db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed: " + err.stack);
        return;
    }
    console.log("✅ Connected to MySQL Database");
});

// 4. Routes
app.get('/', (req, res) => {
    res.send("Backend Server is running successfully!");
});

// Use the auth routes for /register and /login
app.use('/api/auth', authRoutes);

// 5. Global Error Handler (Good for assignment marks!)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ Status: "Error", Message: "Something went wrong on the server!" });
});

// 6. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});