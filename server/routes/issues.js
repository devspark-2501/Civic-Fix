const express = require('express');
const router = express.Router();
const { sendComplaintEmail } = require('../services/emailService');

router.post('/report', async (req, res) => {
  const { category, location, organization, description, imageUrl } = req.body;

  if (!category || !location || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const targetEmail = process.env.MUNICIPAL_EMAIL || 'grievance@bhopalnagarnigam.gov.in';

  try {
    await sendComplaintEmail(targetEmail, { category, locationText: location, description, organization });
    return res.status(200).json({ message: 'Complaint registered and email dispatched!' });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ error: 'Failed to dispatch email' });
  }
});

module.exports = router;