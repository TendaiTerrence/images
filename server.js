const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "tendaimachaya12@gmail.com",
        pass: "gans kxjr yyuu umxb"
    }
});

app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: "tendai161221machaya@gmail.com",
        subject: `New Message from ${name}`,
        text: `Message: ${message}\nFrom: ${name} (${email})`, 
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                <div style="text-align: center;">
                    <img src="https://raw.githubusercontent.com/TendaiTerrence/images/eb9fbd936160edd70da9fec775bfd68c1e7df8c5/logo.png" alt="Ezod-Tech Logo" style="width: 100px; height: auto; margin-bottom: 10px;">
                </div>
                <h2 style="color: #083b7a; text-align: center; border-bottom: 2px solid #083b7a; padding-bottom: 10px;">
                    Ezod-Tech
                </h2>
                <p style="font-size: 1.1rem;">You have received a new message from <strong>${name}</strong> (<a href="mailto:${email}" style="color: #083b7a; text-decoration: none;">${email}</a>).</p>
                <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-radius: 5px; border: 1px solid #e0e0e0;">
                    <p style="font-size: 1rem; line-height: 1.5;"><strong>Message:</strong></p>
                    <p style="font-size: 1rem; color: #555;">${message}</p>
                </div>
                <footer style="text-align: center; font-size: 0.9rem; color: #999; margin-top: 20px;">
                    © Ezod-Tech, All rights reserved.
                </footer>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).send({ message: "Email sent successfully!" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
