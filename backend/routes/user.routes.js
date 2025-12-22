import { Router } from "express";
import {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = Router();
//optimization of code by using middleware and DRY

router.use(protectRoute);

// address routes
router.post("/addresses", addAddress);
router.get("/addresses", getAddresses);
router.delete("/addresses/:id", deleteAddress);
router.put("/addresses/:id", updateAddress);

// wishlist routes
router.post("/whishlist", addToWishlist);
router.post("/whishlist/:productId", removeFromWishlist);
router.get("/whishlist", getWishlist);

export default router;
