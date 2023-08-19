import User from "../models/User.js";
import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.body.productId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId });
    }

    const existingCartItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (existingCartItem) {
      existingCartItem.quantity++;
    } else {
      cart.items.push({ productId, quantity: 1 });
    }

    await cart.save();

    res.status(200).json({ message: "Product added to cart" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add product to cart", error });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart.items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart", error });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;
    const newQuantity = req.body.quantity;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cartItem.quantity = newQuantity;
    await cart.save();

    res.status(200).json({ message: "Cart item updated" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update cart item", error });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    await cart.save();

    res.status(200).json({ message: "Cart item removed" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove cart item", error });
  }
};
