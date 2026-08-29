import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { admin } from "../middlewares/admin.middleware.js";
import {
  getUserStats,
  getAdminStats,
} from "../controllers/analytics.controller.js";
const router = Router();

router.route("/").get(verifyJWT, admin, getAdminStats);
router.route("/user").get(verifyJWT, getUserStats);

export default router;
