import express from "express";

const app = express();

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "server is up and running" });
});
app.listen(5001, () => {
  console.log("server is running on port 5001");
});
