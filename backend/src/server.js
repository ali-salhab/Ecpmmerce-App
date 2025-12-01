import express from "express";
import path from "path";
import { ENV } from "../config/env.js";

const app = express();
const __dirname = path.resolve();

// API routes
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "server is up and running" });
});

// Serve React frontend in production
if (ENV.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "admin-build");
  app.use(express.static(frontendPath));

  // SPA fallback (Express 5 syntax)
  app.get("/*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

app.listen(ENV.PORT || 5001, () => {
  console.log(`Server running on port ${ENV.PORT || 5001}`);
});
