import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
    verificationPass: {
      otp: {
        type: String,
      },
      expiryTime: {
        type: Date,
      },
    },
    // addresses: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Address",
    //   },
    // ],
    cartItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
          required: true,
          min: 1,
        },
      },
    ],
    totalCartPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    totalCartDiscountedPrice: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next;
  this.password = await bcrypt.hash(this.password, 10);
  next;
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
