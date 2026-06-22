import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendResetPasswordEmail, sendVerificationEmail } from "../utils/sendEmail.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    // Check if all fields are provided
    if (!firstName || !lastName || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields."
      });
    }

    // check if password is at least 6 characters long
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long."
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists."
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      firstName, lastName, username, email, password: hashedPassword
    });

    // generate verification token
    const verifyToken = crypto.randomBytes(32).toString("hex");
    user.verifyToken = verifyToken;
    user.verifyTokenExpires = Date.now() + 24 * 60 * 60 * 1000;

    // send email here
    const verificationUrl = `${process.env.CLIENT_BASE_URL}/verify-email/${verifyToken}`;
    await sendVerificationEmail(user.email, verificationUrl);
    await user.save();

    // Send response without logging in the user.
    res.status(201).json({
      success: true,
      message: "User registered successfully. Please check your email to verify your account."
    });

  } catch (error) {
    console.error("Register error:", error);
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email or username already exists."
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Server error. Please try again later."
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password."
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "Please verify your email before logging in."
      });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials."
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // parse the token in cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Send response
    res.status(200).json({
      success: true,
      message: "User logged in successfully.",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later."
    });
  }
};

export const logout = (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  };

  res.clearCookie("token", cookieOptions);
  res.status(200).json({
    success: true,
    message: "User logged out successfully."
  });
};

export const verifyEmail = async (req, res) => {
  try {
    const { verifyToken } = req.params;
    const user = await User.findOne({ verifyToken });

    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpires = undefined;

    await user.save();
    res.status(200).json({ message: "Email verified" });
  } catch (error) {
    res.status(500).json({ message: `Email verification error: ${error}` });
  }
};

// forget password
export const forgetPassword = async (req, res) => {
  try {
    // generate reset password token
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetUrl =
      `${process.env.CLIENT_BASE_URL}/reset-password/${resetToken}`;

    await sendResetPasswordEmail(email, resetUrl);

    return res.status(200).json({
      message: "Password reset link sent successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: `Generate reset password token error: ${error.message}`
    });
  }
};

// reset password
export const resetPassword = async (req, res) => {
  try {
    const { resetToken } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: resetToken
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid reset token"
      });
    }

    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({
        message: "Reset token has expired"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({
      message: "Password reset successful"
    });

  } catch (error) {
    return res.status(500).json({
      message: `Reset password error: ${error.message}`
    });
  }
};