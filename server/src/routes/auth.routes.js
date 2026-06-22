import express from "express";
const authRouter = express.Router();

import * as authController from "../controllers/auth.controllers.js";

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);
authRouter.get("/verify-email/:verifyToken", authController.verifyEmail);

export default authRouter;