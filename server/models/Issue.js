const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
  category: { type: String, required: true },
  organization: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  userEmail: { type: String }, // Track submitting user
  status: { type: String, default: 'Submitted & Emailed' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Issue', IssueSchema);