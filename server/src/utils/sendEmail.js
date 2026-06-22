import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const emailUser = process.env.EMAIL_USER?.trim();
const emailPass = process.env.EMAIL_PASS?.trim().replace(/\s+/g, "");

if (!emailUser || !emailPass) {
  throw new Error("Missing EMAIL_USER or EMAIL_PASS environment variables for sending email.");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPass
  }
});

export const sendVerificationEmail = async (
  email,
  verificationUrl
) => {
  await transporter.sendMail({
    from: `"LinkedIn Clone" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your Email",
    html: `
            <h2>Verify Your Email</h2>
            <a href="${verificationUrl}">
                Verify Email
            </a>
        `
  });
};

export const sendResetPasswordEmail = async (
  email,
  resetUrl
) => {
  await transporter.sendMail({
    from: `"LinkedIn Clone" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset Password",
    html: `
            <h2>Reset Password</h2>
            <a href="${resetUrl}">
                Reset Password
            </a>
        `
  });
};