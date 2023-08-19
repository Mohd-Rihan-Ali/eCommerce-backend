import express from "express";
import {
  getProductsByCategory,
  getProductDetails,
} from "../controllers/productController.js";
const router = express.Router();

router.get("/products-by-category/:categoryId", getProductsByCategory);
router.get("/product/:productId", getProductDetails);

export default router;
