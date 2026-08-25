import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { admin } from "../middlewares/admin.middleware.js";
import {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// all products
router
  .route("/")
  .get(getAllProducts)
  .post(verifyJWT, admin, upload.array("images", 6), createProduct);

// specific product
router
  .route("/:id")
  .get(getProduct)
  .put(verifyJWT, admin, upload.array("images", 6), updateProduct)
  .delete(verifyJWT, admin, deleteProduct);

export default router;
