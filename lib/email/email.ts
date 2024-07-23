// utils/email.ts

import nodemailer from "nodemailer";

// Define the transporter with environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "465", 10),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Type definition for sending email
export type EmailOptions = {
  to: string;
  subject: string;
  html: string;
};

// Function to send an email
export const sendEmail = async ({ to, subject, html }: EmailOptions) => {
  const mailOptions = {
    from: `"Promage" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    headers: {
      Importance: "high", // Mark as important
      "X-Priority": "1", // Highest priority
      Priority: "urgent", // Urgent priority
    },
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
