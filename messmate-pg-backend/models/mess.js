const pool = require("../config/db");

const createMessTable = async () => {

  try {

    console.log("Creating mess table...");

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


  } catch(err){

    console.error(
      "❌ Mess table error:",
      err.message
    );

  }

};
module.exports=createMessTable;