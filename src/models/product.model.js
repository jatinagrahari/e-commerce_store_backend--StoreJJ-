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
      type: String,
      required: true,
    },
    images: [
      {
        type: String, // cloudinary url
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    totalNumberOfReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export const Product = mongoose.model("Product", productSchema);
