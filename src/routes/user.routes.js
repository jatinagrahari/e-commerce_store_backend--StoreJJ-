import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
  verifyEmail,
  resendOtp,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { admin } from "../middlewares/admin.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/verify-email").post(verifyJWT, verifyEmail);
router.route("/resendotp").post(verifyJWT, resendOtp);
router.route("/login").post(loginUser);

// secure routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/admin/users").get(verifyJWT, admin, getUsers);

// router.route("/test").post(test);

export default router;
