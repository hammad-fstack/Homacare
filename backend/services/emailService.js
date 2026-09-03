const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendOtpEmail = async (toEmail, otp) => {
  await transporter.sendMail({
    from: `"HomaCare" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Your HomaCare Verification Code',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto;">
        <h2 style="color: #10b981;">HomaCare</h2>
        <p>Your verification code is:</p>
        <p style="font-size: 28px; font-weight: bold; letter-spacing: 4px;">${otp}</p>
        <p style="color: #888; font-size: 12px;">This code expires in 10 minutes.</p>
      </div>
    `,
  });
};

module.exports = { sendOtpEmail };