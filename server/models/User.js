const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  addressLine: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true }, // Hash for secure storage
  addresses: [addressSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
