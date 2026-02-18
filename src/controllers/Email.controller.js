import nodemailer from 'nodemailer';

const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;

  console.log(req.body);
  

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
     port: 465,
    auth:{
        user:"computerpc096@gmail.com",
        pass: "tigw mrdz mgin mxej"
    }
  })

  if (!to || !subject || !text) {
  return res.status(400).json({
    error: "Missing required fields"
  });
}

 const mailOptions = {
  from: "computerpc096@gmail.com",
  to: to,
  subject: subject,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f4f4f4;
          line-height: 1.6;
        }
        
        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          overflow: hidden;
        }
        
        .header {
          background: linear-gradient(135deg, #6B73FF 0%, #000DFF 100%);
          padding: 40px 20px;
          text-align: center;
          border-bottom: 5px solid #ffd700;
        }
        
        .header h1 {
          color: white;
          font-size: 32px;
          margin-bottom: 10px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          animation: fadeInDown 1s ease;
        }
        
        .header p {
          color: #f0f0f0;
          font-size: 16px;
          opacity: 0.9;
        }
        
        .content {
          background-color: white;
          padding: 40px 30px;
          border-radius: 30px 30px 0 0;
          margin-top: -20px;
        }
        
        .message-box {
          background: #f8f9fa;
          border-left: 5px solid #667eea;
          padding: 25px;
          border-radius: 10px;
          margin-bottom: 30px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }
        
        .message-box p {
          font-size: 18px;
          color: #333;
          line-height: 1.8;
          margin-bottom: 15px;
        }
        
        .message-box strong {
          color: #667eea;
          font-size: 20px;
        }
        
        .info-box {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          padding: 20px;
          border-radius: 10px;
          color: white;
          margin: 20px 0;
        }
        
        .info-box h3 {
          margin-bottom: 10px;
          font-size: 20px;
        }
        
        .info-box p {
          color: white;
          opacity: 0.9;
        }
        
        .button {
          display: inline-block;
          padding: 15px 30px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-weight: bold;
          margin: 20px 0;
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
          transition: transform 0.3s ease;
          border: none;
          cursor: pointer;
        }
        
        .button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.6);
        }
        
        .details-card {
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          padding: 20px;
          margin: 20px 0;
          box-shadow: 0 3px 10px rgba(0,0,0,0.05);
        }
        
        .details-card table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .details-card td {
          padding: 12px;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .details-card td:first-child {
          font-weight: bold;
          color: #667eea;
          width: 40%;
        }
        
        .footer {
          background: #333;
          color: white;
          padding: 30px 20px;
          text-align: center;
          border-top: 5px solid #667eea;
        }
        
        .footer p {
          color: #ccc;
          margin: 5px 0;
        }
        
        .social-links {
          margin: 20px 0;
        }
        
        .social-links a {
          display: inline-block;
          margin: 0 10px;
          color: white;
          text-decoration: none;
          font-size: 20px;
        }
        
        .badge {
          display: inline-block;
          padding: 5px 15px;
          background: #28a745;
          color: white;
          border-radius: 50px;
          font-size: 14px;
          margin: 10px 0;
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media only screen and (max-width: 600px) {
          .email-container {
            margin: 10px;
            width: calc(100% - 20px);
          }
          
          .content {
            padding: 20px 15px;
          }
          
          .header h1 {
            font-size: 24px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <!-- Header Section -->
        <div class="header">
          <h1>📧 New Message</h1>
          <p>You've received an important notification</p>
        </div>
        
        <!-- Content Section -->
        <div class="content">
          <!-- Main Message Box -->
          <div class="message-box">
            <span class="badge">✨ New Message</span>
            <p><strong>Hello!</strong></p>
            <p>${text}</p>
            <p style="font-style: italic; color: #666;">- Best regards, Your Team</p>
          </div>
          
          <!-- Info Box -->
          <div class="info-box">
            <h3>📌 Quick Actions</h3>
            <p>Click the button below to respond or view more details</p>
            <a href="#" class="button">🔔 View Message</a>
          </div>
          
          <!-- Details Card -->
          <div class="details-card">
            <h3 style="color: #667eea; margin-bottom: 15px;">📋 Message Details</h3>
            <table>
              <tr>
                <td>📅 Date & Time:</td>
                <td>${new Date().toLocaleString()}</td>
              </tr>
              <tr>
                <td>📌 Message ID:</td>
                <td>#${Math.random().toString(36).substr(2, 9)}</td>
              </tr>
              <tr>
                <td>📧 From:</td>
                <td>computerpc096@gmail.com</td>
              </tr>
              <tr>
                <td>🎯 Subject:</td>
                <td>${subject || 'Notification'}</td>
              </tr>
            </table>
          </div>
          
          <!-- Additional Info -->
          <div style="text-align: center; margin: 20px 0;">
            <p style="color: #666;">This is an automated message, please do not reply directly to this email.</p>
          </div>
        </div>
        
        <!-- Footer Section -->
        <div class="footer">
          <div class="social-links">
            <a href="#">📘</a>
            <a href="#">🐦</a>
            <a href="#">📷</a>
            <a href="#">💼</a>
          </div>
          <p>© 2024 Your Company Name. All rights reserved.</p>
          <p>123 Business Street, City, State 12345</p>
          <p style="font-size: 12px; margin-top: 15px;">
            <a href="#" style="color: #667eea; text-decoration: none;">Unsubscribe</a> | 
            <a href="#" style="color: #667eea; text-decoration: none;">Privacy Policy</a> | 
            <a href="#" style="color: #667eea; text-decoration: none;">Contact Us</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `
};

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
   res.status(200).json({
  message: "Email sent"
});
  } catch (error) {
    console.error('Error sending email:', error);
  }
};



export { sendEmail }