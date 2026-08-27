import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    addresses: [
      {
        fullName: {
          type: String,
          required: true,
          trim: true,
        },
        mobileNumber: {
          type: String,
          required: true,
          trim: true,
        },
        houseNumber: {
          type: String,
          required: true,
          trim: true,
        },
        street: {
          type: String,
          required: true,
          trim: true,
        },
        city: {
          type: String,
          required: true,
          trim: true,
        },
        postCode: {
          type: String,
          required: true,
          trim: true,
        },
        state: {
          type: String,
          required: true,
          trim: true,
        },
        country: {
          type: String,
          required: true,
          trim: true,
        },
        label: {
          type: String,
          enum: ["Home", "Work", "Other"],
          default: "Home",
        },

        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Address = mongoose.model("Address", addressSchema);
