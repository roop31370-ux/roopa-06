const db = require('../config/db'); // Your MySQL connection

// GET all items for the logged-in user
exports.getItems = (req, res) => {
  const sql = "SELECT * FROM items WHERE user_id = ?";
  db.query(sql, [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// CREATE a new item
exports.createItem = (req, res) => {
  const { title, description } = req.body;
  const sql = "INSERT INTO items (title, description, user_id) VALUES (?, ?, ?)";
  db.query(sql, [title, description, req.user.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Item added to MySQL!", id: result.insertId });
  });
};

// DELETE an item
exports.deleteItem = (req, res) => {
  const sql = "DELETE FROM items WHERE id = ? AND user_id = ?";
  db.query(sql, [req.params.id, req.user.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Item deleted!" });
  });
};