import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const orderProducts = cart.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    const newOrder = new Order({ userId, products: orderProducts });
    await newOrder.save();

    cart.items = []; // Clearing the cart items
    await cart.save();

    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to place order", error });
  }
};

export const getOrderHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order history", error });
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order details", error });
  }
};
