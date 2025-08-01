const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); // ✅ ADD THIS
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // ✅ ENABLE CORS
app.use(express.json());

app.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
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
