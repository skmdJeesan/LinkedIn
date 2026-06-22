import express from "express";
const authRouter = express.Router();

import * as authController from "../controllers/auth.controllers.js";

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);
authRouter.post("/forget-password", authController.forgetPassword);
// alias for client: 'forgot-password' route
authRouter.post("/forgot-password", authController.forgetPassword);
authRouter.post("/reset-password/:resetToken", authController.resetPassword);
authRouter.get("/verify-email/:verifyToken", authController.verifyEmail);

export default authRouter;