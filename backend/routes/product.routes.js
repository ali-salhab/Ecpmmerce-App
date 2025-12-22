import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllProducts } from "../controllers/admin.controller.js";
import { getProductbyId } from "../controllers/product.controller.js";

const router = Router();

router.get("/", protectRoute, getAllProducts);
router.post("/:id", protectRoute, getProductbyId);

export default router;
