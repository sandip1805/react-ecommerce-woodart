const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  image: { type: String }, // URL or base64-encoded image string
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
