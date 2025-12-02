import mongoose from "mongoose";
import { ENV } from "./env.js";
export const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Error in connecting to database", err));
};
