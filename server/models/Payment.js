const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  paymentIntentId: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: "Initiated" }, // e.g., Initiated, Succeeded, Failed
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", paymentSchema);
