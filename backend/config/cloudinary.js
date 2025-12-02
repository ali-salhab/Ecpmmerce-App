import { v2 as cloudinary } from "cloudinary";
import { ENV } from "./env.js";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// we will use this in our routes to upload images to cloudinary
export default cloudinary;
