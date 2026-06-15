import express from "express";
const userRouter = express.Router();

import { getCurrentUser, updateProfile } from "../controllers/user.controllers.js";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";

userRouter.get("/current-user", isAuth, getCurrentUser);
userRouter.put("/update-profile", isAuth, upload.fields([
  { name: 'profileImg', maxCount: 1 },
  { name: 'coverImg', maxCount: 1 }
]), updateProfile);

export default userRouter;