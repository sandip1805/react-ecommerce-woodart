const express = require("express");
const passport = require("passport");

require("dotenv").config();

const router = express.Router();

/**
 * @route GET /auth/isAuthenticated
 * @desc Check if the user is authenticated
 */
router.get("/isAuthenticated", (req, res) => {
  res.status(200).json({ isAuthenticated: req.isAuthenticated() });
});

/**
 * @route GET /auth/profile
 * @desc Get the current authenticated user's profile
 */
router.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ error: "Unauthorized. Please log in." });
  }
});

/**
 * @route GET /auth/login
 * @desc Log in a user via Auth0
 */
router.get(
  "/login",
  passport.authenticate("auth0", {
    scope: "openid email profile",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

/**
 * @route GET /auth/callback
 * @desc Auth0 callback for login
 */
router.get("/callback", (req, res, next) => {
  passport.authenticate("auth0", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/auth/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      const returnTo = req.session.returnTo || "/";
      delete req.session.returnTo;
      res.redirect(returnTo);
    });
  })(req, res, next);
});

/**
 * @route GET /auth/logout
 * @desc Log out the current user
 */
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: "Logged out successfully" });
  });
});

module.exports = router;
