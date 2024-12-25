const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

// Import routes
const authRouter = require("./routes/auth");
const productsRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const ordersRouter = require("./routes/orders");
const paymentsRouter = require("./routes/payments");
const usersRouter = require("./routes/users");
const adminRouter = require("./routes/admin");

const app = express();

/**
 * MongoDB Connection using Mongoose
 */
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit if the database connection fails
  });

/**
 * Middleware
 */
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000", credentials: true }));

/**
 * Routes
 */
app.use("/auth", authRouter);
app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/orders", ordersRouter);
app.use("/payments", paymentsRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);

/**
 * Default Route
 */
app.get("/", (req, res) => {
  res.send("Welcome to the Woodstore API!");
});

/**
 * Error Handling
 */
// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: "Resource not found" });
});

// Centralized error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "Internal Server Error",
  });
});

module.exports = app;
