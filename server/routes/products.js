const express = require("express");
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");
const Product = require("../models/Product");

const router = express.Router();

/**
 * @route GET /products
 * @desc Get a list of all products with filtering and pagination
 */
router.get("/", async (req, res) => {
  try {
    const { category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (minPrice) filter.price = { ...filter.price, $gte: parseFloat(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: parseFloat(maxPrice) };

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      products,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

/**
 * @route GET /products/:id
 * @desc Get details of a single product
 */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product details" });
  }
});

/**
 * @route POST /admin/products
 * @desc Create a new product (Admin only)
 */
router.post("/", isAuthenticated, isAdmin, async (req, res) => {
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
 * @route PUT /admin/products/:id
 * @desc Update an existing product (Admin only)
 */
router.put("/:id", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
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
 * @route DELETE /admin/products/:id
 * @desc Delete a product (Admin only)
 */
router.delete("/:id", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
