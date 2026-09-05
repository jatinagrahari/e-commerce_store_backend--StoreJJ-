import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verificationEmail } from "../templates/verificationEmail.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";

const generateToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const token = jwt.sign({ _id: userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
    user.token = token;
    await user.save({ validateBeforeSave: false });
    return { token };
  } catch (error) {
    throw new ApiError(500, "token generation failed");
  }
};

const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiryTime = new Date(Date.now() + 10 * 60 * 1000);

  return { otp, expiryTime };
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((feild) => feild.trim() == "")) {
    throw new ApiError(400, "All the feilds are required");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(400, "user already exist ");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (!user) {
    throw new ApiError(500, "Something went wrong registering the user");
  }
  const { otp, expiryTime } = generateOtp();

  user.verificationPass.otp = otp;
  user.verificationPass.expiryTime = expiryTime;

  await user.save({ validateBeforeSave: true });

  const message = verificationEmail(otp);

  await sendEmail(email, "Verify your Store JJ account", message);

  const { token } = await generateToken(user._id);

  const createdUser = await User.findOne({ email }).select(
    "-password -verificationPass -token"
  );

  if (!createdUser) {
    throw new ApiError(401, "user fetched failed");
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(201)
    .cookie("token", token, options)
    .json(new ApiResponse(201, createdUser, "user registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    throw new ApiError(400, "all feilds are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "user not found ");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "pasword incorrect");
  }

  const { token } = await generateToken(user._id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  const verifiedUser = await User.findById(user._id).select(
    "-password -token -verificationPass"
  );

  return res
    .status(200)
    .cookie("token", token, options)
    .json(new ApiResponse(200, verifiedUser, "Logged in successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        token: "",
      },
    },
    {
      returnDocument: "after",
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("token", options)
    .json(new ApiResponse(200, {}, "logged out successfully"));
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select(
    "-password -verificationPass -token "
  );
  if (!users) {
    throw new ApiError(500, "server error");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched successfully"));
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { otp } = req.body;

  const user = await User.findById(req.user?._id).select("-password");

  if (!user) {
    throw new ApiError(400, "access deneid");
  }

  if (new Date() > user.verificationPass.expiryTime) {
    throw new ApiError(401, "OTP Expired");
  }

  if (!(user.verificationPass.otp === otp)) {
    throw new ApiError(401, "OTP Mismatch");
  }
  await User.findByIdAndUpdate(
    user?._id,
    {
      $set: {
        verified: true,
        verificationPass: {
          otp: "",
          expiryTime: "",
        },
      },
    },
    {
      returnDocument: "after",
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  const verifiedUser = await User.findById(user?._id).select(
    "-password -token -verificationPass "
  );

  return res
    .status(200)
    .cookie("token", user?.token, options)
    .json(new ApiResponse(200, verifiedUser, "user verified successfully"));
});

const resendOtp = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(400, "user not found");
  }

  const { otp, expiryTime } = generateOtp();

  user.verificationPass.otp = otp;
  user.verificationPass.expiryTime = expiryTime;

  await user.save({ validateBeforeSave: true });

  const message = verificationEmail(otp);

  await sendEmail(user.email, "Verify your Store JJ account", message);

  return res
    .status(201)
    .json(new ApiResponse(201, {}, "otp generated successfully"));
});

// const test = asyncHandler(async (req, res) => {
//   const { email } = req.body;

//   const otp = 123;

//   const message = verificationEmail(otp);

//   await sendEmail(email, "verify jj acc ", message);

//   return res.status(200).json(new ApiResponse(200, {}, "email sent"));
// });

export {
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
  verifyEmail,
  resendOtp,
};
