const express = require('express');
const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  const { email, username, password } = req.body;
  // TODO: Add database logic to create user
  res.status(201).json({ message: 'User created successfully' });
});

// Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // TODO: Add authentication & JWT logic
  res.status(200).json({ message: 'Logged in successfully' });
});

module.exports = router;