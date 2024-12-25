const express = require("express");
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");
const Order = require("../models/Order");
const Cart = require("../models/Cart");

const router = express.Router();

/**
 * @route POST /orders
 * @desc Place an order from the current user's cart
 */
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const orderItems = cart.items.map((item) => ({
      productId: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      quantity: item.quantity,
    }));

    const totalPrice = cart.items.reduce(
      (total, item) => total + item.quantity * item.productId.price,
      0
    );

    const newOrder = new Order({
      userId: req.user._id,
      items: orderItems,
      totalPrice,
      status: "Pending",
    });

    const savedOrder = await newOrder.save();

    // Clear the cart after placing the order
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to place the order" });
  }
});

/**
 * @route GET /orders
 * @desc Get the current user's order history
 */
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve order history" });
  }
});

/**
 * @route GET /orders/:orderId
 * @desc Get details of a specific order
 */
router.get("/:orderId", isAuthenticated, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.orderId, userId: req.user._id });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve order details" });
  }
});

/**
 * @route PUT /admin/orders/:orderId
 * @desc Update the status of an order (Admin only)
 */
router.put("/:orderId", isAuthenticated, isAdmin, async (req, res) => {
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

module.exports = router;
