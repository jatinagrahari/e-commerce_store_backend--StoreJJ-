import { ApiError } from "../utils/ApiError.js";

const admin = (req, _, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    throw new ApiError(403, "Access Denied admin only");
  }
};

export { admin };
