import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { admin } from "../middleware/admin.middleware.js";
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../controllers/product.controller.js";

const router = Router();

// all products
router.route("/").get(getAllProducts).post(verifyJWT, admin, createProduct);

// specific product
router
  .route("/:id")
  .get(getProduct)
  .put(verifyJWT, admin, updateProduct)
  .delete(verifyJWT, admin, deleteProduct);

export default router;
