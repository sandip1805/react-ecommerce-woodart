const express = require("express");
const { isAuthenticated } = require("../middleware/authMiddleware");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const router = express.Router();

/**
 * @route GET /cart
 * @desc Get the current user's cart
 */
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate("items.productId");
    if (!cart) {
      return res.status(200).json({ items: [], totalPrice: 0 });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve cart" });
  }
});

/**
 * @route POST /cart
 * @desc Add a product to the cart or update its quantity
 */
router.post("/", isAuthenticated, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (quantity < 1) {
      return res.status(400).json({ error: "Quantity must be at least 1" });
    }

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.quantity * product.price,
      0
    );

    const savedCart = await cart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product to cart" });
  }
});

/**
 * @route PUT /cart/:itemId
 * @desc Update the quantity of a cart item
 */
router.put("/:itemId", isAuthenticated, async (req, res) => {
  const { quantity } = req.body;

  try {
    if (quantity < 1) {
      return res.status(400).json({ error: "Quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(item => item._id.toString() === req.params.itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    cart.items[itemIndex].quantity = quantity;

    const product = await Product.findById(cart.items[itemIndex].productId);
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.quantity * product.price,
      0
    );

    const savedCart = await cart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json({ error: "Failed to update cart item" });
  }
});

/**
 * @route DELETE /cart/:itemId
 * @desc Remove an item from the cart
 */
router.delete("/:itemId", isAuthenticated, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(item => item._id.toString() === req.params.itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    cart.items.splice(itemIndex, 1);

    const product = await Product.findById(cart.items.productId);
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.quantity * product.price,
      0
    );

    const savedCart = await cart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json({ error: "Failed to remove cart item" });
  }
});

module.exports = router;
