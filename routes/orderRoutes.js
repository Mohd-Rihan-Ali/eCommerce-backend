import express from "express";
import {
  placeOrder,
  getOrderHistory,
  getOrderDetails,
} from "../controllers/orderController.js";
import { verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/orders/place", verifyUser, placeOrder);
router.get("/orders/history", verifyUser, getOrderHistory);
router.get("/orders/:orderId", verifyUser, getOrderDetails);

export default router;
