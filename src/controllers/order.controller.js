import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendEmail } from "../utils/sendEmail.js";
import { Order } from "../models/order.model.js";

const createOrder = asyncHandler(async (req, res) => {
  const { user, products, totalAmount, address, paymentId = "" } = req.body;

  if (
    [user, products, totalAmount, address].some((field) => field.trim() == "")
  ) {
    throw new ApiError(400, "Order data must not empty");
  }

  const orderCreated = await Order.create({
    user,
    products,
    totalAmount,
    address,
    paymentId,
  });

  if (!orderCreated) {
    throw new ApiError(400, "Order creation failed");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, orderCreated, "order created successfully"));
});

const getOrderById = asyncHandler(async (req, res) => {});

const getOrders = asyncHandler(async (req, res) => {});

const updateOrderStatus = asyncHandler(async (req, res) => {});

const myOrders = asyncHandler(async (req, res) => {});

export { createOrder, getOrderById, getOrders, updateOrderStatus, myOrders };
