const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// POST route to send email
app.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail
        pass: process.env.GMAIL_PASS, // App Password (not regular password)
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.GMAIL_USER,
      subject: `New message from ${name}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Email failed to send' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
