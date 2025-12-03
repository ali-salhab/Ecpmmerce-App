import { Router } from "express";
import { createProduct } from "../controllers/admin.controller";
const router = Router();

router.post("/products", protectRoute, adminOnly, createProduct);
export default router;
