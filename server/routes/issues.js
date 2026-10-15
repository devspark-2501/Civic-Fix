const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');
const { sendComplaintEmail } = require('../services/emailService');

// Get all issues or filter by userEmail if provided (?email=...)
router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    const query = email ? { userEmail: email } : {};
    const issues = await Issue.find(query).sort({ createdAt: -1 });
    res.status(200).json(issues);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch issues' });
  }
});

// Report a new issue & email department
router.post('/report', async (req, res) => {
  try {
    const { category, location, organization, description, imageUrl, userEmail, fullName, phone } = req.body;

    if (!category || !location || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const formattedDescription = `[Complainant: ${fullName || 'Anonymous'} | Contact: ${phone || 'N/A'}] - ${description}`;

    const newIssue = new Issue({
      category,
      location,
      organization: organization || 'Bhopal Municipal Corp',
      description: formattedDescription,
      imageUrl,
      userEmail: userEmail || 'anonymous@civicfix.com',
    });
    
    await newIssue.save();

    await sendComplaintEmail({
      category,
      organization: newIssue.organization,
      locationText: location,
      description: formattedDescription,
      imageUrl,
    });

    res.status(200).json({
      message: 'Complaint saved to database and email dispatched!',
      issue: newIssue,
    });
  } catch (error) {
    console.error('Issue reporting error:', error);
    res.status(500).json({ error: 'Failed to register complaint' });
  }
});

module.exports = router;