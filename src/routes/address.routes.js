import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "../controllers/address.controller.js";
const router = Router();

router
  .route("/")
  .get(verifyJWT, getAddresses)
  .post(verifyJWT, addAddress)
  .delete(verifyJWT, deleteAddress);

export default router;
