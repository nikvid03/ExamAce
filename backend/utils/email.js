const nodemailer = require('nodemailer');

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Generate random password
const generatePassword = () => {
  const length = 8;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

// Send welcome email
const sendWelcomeEmail = async (user, plainPassword) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Welcome to ExamAce - Your Free Trial is Active!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4F46E5;">Welcome to ExamAce, ${user.firstName}!</h2>
        
        <p>Your free trial has been successfully activated. Here are your login credentials:</p>
        
        <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0;">Login Credentials:</h3>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Password:</strong> ${plainPassword}</p>
        </div>
        
        <div style="background-color: #EFF6FF; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1E40AF; margin: 0 0 10px 0;">Your Free Trial Includes:</h3>
          <ul>
            <li>Access to all video lectures</li>
            <li>10 practice tests</li>
            <li>Doubt clearing sessions</li>
            <li>Performance analytics</li>
          </ul>
          <p><strong>Trial Period:</strong> 7 days (until ${user.trialEndDate.toLocaleDateString()})</p>
        </div>
        
        <div style="background-color: #F0FDF4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #166534; margin: 0 0 10px 0;">Next Steps:</h3>
          <ol>
            <li>Login to your account using the credentials above</li>
            <li>Complete your profile setup</li>
            <li>Take your first diagnostic test</li>
            <li>Start exploring premium content</li>
          </ol>
        </div>
        
        <p style="color: #6B7280; font-size: 14px; margin-top: 30px;">
          If you have any questions, feel free to reach out to our support team.
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully');
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

module.exports = {
  transporter,
  generatePassword,
  sendWelcomeEmail
}; 