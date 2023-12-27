const jwt = require("jsonwebtoken");
const jwtSecret = "your-secret-key"; // Replace with your actual secret key

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, jwtSecret, (error, user) => {
    if (error) {
      return res.status(403).json({ error: "Token verification failed" });
    }

    req.user = user; // You can access user information in your route handlers
    next();
  });
};

module.exports = authenticateToken;
