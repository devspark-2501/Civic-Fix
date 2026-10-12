const express = require('express');
const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing required credentials' });
  }
  // Simulated success response (Connect database here later)
  res.status(201).json({ message: 'User registered successfully', user: { email, username } });
});

// Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }
  // Simulated success response
  res.status(200).json({ message: 'Logged in successfully' });
});

module.exports = router;