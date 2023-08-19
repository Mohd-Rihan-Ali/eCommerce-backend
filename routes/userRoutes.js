import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/userController.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// DELETE
router.delete("/:id", verifyUser, deleteUser);

// GET
router.get("/:id", verifyUser, getUser);

// GET ALL
router.get("/", getUsers);

export default router;
