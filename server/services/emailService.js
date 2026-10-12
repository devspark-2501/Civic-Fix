const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendComplaintEmail = async (organizationEmail, issueDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: organizationEmail,
    subject: `[CivicFix Complaint] New Issue Reported: ${issueDetails.category}`,
    html: `
      <h2>New Public Grievance Registered via CivicFix</h2>
      <p><b>Category:</b> ${issueDetails.category}</p>
      <p><b>Target Department:</b> ${issueDetails.organization}</p>
      <p><b>Location / Landmark:</b> ${issueDetails.locationText}</p>
      <p><b>Description:</b> ${issueDetails.description}</p>
      <br/>
      <p>This automated grievance email was submitted on behalf of a local citizen using CivicFix.</p>
    `,
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = { sendComplaintEmail };