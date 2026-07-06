require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const pool = require("./config/db");

const messRoutes = require("./routes/messRoutes");
const authRoutes = require("./routes/auth");

const PORT = process.env.PORT || 5000;


// ================= MIDDLEWARE =================
app.use(express.json());
app.use(cors({
  origin: "*", // frontend dev safe
}));
app.use(morgan("dev"));


// ================= ROUTES =================
app.use("/messes", messRoutes);
app.use("/api/auth", authRoutes);


// ================= HEALTH CHECK =================
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "API IS RUNNING 🚀",
      time: result.rows[0],
    });
  } catch (err) {
    console.error("ROOT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// ================= GLOBAL ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({
    message: "Something went wrong",
    error: err.message,
  });
});


// ================= SERVER START =================
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});