const express = require("express");
const { isAuthenticated } = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

/**
 * @route GET /users/profile
 * @desc Get the current authenticated user's profile
 */
router.get("/profile", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user profile" });
  }
});

/**
 * @route PUT /users/profile
 * @desc Update the current authenticated user's profile
 */
router.put("/profile", isAuthenticated, async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user profile" });
  }
});

/**
 * @route GET /users/addresses
 * @desc Get the user's saved addresses
 */
router.get("/addresses", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.addresses);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve addresses" });
  }
});

/**
 * @route POST /users/addresses
 * @desc Add a new address to the user's profile
 */
router.post("/addresses", isAuthenticated, async (req, res) => {
  try {
    const { addressLine, city, state, postalCode, country } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.addresses.push({ addressLine, city, state, postalCode, country });
    const updatedUser = await user.save();

    res.status(201).json(updatedUser.addresses);
  } catch (error) {
    res.status(500).json({ error: "Failed to add address" });
  }
});

/**
 * @route PUT /users/addresses/:addressId
 * @desc Update an existing address
 */
router.put("/addresses/:addressId", isAuthenticated, async (req, res) => {
  try {
    const { addressLine, city, state, postalCode, country } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const address = user.addresses.id(req.params.addressId);
    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    address.addressLine = addressLine || address.addressLine;
    address.city = city || address.city;
    address.state = state || address.state;
    address.postalCode = postalCode || address.postalCode;
    address.country = country || address.country;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser.addresses);
  } catch (error) {
    res.status(500).json({ error: "Failed to update address" });
  }
});

/**
 * @route DELETE /users/addresses/:addressId
 * @desc Delete an address from the user's profile
 */
router.delete("/addresses/:addressId", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const address = user.addresses.id(req.params.addressId);
    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    address.remove();
    const updatedUser = await user.save();

    res.status(200).json(updatedUser.addresses);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete address" });
  }
});

module.exports = router;
