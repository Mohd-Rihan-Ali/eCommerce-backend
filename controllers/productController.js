import Product from "../models/Product.js";

export const getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await Product.find({ categoryId });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error });
  }
};

export const getProductDetails = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product details", error });
  }
};
