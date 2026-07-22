require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const pool = require("./config/db");

// Table creators
const adminRoutes=require("./routes/adminRoutes");
const createUserTable = require("./models/User");
const createMessTable = require("./models/mess");

const messRoutes = require("./routes/messRoutes");
const authRoutes = require("./routes/auth");
const statsRoutes = require("./routes/stats");

const PORT = process.env.PORT || 5000;


// ================= DATABASE INITIALIZATION =================

const initDatabase = async () => {
  try {

    await createUserTable();
    await createMessTable();

    console.log("✅ Database initialized successfully");

  } catch (error) {

    console.error(
      "❌ Database initialization failed:",
      error.message
    );

  }
};


initDatabase();


// ================= MIDDLEWARE =================

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use(morgan("dev"));


// ================= ROUTES =================
app.use("/api/admin",adminRoutes);

app.use("/messes", messRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/stats", statsRoutes);


// ================= HEALTH CHECK =================

app.get("/", async (req,res)=>{

  try{

    const result = await pool.query(
      "SELECT NOW()"
    );

    res.json({
      message:"API IS RUNNING 🚀",
      time:result.rows[0],
    });


  }catch(err){

    console.error(
      "ROOT ERROR:",
      err
    );

    res.status(500).json({
      error:err.message
    });

  }

});


// ================= GLOBAL ERROR HANDLER =================

app.use((err,req,res,next)=>{

  console.error(
    "GLOBAL ERROR:",
    err
  );

  res.status(500).json({
    message:"Something went wrong",
    error:err.message,
  });

});


// ================= SERVER START =================

app.listen(PORT,()=>{

  console.log(
    `Server running at http://localhost:${PORT}`
  );

});