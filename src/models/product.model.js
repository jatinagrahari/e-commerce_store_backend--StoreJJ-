import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    images: [
      {
        url: {
          type: String, // cloudinary url
        },
        imageId: {
          type: String, // cloudinary url
        },
      },
    ],
    discount: {
      type: Number,
      default: 0,
    },
    discountedPrice: {
      type: Number,
    },
    rating: {
      type: Number,
      default: 0,
    },
    totalNumberOfReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
