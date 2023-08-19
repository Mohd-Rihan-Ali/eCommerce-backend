import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} from "../controllers/cartController.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/cart/add", verifyUser, addToCart);
router.get("/cart", verifyUser, getCart);
router.put("/cart/update/:productId", verifyUser, updateCartItem);
router.delete("/cart/remove/:productId", verifyUser, removeCartItem);

export default router;
