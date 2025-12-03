import { requireAuth } from "@clerk/express";
import { User } from "../models/user.model.js";
import { ENV } from "../config/env.js";
import { StatusBar } from "expo-status-bar";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      // this added because we use clerk middleware in the server
      const clerkId = req.auth().userId;
      if (!clerkId)
        return res
          .status(401)
          .json({ message: "Unauthorized - invaild token" });

      const user = await User.findOne({ clerkId });
      if (!user) return res.status(404).json({ message: "user not found" });
      req.user = user;
    } catch (error) {
      console.error("Error in protect middlerare", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
];

export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "unauthorizd - user not found",
    });
  }
  if (req.user.email !== ENV.ADMIN_EMAIL) {
    return res.status(403).json({
      message: "Forbidden admin access only",
    });
  }
  next();
};
