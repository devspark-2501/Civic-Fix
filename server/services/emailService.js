const nodemailer = require('nodemailer');

// 1. Initialize Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 2. Department-Specific Email Routing Table
const DEPARTMENT_EMAILS = {
  'Sanitation & Garbage': 'support@bmconline.gov.in', // Bhopal Municipal Corporation
  'Roads & Potholes': 'commoffice@bmconline.gov.in', // BMC Commissioner Office
  'Streetlights & Electricity': 'contact.mpcz@gmail.com', // MP Discom Customer Care
  'Water Supply & Leaks': 'support@bmconline.gov.in', // BMC Water Dept
  'Healthcare & Pollution': 'support@bmconline.gov.in', // Health & Environment Dept
  'Parks & Maintenance': 'bscdcl@smartbhopal.city', // Smart City Bhopal
  'Public Transport': 'helpdesk@mybusbhopal.in', // BCLL City Bus Service
  'Transit & Emergency': 'helpdesk@mybusbhopal.in', // Transit & Emergency
  'Railways': 'etickets@irctc.co.in', // Indian Railways
};

/**
 * Sends a structured grievance email to the relevant department authority
 * @param {Object} issueDetails - The complaint payload from frontend
 */
const sendComplaintEmail = async (issueDetails) => {
  const { category, organization, locationText, description, imageUrl } = issueDetails;

  // Determine destination address with fallback to municipal or configured email
  const destinationEmail =
    DEPARTMENT_EMAILS[category] ||
    process.env.MUNICIPAL_EMAIL ||
    process.env.EMAIL_USER ||
    'support@bmconline.gov.in';

  const mailOptions = {
    from: `"CivicFix Citizen Portal" <${process.env.EMAIL_USER}>`,
    to: destinationEmail,
    subject: `[CivicFix Grievance Report] ${category} - ${locationText || 'Location Provided'}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 8px;">
          CivicFix Public Grievance Notification
        </h2>
        <p>Dear Concerned Department Authority,</p>
        <p>A new civic issue has been registered by a resident via the CivicFix platform. Details are as follows:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px; font-weight: bold; width: 35%; border-bottom: 1px solid #eee;">Category:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${category}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Target Organization:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${organization}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Location / Landmark:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${locationText}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Description:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${description}</td>
          </tr>
          ${
            imageUrl
              ? `
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Photo Evidence:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="${imageUrl}" target="_blank">View Uploaded Image</a></td>
          </tr>`
              : ''
          }
        </table>

        <p style="margin-top: 20px; font-size: 13px; color: #666;">
          This complaint was logged on behalf of a citizen. Please review and update resolution status accordingly.
        </p>
      </div>
    `,
  };

  try {
    
    const info = await transporter.sendMail(mailOptions);
    console.log(`[CivicFix] Complaint email sent to ${destinationEmail}. Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('[CivicFix] Failed to dispatch email:', error.message);
    // Return false so the database save operation can still complete successfully
    return false;
  }
};

module.exports = { sendComplaintEmail };