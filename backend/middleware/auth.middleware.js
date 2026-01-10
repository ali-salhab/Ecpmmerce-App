import { requireAuth } from "@clerk/express";
import { User } from "../models/user.model.js";
import { ENV } from "../config/env.js";

export const protectRoute = [
  // this function from clerk
  requireAuth(),
  async (req, res, next) => {
    try {
      // this added because we use clerk middleware in the server
      const clerkId = req.auth().userId;
      console.log(clerkId);

      if (!clerkId)
        return res
          .status(401)
          .json({ message: "Unauthorized - invaild token" });

      const user = await User.findOne({ clerkId });
      const all = await User.find();
      console.log(all);
      console.log(user);
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
// this used for routes allowed only for users
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
