import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import "dotenv/config";
import crypto, { createHmac } from "crypto";
import Razorpay from "razorpay";

const createdOrder = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

  const options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: crypto.randomBytes(10).toString("hex"),
  };

  const order = await instance.orders.create(options);

  if (!order) {
    throw new ApiError(400, "Payment failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order, "payment successfull"));
});

const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const generated_signature = createHmac(
    "sha256",
    process.env.RAZORPAY_API_SECRET
  )
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature !== razorpay_signature) {
    throw new ApiError(400, "payment verification failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "payment verified successfully"));
});

export { createdOrder, verifyPayment };
