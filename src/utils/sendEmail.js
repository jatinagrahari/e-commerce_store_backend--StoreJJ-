import nodemailer from "nodemailer";
import { ApiError } from "./ApiError.js";

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      // service: "Gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: text,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("EMAIL ERROR:", error);
    throw new ApiError(401, "Error sending mail");
  }
};

export { sendEmail };
