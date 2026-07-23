const express = require("express");
const router = express.Router();

const pool = require("../config/db");

console.log("OWNER ROUTES LOADED");


router.get("/dashboard", async(req,res)=>{

try{

const messResult = await pool.query(
"SELECT COUNT(*) FROM messes"
);


const userResult = await pool.query(
"SELECT COUNT(*) FROM users"
);


const ratingResult = await pool.query(
"SELECT COALESCE(AVG(rating),0) AS avg_rating FROM messes"
);


const messesResult = await pool.query(
`
SELECT *
FROM messes
ORDER BY id DESC
`
);


res.json({

totalMesses:Number(
messResult.rows[0].count
),

totalCustomers:Number(
userResult.rows[0].count
),

averageRating:Number(
ratingResult.rows[0].avg_rating
).toFixed(1),

messes:messesResult.rows

});


}
catch(error){

console.log(error);

res.status(500).json({
message:"Dashboard error"
});

}


});


module.exports=router;