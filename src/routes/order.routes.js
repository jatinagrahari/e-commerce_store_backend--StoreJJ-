import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { admin } from "../middlewares/admin.middleware.js";
import {
  createOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
  myOrders,
} from "../controllers/order.controller.js";

const router = Router();

router.route("/").post(verifyJWT, createOrder).get(verifyJWT, admin, getOrders);
router.route("/myorders").get(verifyJWT, myOrders);
router
  .route("/:id")
  .get(verifyJWT, getOrderById)
  .put(verifyJWT, admin, updateOrderStatus);

export default router;
