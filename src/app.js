import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

// routes import
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import orderRouter from "./routes/order.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import analyticsRouter from "./routes/analytics.routes.js";
import addressRouter from "./routes/address.routes.js";

// routes declaration
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/address", addressRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/analytics", analyticsRouter);

export { app };
