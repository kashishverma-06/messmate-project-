const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const pool = require("../config/db");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "fallbacksecret";


// ================= REGISTER =================
router.post("/register", async (req, res) => {
  const { username, email, password ,role } = req.body;

  if (!username || !email || !password || !role) {
    return res
      .status(400)
      .json({ message: "Username, email, password and account type  are required." });
  }

  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (username, email, password, role ) VALUES ($1, $2, $3, $4) RETURNING id",
      [username, email, hashedPassword, role]
    );

    return res.status(201).json({
      message: "User registered successfully",
      userId: newUser.rows[0].id,
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res
      .status(500)
      .json({ message: "Registration failed due to server error." });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password required" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { userId: user.id,
        role: user.role,
       },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      role:user.role
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res
      .status(500)
      .json({ message: "Login failed due to server error." });
  }
});


// ================= PROFILE =================
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    console.log("User ID from token:", req.userId);

    if (!req.userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No userId in token" });
    }

    const result = await pool.query(
      "SELECT id, username, email, role  FROM users WHERE id = $1",
      [req.userId]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);

  } catch (err) {
    console.error("PROFILE ERROR:", err);

    return res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;