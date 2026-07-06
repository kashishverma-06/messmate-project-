const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    // 1. Check header exists
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    // 2. Format check: Bearer token
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const token = authHeader.split(" ")[1];

    // 3. Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallbacksecret"
    );

    // 4. Attach user info safely
    req.userId = decoded.userId;

    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);

    return res.status(401).json({
      message: "Unauthorized: Invalid or expired token",
    });
  }
};