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

router.route("/auth/register").post(registerUser);
router.route("/auth/verify-email").post(verifyJWT, verifyEmail);
router.route("/auth/login").post(loginUser);

// secure routes
router.route("/auth/logout").post(verifyJWT, logoutUser);
router.route("/users/admin").post(verifyJWT, admin, getUsers);

export default router;
