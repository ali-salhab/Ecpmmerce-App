import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Serve React frontend
app.use(express.static(path.join(__dirname, "admin-build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "admin-build", "index.html"));
});

// Your API routes
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
