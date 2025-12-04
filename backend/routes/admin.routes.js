import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  getAllOrders,
  updateOrderStatus,
  getDashboradStats,
  getAllCustomers,
  deleteCustomer,
} from "../controllers/admin.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { protectRoute, adminOnly } from "../middleware/auth.middleware.js";
const router = Router();

// optimization --> DRY

// product routes
router.use(protectRoute, adminOnly);
router.post("/products", upload.array("images", 3), createProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", upload.array("images", 3), updateProduct);

// orders routes
// Done by me
router.get("/orders", getAllOrders);
router.patch("/orders/:orderId/status", updateOrderStatus);

// customer routes

router.get("/customers", getAllCustomers);
// TODO: delete customer
router.delete("/customers/:customerId", deleteCustomer);
router.get("/stats", getDashboradStats);
export default router;
