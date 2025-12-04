import { Product } from "../models/product.models.js";
import cloudinary from "../config/cloudinary.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
export async function createProduct(req, res) {
  try {
    const { name, description, price, stock, category } = req.body;
    if (!name || !description || !price || !stock || !category) {
      return res.status(400).json({
        message: "All Fields are required",
      });

      Product;
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "At least one image is required",
      });
    }
    if (req.files.length > 3) {
      return res.status(400).json({
        message: "Maximum 3 images allowed",
      });
    }
    const uploadPromisses = req.files.map((file) => {
      return cloudinary.uploader.upload(file.path, {
        folder: "products",
      });
    });

    const uploadResults = await Promise.all(uploadPromisses);
    const imageUrls = uploadResults.map((result) => {
      return result.secure_url;
    });
    const product = await Product.create({
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      category,
      images: imageUrls,
    });
    res.status(201).json(product);
  } catch (error) {
    console.log("Error in creating product");
    res.status(500).json({
      // TO-DO

      message: "Failed to create Product",
    });
  }
}
export async function getAllProducts(req, res) {
  try {
    // -1 desc order
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.log("Error fetching products:", error);
    res.status(500).json({
      message: "internal server error",
    });
  }
}
export async function updateProduct() {}
export async function deleteProduct(req, res) {
  try {
    const { productId } = req.params;
    const { name, description, price, stock, category } = req.body;

    const product = await Product.findOne(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = parseFloat(price);
    if (stock !== undefined) product.stock = parseInt(stock);
    if (category) product.category = category;

    // handle images updates
    if (req.files && req.files.length > 0) {
      if (req.files.length > 3) {
        return res.status(400).json({
          message: "Maximum  3 images allowed ",
        });
      }

      const uploadPromises = req.files.map((file) => {
        return cloudinary.uploader.upload(file.path, {
          folder: "products",
        });
      });

      const uploadResults = await Promise.all(uploadPromises);
      product.images = uploadResults.map((res) => {
        res.secure_url;
      });
      await product.save();
      return res.status(200).json(product);
    }
    // handle image updates if new iamges are uploaded
  } catch (error) {
    console.log("Error updating product:", error);
    res.status(500).json({
      message: "internal server error",
    });
  }
}

export async function getAllOrders() {
  try {
    // -1 desc order
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("orderItems.product")
      .sort({ createdAt: -1 });

    if (!orders) {
      return res.status(404).json({
        message: "No Orders Found",
      });
    }
    return orders;
  } catch (error) {
    console.log("Error fetching orders:", error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
}

export async function updateOrderStatus(req, res) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    if (!["pending", "shipped", "delivered"].includes(status)) {
      return res.status(400).json({
        message:
          "Invalid status. Allowed values are 'pending', 'processing', 'shipped', and 'delivered'.",
      });
    }

    const order = await Order.findOne({ _id: orderId });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    order.status = status;
    // here we added new fields for tracking the delivery status of an order.
    // order models doesn't have these fields so we need to add them manually
    if (status === "delivered" && !order.deliveredAt) {
      order.deliveredAt = new Date();
    }
    if (status === "shipped" && !order.shippedAt) {
      order.shippedAt = new Date();
    }
    if (status === "delivered" && !order.deliveredAt) {
      order.deliveredAt = new Date();
    }

    await order.save();
    console.log("Order Status Updated", order);

    return res.status(200).json(order);
  } catch (error) {
    console.log("Error Updating Order Status", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

// TODO: Add a feature to allow admin to delete specific users/customers
export async function deleteCustomer(_, res) {}
export async function getAllCustomers(_, res) {
  try {
    const customers = await User.find().sort({ createdAt: -1 });
    return res.status(200).json(customers);
  } catch (error) {
    console.log("Error Getting All Customers", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function getDashboradStats(_, res) {
  try {
    const totalUsersCount = await User.countDocuments();
    const totalOrdersCount = await Order.countDocuments();
    const totalProductsCount = await Product.countDocuments();

    // totla prices
    const totalSales = await Order.aggregate([
      {
        $match: { status: "delivered" },
      },
      {
        $group: {
          _id: null,
          totalPrice: { $sum: "$totalPrice" },
        },
      },
    ]);
    // what this this ?
    console.log(totalSales); // [ { _id: null, totalPrice: 1000 } ]
    if (totalSales.length > 0) {
      const totalSalesAmount = totalSales[0]?.totalPrice || 0;
      console.log(totalSalesAmount);
    } else {
      const totalSalesAmount = 0;
    }

    return res.status(200).json({
      totalUsersCount,
      totalOrdersCount,
      totalProductsCount,
      // totalCategoriesCount,
      totalSales,
    });
  } catch (error) {
    console.log("Error getting dashboard stats:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
