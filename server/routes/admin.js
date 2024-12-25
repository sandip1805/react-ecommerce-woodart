const express = require("express");
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");
const Product = require("../models/Product");
const Order = require("../models/Order");

const router = express.Router();

/**
 * @route GET /admin/dashboard
 * @desc Get admin dashboard data (e.g., total products, total orders)
 */
router.get("/dashboard", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: "Pending" });

    res.status(200).json({
      totalProducts,
      totalOrders,
      pendingOrders,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

/**
 * @route GET /admin/orders
 * @desc Get all orders
 */
router.get("/orders", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate("userId", "name email");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

/**
 * @route PUT /admin/orders/:orderId
 * @desc Update the status of an order
 */
router.put("/orders/:orderId", isAuthenticated, isAdmin, async (req, res) => {
  const { status } = req.body;

  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.status = status || order.status;

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to update order status" });
  }
});

/**
 * @route POST /admin/products
 * @desc Add a new product
 */
router.post("/products", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { name, category, description, price, stock, image } = req.body;

    const newProduct = new Product({
      name,
      category,
      description,
      price,
      stock,
      image,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

/**
 * @route PUT /admin/products/:productId
 * @desc Update an existing product
 */
router.put("/products/:productId", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

/**
 * @route DELETE /admin/products/:productId
 * @desc Delete a product
 */
router.delete("/products/:productId", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
