import { Router } from "express";
import {
  createReview,
  deleteReview,
} from "../controllers/review.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = Router();

router.post("/", protectRoute, createReview);
router.delete("/:reviewId", protectRoute, deleteReview);

export default router;
