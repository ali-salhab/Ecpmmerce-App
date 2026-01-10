import express from "express";
import path from "path";
import { ENV } from "../config/env.js";
const app = express();
const __dirname = path.resolve();

app.get("/api/health", (req, res) => {
  res
    .status(200)
    .json({ message: "server is up and running om branch master" });
});

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../admin/dist")));
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../admin", "dist", "index.html"));
  });
}
// set static folder
// make app ready to deploy
app.listen(ENV.PORT || 5001, () => {
  console.log("server is running on port 5001");
});
