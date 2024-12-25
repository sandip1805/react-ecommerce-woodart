const express = require("express");
const { isAuthenticated } = require("../middleware/authMiddleware");
const Order = require("../models/Order");
const Payment = require("../models/Payment");

// Example: Stripe Integration
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

/**
 * @route POST /payments/checkout
 * @desc Initiate a payment for an order
 */
router.post("/checkout", isAuthenticated, async (req, res) => {
  const { orderId } = req.body;

  try {
    const order = await Order.findOne({ _id: orderId, userId: req.user._id });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.status !== "Pending") {
      return res.status(400).json({ error: "Order is not in a payable state" });
    }

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalPrice * 100), // Stripe requires amount in cents
      currency: "usd",
      payment_method_types: ["card"],
      metadata: { orderId: order._id.toString() },
    });

    // Save payment record
    const payment = new Payment({
      userId: req.user._id,
      orderId: order._id,
      paymentIntentId: paymentIntent.id,
      amount: order.totalPrice,
      status: "Initiated",
    });
    await payment.save();

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ error: "Failed to initiate payment" });
  }
});

/**
 * @route GET /payments/status/:orderId
 * @desc Check the payment status of an order
 */
router.get("/status/:orderId", isAuthenticated, async (req, res) => {
  try {
    const payment = await Payment.findOne({ orderId: req.params.orderId, userId: req.user._id });

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(payment.paymentIntentId);

    res.status(200).json({
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
    });
  } catch (error) {
    console.error("Payment status error:", error);
    res.status(500).json({ error: "Failed to retrieve payment status" });
  }
});

module.exports = router;
