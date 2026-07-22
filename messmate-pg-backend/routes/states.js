const express = require("express");
const router = express.Router();
const pool = require("../config/db");


router.get("/", async(req,res)=>{

try{


const users = await pool.query(
"SELECT COUNT(*) FROM users"
);


const messes = await pool.query(
"SELECT COUNT(*) FROM messes"
);



const locations = await pool.query(
"SELECT COUNT(DISTINCT location) FROM messes"
);



const rating = await pool.query(
"SELECT AVG(rating) FROM messes"
);



res.json({

totalUsers:Number(
users.rows[0].count
),

totalMesses:Number(
messes.rows[0].count
),

totalLocations:Number(
locations.rows[0].count
),

averageRating:

Number(
rating.rows[0].avg || 0
).toFixed(1)


});



}catch(error){

console.log(
"STATS ERROR:",
error
);


res.status(500).json({

message:"Server error"

});


}



});


module.exports=router;