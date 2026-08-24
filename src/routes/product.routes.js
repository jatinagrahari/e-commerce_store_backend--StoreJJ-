import { Router } from "express";
import { verifyJWT } from "../../middleware/auth.middleware.js";
import { admin } from "../../middleware/admin.middleware.js";
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
  .post(verifyJWT, admin, upload.array("images", 10), createProduct);

// specific product
router
  .route("/:id")
  .get(getProduct)
  .put(verifyJWT, admin, updateProduct)
  .delete(verifyJWT, admin, deleteProduct);

export default router;
