import { Router } from "express";
import {
  createdOrder,
  verifyPayment,
} from "../controllers/payment.controller.js";
const router = Router();

router.route("/order").post(createdOrder);
router.route("/verify").post(verifyPayment);

export default router;
