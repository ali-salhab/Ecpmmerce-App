import express from "express";
import path from "path";
import { ENV } from "../config/env.js";
import { connectDB } from "../config/db.js";
import { clerkMiddleware } from "@clerk/express";

const app = express();
const __dirname = path.resolve();
app.use(clerkMiddleware());
// API routes
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "server is up and running" });
});

// Serve React frontend in production
if (ENV.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "admin-build");
  app.use(express.static(frontendPath));

  // SPA fallback for Express 5
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

app.listen(ENV.PORT || 5001, () => {
  console.log(`📎📎📎📎📎Server running on port ${ENV.PORT || 5001}`);
  connectDB();
});
