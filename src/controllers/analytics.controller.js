import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import mongoose from "mongoose";

const getAdminStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments({ role: "user" });
  const totalOrders = await Order.countDocuments({});
  const totalProducts = await Product.countDocuments({});

  const orders = await Order.find({});

  const totalRevenue = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalUsers,
        totalOrders,
        totalProducts,
        orders,
        totalRevenue,
      },
      "analytics fetched successfully"
    )
  );
});

const getUserStats = asyncHandler(async (req, res) => {
  const userDetails = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "addresses",
        localField: "_id",
        foreignField: "user",
        as: "userAddresses",
      },
    },
    {
      $lookup: {
        from: "orders",
        localField: "_id",
        foreignField: "user",
        as: "userOrders",
      },
    },
    {
      $project: {
        password: 0,
        token: 0,
        verificationPass: 0,
        __v: 0,
        role: 0,
      },
    },
  ]);

  if (!userDetails.length) {
    throw new ApiError(400, "user details not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, userDetails[0], "user details fetched successfully")
    );
});

export { getAdminStats, getUserStats };
