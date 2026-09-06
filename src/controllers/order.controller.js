import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendEmail } from "../utils/sendEmail.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import { orderConfirmationEmail } from "../templates/orderConfirmationEmail.js";
import { Address } from "../models/address.model.js";
import mongoose from "mongoose";

const createOrder = asyncHandler(async (req, res) => {
  const { products, shippingAddress, paymentId = "" } = req.body;

  if (!products || products.length === 0 || !shippingAddress) {
    throw new ApiError(400, "Order data must not empty");
  }

  const productsIds = products.map((product) => product.productId.toString());

  const allProducts = await Product.find({ _id: { $in: productsIds } });

  if (allProducts.length !== productsIds.length) {
    throw new ApiError(
      400,
      "Invalid Product details or product does not exist "
    );
  }

  const qtyMap = new Map();
  let totalPrice = 0;

  for (const product of allProducts) {
    qtyMap.set(product._id.toString(), product);
  }

  for (const item of products) {
    const matchedProduct = qtyMap.get(item.productId.toString());

    if (!matchedProduct) {
      throw new ApiError(400, "product not found or invalid");
    }

    if (matchedProduct.stock < item.quantity) {
      throw new ApiError(400, `Insufficient stock for ${matchedProduct.name}`);
    }

    totalPrice = totalPrice + Number(matchedProduct.price) * item.quantity;
  }

  await Address.findOneAndUpdate(
    { user: req.user.id },
    {
      $push: {
        address: shippingAddress,
      },
    },
    { returnDocument: "after", upsert: true }
  );

  const orderCreated = await Order.create({
    user: req.user._id,
    products,
    totalAmount: totalPrice,
    shippingAddress,
    paymentId,
  });

  if (!orderCreated) {
    throw new ApiError(400, "Order creation failed");
  }

  for (const item of products) {
    const matchedProduct = qtyMap.get(item.productId.toString());

    const qty = Number(matchedProduct.stock) - Number(item.quantity);

    const product = await Product.findByIdAndUpdate(
      matchedProduct._id,
      {
        $set: { stock: qty },
      },
      { returnDocument: "after" }
    );
    if (!product) {
      throw new ApiError(500, "quantity updation failed");
    }
  }

  const message = orderConfirmationEmail({
    name: req.user.name,
    orderId: orderCreated._id,
    orderDate: orderCreated.createdAt.toLocaleString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    totalAmount: orderCreated.totalAmount,
    orderItems: orderCreated.products,
    address: shippingAddress,
  });

  await sendEmail(
    req.user.email,
    "Your order has been placed successfully",
    message
  );

  return res
    .status(201)
    .json(new ApiResponse(201, orderCreated, "order created successfully"));
});

const getOrderById = asyncHandler(async (req, res) => {
  const orderInfo = await Order.findById(req.params.id);

  if (!orderInfo) {
    throw new ApiError(400, "Order not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, orderInfo, "Order fetched successfully"));
});

const getOrders = asyncHandler(async (req, res) => {
  const allOrders = await Order.find({});

  if (!allOrders || allOrders.length === 0) {
    throw new ApiError(400, "NO Orders");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, allOrders, "all orders fetched successfully"));
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus } = req.body;

  const validStatuses = [
    "pending",
    "confirmed",
    "shipped",
    "delivered",
    "undelivered",
  ];

  if (!orderStatus || !validStatuses.includes(orderStatus)) {
    throw new ApiError(400, "Please set the valid status");
  }

  const orderDetails = await Order.findById(req.params.id);

  if (!orderDetails) {
    throw new ApiError(400, "invalid order id or no order found by this id");
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    orderDetails._id,
    {
      $set: { orderStatus },
    },
    {
      returnDocument: "after",
    }
  );

  if (!updatedOrder) {
    throw new ApiError(400, "Order status updation failed");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedOrder, "order status updated successfully")
    );
});

const myOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user?._id });

  if (!orders) {
    throw new ApiError(400, "no orders found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, orders, "orders fetched successfully"));
});

export { createOrder, getOrderById, getOrders, updateOrderStatus, myOrders };
