const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const expressSession = require("express-session");
const passport = require("passport");

require("dotenv").config();

// Import routes
const authRouter = require("./routes/auth");
const productsRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const ordersRouter = require("./routes/orders");
const paymentsRouter = require("./routes/payments");
const usersRouter = require("./routes/users");
const adminRouter = require("./routes/admin");

// Initialize app
const app = express();

/**
 * CORS Configuration
 */
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000", // Frontend URL
  credentials: true, // Allow credentials (cookies, headers)
};
app.use(cors(corsOptions));

/**
 * Middleware
 */
app.use(logger("dev")); // Logging
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded requests
app.use(cookieParser()); // Parse cookies
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

/**
 * Session Configuration
 */
const session = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: false,
};
if (app.get("env") === "production") {
  session.cookie.secure = true; // Secure cookies in production
}
app.use(expressSession(session));

/**
 * Passport Configuration
 */
require("./config/passport"); // Assuming you configure Passport in a separate file
app.use(passport.initialize());
app.use(passport.session());

/**
 * Routes
 */
app.use("/auth", authRouter); // Authentication routes
app.use("/products", productsRouter); // Product routes
app.use("/cart", cartRouter); // Cart routes
app.use("/orders", ordersRouter); // Order routes
app.use("/payments", paymentsRouter); // Payment routes
app.use("/users", usersRouter); // User profile routes
app.use("/admin", adminRouter); // Admin routes

/**
 * Default Route
 */
app.get("/", (req, res) => {
  res.send("Welcome to the Wood Store API!");
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
