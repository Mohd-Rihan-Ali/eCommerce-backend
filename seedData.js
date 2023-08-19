import mongoose from "mongoose";
import faker from "faker";
import Category from "./models/Category.js";
import Product from "./models/Product.js";
import dotenv from "dotenv";

dotenv.config();

// Set up MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to generate random categories
const generateCategories = (count) => {
  const categories = [];
  for (let i = 0; i < count; i++) {
    categories.push({ name: faker.commerce.department() });
  }
  return categories;
};

// Function to generate random products
const generateProducts = (count, categoryIds) => {
  const products = [];
  for (let i = 0; i < count; i++) {
    const randomCategoryId =
      categoryIds[Math.floor(Math.random() * categoryIds.length)];
    products.push({
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.lorem.sentence(),
      availability: faker.random.boolean(),
      categoryId: randomCategoryId,
    });
  }
  return products;
};

// Seed data function
const seedData = async () => {
  try {
    // Generate and insert categories
    const categories = generateCategories(5);
    const insertedCategories = await Category.insertMany(categories);
    const categoryIds = insertedCategories.map((category) => category._id);

    // Generate and insert products
    const products = generateProducts(20, categoryIds);
    await Product.insertMany(products);

    console.log("Data seeding successful");
  } catch (error) {
    console.error("Data seeding error:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the data seeding function
seedData();
