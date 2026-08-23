import { ApiError } from "../utils/ApiError.js";

const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    throw new ApiError(403, "Access Denied admin only");
  }
};

export { admin };
