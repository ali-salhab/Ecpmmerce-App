import express from "express";
import path from "path";
import { ENV } from "../config/env.js";
import { connectDB } from "../config/db.js";
import { clerkMiddleware, User } from "@clerk/express";
import { serve } from "inngest/express";
import adminRoutes from "../routes/admin.routes.js";
import userRoutes from "../routes/user.routes.js";
import { functions, inngest } from "../config/inngest.js";
import productRoutes from "../routes/product.routes.js";
import reviewRoutes from "../routes/review.routes.js";
import orderRoutes from "../routes/order.routes.js";
import cartRoutes from "../routes/cart.routes.js";
import cors from "cors";
import { User } from "../models/user.model.js";
const app = express();
const __dirname = path.resolve();
app.use(express.json());
app.use(clerkMiddleware());

// CREDENTIALS TRUE MEAN THAT WE ALLOW COOKIES TO BE SENT ALONG WITH REQUESTS
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  })
);
// API routes
app.get("/api/health", (req, res) => {
  console.log("health endpoint is called");
  return res.status(200).json({ message: "server is up and running" });
});
app.get("/api/users", (req, res) => {
  console.log("test endpoint is called");
  const data = User.find();
  console.log(data);
  return res.status(200).json({ message: "server is up and running" });
});
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// Serve React frontend in production
if (ENV.NODE_ENV === "production") {
  console.log("we are in production state ");
  const frontendPath = path.join(__dirname, "../admin/dist");
  // console.log(frontendPath);
  app.use(express.static(frontendPath));

  // SPA fallback for Express 5
  // console.log(path.join(__dirname, "../admin", "dist", "index.html"));
  app.get("/{*any}", (req, res) => {
    // this work correctly
    res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
  });
  // ...
}

const startServer = async () => {
  await connectDB();
  app.listen(ENV.PORT || 5001, () => {
    console.log(`📎📎📎📎📎Server running on port ${ENV.PORT || 5001}`);
    // connectDB();
  });
};
startServer();
