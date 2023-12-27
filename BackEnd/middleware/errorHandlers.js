const express = require("express");
const router = express.Router();
const authenticateToken = require("./authenticateToken"); // Import the middleware

// Protected route
router.get("/protected", authenticateToken, (req, res) => {
  // Access user information from req.user
  res.json({ message: "Access granted" });
});

module.exports = router;
