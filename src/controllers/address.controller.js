import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Address } from "../models/address.model.js";

const getAddresses = asyncHandler(async (req, res) => {
  return res.send("hello world");
});

const addAddress = asyncHandler(async (req, res) => {
  const {
    fullName,
    mobileNumber,
    houseNumber,
    street,
    city,
    state,
    country,
    postCode,
  } = req.body;

  if (
    [
      fullName,
      mobileNumber,
      houseNumber,
      street,
      city,
      state,
      country,
      postCode,
    ].some((feild) => !feild || feild.trim() === "")
  ) {
    throw new ApiError(400, "all feilds are required");
  }

  const address = await Address.create({
    user: req.user._id,
    addresses: [
      {
        fullName,
        mobileNumber,
        houseNumber,
        street,
        city,
        state,
        country,
        postCode,
      },
    ],
  });

  if (!address) {
    throw new ApiError(400, "Address creation failed");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, address, "address created successfully"));
});

const deleteAddress = asyncHandler(async (req, res) => {});

const updateAddress = asyncHandler(async (req, res) => {});

export { getAddresses, addAddress, updateAddress, deleteAddress };
