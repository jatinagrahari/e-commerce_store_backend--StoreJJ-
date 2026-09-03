import { Router } from "express";
import { updateCart } from "../controllers/cart.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/update").post(verifyJWT, updateCart);

export default router;
