import { Review } from "../models/review.model.js";
import { Product } from "../models/product.models.js";
import { Order } from "../models/order.model.js";
export const createReview = async (req, res) => {
  try {
    const { productId, rating, orderId } = req.body;
    const user = req.user;

    const order = await Order.findOne({ _id: orderId, clerkId: user.clerkId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (!rating || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }
    if (order.clerkId.toString() !== user.clerkId.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to review this order" });
    }
    if (order.status !== "delivered") {
      return res
        .status(400)
        .json({ message: "Cannot review an order that is not delivered" });
    }

    if (!orderId || !rating) {
      return res
        .status(400)
        .json({ message: "Order ID and rating are required" });
    }
    const productInOrder = order.orderItems.find(
      (item) => item.product.toString() === productId.toString()
    );
    if (!productInOrder) {
      return res
        .status(400)
        .json({ message: "Product not found in the order" });
    }
    const existingReview = await Review.findOne({
      userId: user._id,
      productId,
    });
    if (existingReview) {
      return res.status(400).json({ message: "Review already exists" });
    }
    const review = await Review.create({
      userId: user._id,
      productId,
      orderId,
      rating,
    });

    const reviews = await Review.find({ productId });
    const totalRating = reviews.reduce((acc, item) => acc + item.rating, 0);

    await Product.findByIdAndUpdate(productId, {
      averageRating: totalRating / reviews.length,
      totalReviews: reviews.length,
    });
    res.status(201).json({
      message: "Review created successfully",
      review: review,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const user = req.user;

    const review = await Review.findOne({
      _id: reviewId,
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    // check if the review belongs to the user
    if (review.userId.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this review" });
    }

    const productId = review.productId;
    await Review.findByIdAndDelete(reviewId);
    // update average rating of the product
    const reviews = await Review.find({ productId });

    const totalRating = reviews.reduce((acc, item) => acc + item.rating, 0);
    await Product.findByIdAndUpdate(productId, {
      averageRating: reviews.length ? totalRating / reviews.length : 0,
      totalReviews: reviews.length,
    });

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
