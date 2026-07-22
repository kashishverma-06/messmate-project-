const pool=require("../config/db");

const createAdminTable=async()=>{

const query=`
CREATE TABLE IF NOT EXISTS admins(
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(150) UNIQUE NOT NULL,
password TEXT NOT NULL,
role VARCHAR(20) DEFAULT 'admin',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

await pool.query(query);

};

module.exports=createAdminTable;