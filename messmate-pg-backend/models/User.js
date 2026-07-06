const createTable = async () => {
  try {
    console.log("Creating users table...");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("✅ Users table ready");
  } catch (err) {
    console.error("❌ User table error FULL:", err);
  }
};

createTable();

module.exports = pool;