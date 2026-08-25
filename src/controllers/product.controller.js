import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";
import {
  deleteFileOnCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

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

  if (
    [name, description, price, category, stock].some(
      (feild) => feild.trim() == ""
    )
  ) {
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

const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock, images } = req.body;

  if (
    [name, description, price, category, stock].some(
      (feild) => feild.trim() == ""
    )
  ) {
    throw new ApiError(400, "all feilds are required");
  }

  const product = await Product.findById(req.params?.id);

  if (!product) {
    throw new ApiError(401, "Invalid request");
  }

  const newValues = {
    name,
    description,
    price,
    category,
    stock,
  };

  let updatedProductDetails = {};

  for (const [key, value] of Object.entries(newValues)) {
    if (value !== product[key]) {
      updatedProductDetails[key] = value;
    }
  }

  // image upload section

  if (!images && (!req.files || req.files.length === 0)) {
    throw new ApiError(400, "Atleast one Image is required");
  }

  let allImages = [];

  if (images) {
    const oldImages = JSON.parse(images);
    const oldImageIds = oldImages.map((image) => image._id.toString());
    let imagesToKeep = [];
    let imagesToDelete = [];

    for (const image of product.images) {
      const existingImageId = image._id;
      if (oldImageIds.includes(existingImageId.toString())) {
        imagesToKeep.push(image);
      } else {
        imagesToDelete.push(image);
      }
    }

    if (imagesToDelete.length > 0) {
      for (const image of imagesToDelete) {
        await deleteFileOnCloudinary(image.imageId);
      }
    }

    if (imagesToKeep.length > 0) {
      allImages.push(...imagesToKeep);
    }
  }
  if (req.files && req.files.length > 0) {
    const uploadedImages = await Promise.all(
      req.files.map(async (image) => {
        const uploadImage = await uploadOnCloudinary(image.path);

        if (!uploadImage) {
          throw new ApiError(400, "Image upload failed");
        }

        return {
          url: uploadImage.url,
          imageId: uploadImage.public_id,
        };
      })
    );
    allImages.push(...uploadedImages);
  }

  updatedProductDetails.images = allImages;

  if (Object.keys(updatedProductDetails).length > 0) {
    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      { $set: updatedProductDetails },
      { returnDocument: "after", runValidators: true }
    );

    if (!updatedProduct) {
      throw new ApiError(400, "product update failed");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedProduct, "Product updated successfully")
      );
  } else {
    return res
      .status(200)
      .json(new ApiResponse(200, product, "Product updated successfully"));
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(400, "Invalid request");
  }

  for (const image of product.images) {
    await deleteFileOnCloudinary(image.imageId);
  }

  await Product.findByIdAndDelete(product._id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Product deleted successfully"));
});

export {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
