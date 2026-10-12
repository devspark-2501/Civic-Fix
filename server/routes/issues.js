const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');
const { sendComplaintEmail } = require('../services/emailService');

// Get all reported issues
router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.status(200).json(issues);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch issues' });
  }
});

// Report a new issue & email department
router.post('/report', async (req, res) => {
  try {
    const { category, location, organization, description, imageUrl } = req.body;

    if (!category || !location || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Save issue to MongoDB
    const newIssue = new Issue({
      category,
      location,
      organization: organization || 'Bhopal Municipal Corp',
      description,
      imageUrl,
    });
    await newIssue.save();

    // Trigger Nodemailer department email
    await sendComplaintEmail({ category, organization: newIssue.organization, locationText: location, description, imageUrl });

    res.status(200).json({ message: 'Complaint saved to database and email dispatched!', issue: newIssue });
  } catch (error) {
    console.error('Issue reporting error:', error);
    res.status(500).json({ error: 'Failed to register complaint' });
  }
});

module.exports = router;