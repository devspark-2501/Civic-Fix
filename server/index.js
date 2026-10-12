const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const issueRoutes = require('./routes/issues');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/issues', issueRoutes);

app.get('/', (req, res) => {
  res.send('CivicFix Backend API is running!');
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});