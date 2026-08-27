import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendEmail } from "../utils/sendEmail.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import { orderConfirmationEmail } from "../templates/orderConfirmationEmail.js";

const createOrder = asyncHandler(async (req, res) => {
  const { products, totalAmount, shippingAddress, paymentId = "" } = req.body;

  if (!products || products.length === 0 || !totalAmount || !shippingAddress) {
    throw new ApiError(400, "Order data must not empty");
  }

  const totalProducts = JSON.parse(products);
  const productsIds = totalProducts.map((product) =>
    product.productId.toString()
  );

  const totalAmountIs = await Product.find({ _id: { $in: productsIds } });

  const orderCreated = await Order.create({
    user: req.user._id,
    products,
    totalAmount,
    shippingAddress,
    paymentId,
  });

  if (!orderCreated) {
    throw new ApiError(400, "Order creation failed");
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
    address: address,
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

const getOrderById = asyncHandler(async (req, res) => {});

const getOrders = asyncHandler(async (req, res) => {});

const updateOrderStatus = asyncHandler(async (req, res) => {});

const myOrders = asyncHandler(async (req, res) => {});

export { createOrder, getOrderById, getOrders, updateOrderStatus, myOrders };
