import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
  verifyEmail,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { admin } from "../middleware/admin.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/verify-email").post(verifyJWT, verifyEmail);
router.route("/login").post(loginUser);

// secure routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/admin/users").get(verifyJWT, admin, getUsers);

export default router;
