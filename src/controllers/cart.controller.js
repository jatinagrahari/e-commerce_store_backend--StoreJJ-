import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";

const addItemToCart = asyncHandler(async (req, res) => {
  const { products } = req.body;

  if (!products || products.length === 0) {
    throw new ApiError(400, "please add atleast one product");
  }

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError("user not found ");
  }

  for (const item of products) {
    const existingItem = user.cartItems.find(
      (cartItem) => cartItem.product.toString() === item.product.toString()
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      user.cartItems.push({
        product: item.product,
        quantity: item.quantity,
      });
    }
  }
  await user.save();

  const productIds = user.cartItems?.map((item) => item.product);

  const productsFromDb = await Product.find({
    _id: { $in: productIds },
  });

  const productData = new Map();

  for (const item of productsFromDb) {
    productData.set(item._id.toString(), item);
  }

  let totalCartAmount = 0;
  let totalCartDiscountedAmount = 0;

  for (const item of user?.cartItems) {
    const prod = productData.get(item.product.toString());
    totalCartAmount += prod.price * item.quantity;
    totalCartDiscountedAmount += prod.discountedPrice * item.quantity;
  }

  user.totalCartPrice = totalCartAmount;
  user.totalCartDiscountedPrice = totalCartDiscountedAmount;
  await user.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        cartItems: user.cartItems,
        totalCartPrice: user.totalCartPrice,
        totalCartDiscountedPrice: user.totalCartDiscountedPrice,
      },
      "Items added to cart successfully"
    )
  );
});

export { addItemToCart };
