import express from "express";
const userRouter = express.Router();

import { getCurrentUser, getProfile, getSuggestedUser, search, updateProfile } from "../controllers/user.controllers.js";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";

userRouter.get("/current-user", isAuth, getCurrentUser);
userRouter.get("/suggested-user", isAuth, getSuggestedUser);
userRouter.get("/search", isAuth, search);
userRouter.get("/profile/:username", isAuth, getProfile);
userRouter.put("/update-profile", isAuth, upload.fields([
  { name: 'profileImg', maxCount: 1 },
  { name: 'coverImg', maxCount: 1 }
]), updateProfile);

export default userRouter;