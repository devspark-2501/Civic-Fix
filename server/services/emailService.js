const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 1. Map problem categories to specific department emails
const DEPARTMENT_EMAILS = {
  'Sanitation & Garbage': 'sanitation.bhopal@gmail.com',
  'Roads & Potholes': 'roads.bhopal@gmail.com',
  'Streetlights & Electricity': 'electricity.discom@gmail.com',
  'Water Supply & Leaks': 'waterboard.bhopal@gmail.com',
  'Fire & Safety': 'fire.department@gmail.com',
  'Railways': 'railways.grievance@gmail.com',
};

const sendComplaintEmail = async (issueDetails) => {
  // 2. Fallback to default general email if category isn't matched
  const targetEmail =
    DEPARTMENT_EMAILS[issueDetails.category] ||
    process.env.MUNICIPAL_EMAIL ||
    'general.grievance@gmail.com';

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: targetEmail, // Automatically routes to the right department!
    subject: `[CivicFix Complaint] ${issueDetails.category} Issue Reported`,
    html: `
      <h2>New Public Grievance Registered via CivicFix</h2>
      <p><b>Category:</b> ${issueDetails.category}</p>
      <p><b>Organization/Region:</b> ${issueDetails.organization}</p>
      <p><b>Location / Landmark:</b> ${issueDetails.locationText}</p>
      <p><b>Description:</b> ${issueDetails.description}</p>
      <br/>
      <p>Submitted via CivicFix Community Platform.</p>
    `,
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = { sendComplaintEmail };