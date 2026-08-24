import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
cloudina;

const getAllProducts = asyncHandler(async (_, res) => {
  const products = await Product.find({});

  if (!products) {
    throw new ApiError(404, "Products not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, products, "All products fetched successfully"));
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(400, "Invalid product id");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"));
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock } = req.body;

  if (![name, description, price, stock].some((feild) => feild.trim() == "")) {
    throw new ApiError(400, "all feilds are required");
  }

  if (!req.files || req.files.length === 0) {
    throw new ApiError(400, "Atleast one product image is required");
  }

  const imageurls = await Promise.all(
    req.files.map(async (file) => {
      const uploadedImage = await uploadOnCloudinary(file.path);

      if (!uploadedImage) {
        throw new ApiError(400, "image upload failed");
      }

      return {
        url: uploadedImage.url,
        imageId: uploadedImage.public_id,
      };
    })
  );

  const product = await Product.create({
    name,
    description,
    price,
    category,
    stock,
    images: imageurls,
  });

  if (!product) {
    throw new ApiError(400, "product creation failed");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"));
});

const updateProduct = asyncHandler(async (req, res) => {});

const deleteProduct = asyncHandler(async (req, res) => {});

export {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
