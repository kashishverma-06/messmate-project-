const pool = require("../config/db");

// TABLE CREATE (run once when server starts)
const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS messes (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        location VARCHAR(255) NOT NULL,
        price INT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("✅ Mess table ready");
  } catch (err) {
    console.error("❌ Table creation error:", err.message);
  }
};

createTable();

module.exports = pool;