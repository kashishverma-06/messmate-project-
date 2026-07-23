const express = require("express");
const router = express.Router();

const pool = require("../config/db");


console.log("OWNER ROUTES LOADED");



router.get("/dashboard", async(req,res)=>{


try{


// total mess count

const messCount = await pool.query(
"SELECT COUNT(*) FROM messes"
);



// total users count

const userCount = await pool.query(
"SELECT COUNT(*) FROM users"
);




// average rating

const ratingResult = await pool.query(
`
SELECT 
COALESCE(AVG(rating),0) AS average_rating
FROM messes
`
);




// all mess data

const messResult = await pool.query(
`
SELECT 
id,
name,
location,
price,
image_url,
rating
FROM messes
ORDER BY id DESC
`
);



const dashboardData={


totalMesses:
Number(
messCount.rows[0].count
),



totalCustomers:
Number(
userCount.rows[0].count
),



averageRating:
Number(
ratingResult.rows[0].average_rating
).toFixed(1),



messes:
messResult.rows


};



console.log(
"Dashboard Data:",
dashboardData
);



res.status(200).json(dashboardData);



}

catch(error){


console.log(
"OWNER DASHBOARD ERROR:",
error
);



res.status(500).json({

message:"Dashboard server error"

});


}



});



module.exports=router;