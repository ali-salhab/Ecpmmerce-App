import express from "express";

const router = express.Router();

import {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

router.use(protectRoute);

// Create a new order
router.post("/", createOrder);

// Get all orders
router.get("/", getAllOrders);

// Get a single order
router.get("/:id", getSingleOrder);

// Update an order
router.put("/:id", updateOrder);
// Delete an order
router.delete("/:id", deleteOrder);

export default router;
