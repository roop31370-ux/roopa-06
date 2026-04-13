const express = require('express');
const router = express.Router();

// Import Controller & Middleware
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// 🔍 ROUTE HEALTH CHECK
// Test in browser: http://localhost:5000/api/auth/test
router.get('/test', (req, res) => {
  console.log("Health check hit!"); 
  res.json({ message: "Auth Routes are working!" });
});

// ✅ PUBLIC ROUTES
// These do not require a token
router.post('/register', (req, res, next) => {
    console.log("Register Attempt:", req.body.email);
    next();
}, authController.register);

router.post('/login', (req, res, next) => {
    console.log("Login Attempt:", req.body.email);
    next();
}, authController.login);

router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// 🔒 PROTECTED ROUTE
// authMiddleware checks for the JWT token before allowing access
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;