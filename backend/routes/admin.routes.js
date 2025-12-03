import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/admin.controller.js";

import { protectRoute, adminOnly } from "../middleware/auth.middleware.js";
const router = Router();

// optimization --> DRY
router.use(protectRoute, adminOnly);
router.post("/products", createProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", updateProduct);
export default router;
