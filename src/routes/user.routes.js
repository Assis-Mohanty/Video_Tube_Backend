import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  changeCurrentPassword,
  getUser,
  updataAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
  getwatchHistory,
} from "../controllers/user.controller.js"; // Add loginUser import
import mongoose from "mongoose";
import { verifyJWT } from "./../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/register",
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.post("/login", loginUser); // Define the login route

router.route("/logout").post(verifyJWT, logoutUser);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/get-user").post(verifyJWT, getUser);
router.route("/update-account").post(verifyJWT, updataAccountDetails);
router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router
  .route("/cover-image")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);
router.route("/c/:username").get(verifyJWT, getUserChannelProfile);
router.route("/history").get(verifyJWT, getwatchHistory);

export default router;
