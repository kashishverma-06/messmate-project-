const pool = require("../config/db");

const initDB = async () => {

  try {

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);


    await pool.query(`
      CREATE TABLE IF NOT EXISTS messes (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        location VARCHAR(255) NOT NULL,
        price INT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);


    console.log("✅ All tables ready");


  } catch(error){

    console.log(
      "❌ DB Init Error:",
      error.message
    );

  }

};


module.exports = initDB;