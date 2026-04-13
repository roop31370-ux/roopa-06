const express = require('express');
const router = express.Router();
const { getItems, createItem, deleteItem } = require('../controllers/itemController');
const verifyToken = require('../middleware/authMiddleware'); // Protects the routes

// All these routes require a valid login token
router.get('/', verifyToken, getItems);
router.post('/', verifyToken, createItem);
router.delete('/:id', verifyToken, deleteItem);

module.exports = router;