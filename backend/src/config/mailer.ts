import nodemailer from "nodemailer";
import "dotenv/config";

// Shared Nodemailer transporter (Outlook SMTP). Used for account activation,
// password reset, and (optionally) overdue-mail email alerts.
const transporter: any = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.MY_OUTLOOK_FROM_EMAIL_ADDRESS,
        pass: process.env.MY_OUTLOOK_EMAIL_PASSWORD,
    },
});

export default transporter;
