//   createOrder,
//   getAllOrders,
//   getSingleOrder,
//   updateOrder,
//   deleteOrder,
import { Order } from "../models/order.model.js";
import { Product } from "../models/product.models.js";

import { Review } from "./../models/review.model.js";
export async function createOrder(req, res) {
  try {
    const user = req.user;
    const { orderItems, shippingAddress, paymentResult, totalPrice } = req.body;
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }
    // validate products and stock
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: "Insufficient stock" });
      }
    }
    const order = await Order.create({
      user: user._id,
      orderItems,
      shippingAddress,
      paymentResult,
      totalPrice,
      clerkId: user.clerkId,
    });
    // update product stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: -item.quantity },
      });
    }
    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getUserOrders(req, res) {
  try {
    const orders = await Order.find({ clerkId: req.user.clerkId })
      .populate("user", "name email")
      .populate("orderItems.product")
      .sort({ createdAt: -1 });

    //   check if the order has been reviewed
    const ordersWithReviews = await Promise.all(
      orders.map(async (order) => {
        const review = await Review.findOne({ orderId: order._id });
        return { ...order.toObject(), hasReviewed: !!review };
      })
    );
    res.status(200).json({
      orders: ordersWithReviews,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export function getAllOrders(req, res) {}
export function getSingleOrder(req, res) {}
export function updateOrder(req, res) {}
export function deleteOrder(req, res) {}
