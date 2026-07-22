const express = require("express");
const router = express.Router();
const pool = require("../config/db");


// ================= GET ALL MESSES =================

router.get("/", async (req,res)=>{

try{

const {
location,
minPrice,
limit,
offset
}=req.query;


let query="SELECT * FROM messes WHERE 1=1";

let values=[];

let count=1;



if(location){

query+=` AND location ILIKE $${count}`;

values.push(`%${location}%`);

count++;

}



if(minPrice){

query+=` AND price >= $${count}`;

values.push(parseInt(minPrice));

count++;

}



query+=` ORDER BY id DESC LIMIT $${count} OFFSET $${count+1}`;


values.push(
parseInt(limit) || 100
);


values.push(
parseInt(offset) || 0
);



const result=await pool.query(
query,
values
);



res.json(result.rows);



}
catch(err){

console.error(
"GET MESSES ERROR:",
err
);


res.status(500).json({

message:"Server error",

error:err.message

});


}

});





// ================= GET MESS BY ID =================

router.get("/:id",async(req,res)=>{


try{


const result=await pool.query(

"SELECT * FROM messes WHERE id=$1",

[req.params.id]

);



const mess=result.rows[0];



if(!mess){

return res.status(404).json({

message:"Mess not found"

});

}



res.json(mess);



}
catch(err){


res.status(400).json({

message:"Invalid ID format",

error:err.message

});


}


});





// ================= CREATE MESS =================

router.post("/",async(req,res)=>{


try{


const {
name,
location,
price,
image_url,
rating
}=req.body;



if(!name || !location || !price){

return res.status(400).json({

message:"name, location, price required"

});

}



const result=await pool.query(

`
INSERT INTO messes
(
name,
location,
price,
image_url,
rating
)

VALUES($1,$2,$3,$4,$5)

RETURNING *
`,

[
name,
location,
price,
image_url || null,
rating || 0
]

);



res.status(201).json(
result.rows[0]
);



}
catch(err){


console.error(
"POST MESSES ERROR:",
err
);


res.status(400).json({

message:"Invalid input",

error:err.message

});


}


});







// ================= UPDATE MESS =================

router.put("/:id",async(req,res)=>{


try{


const {
name,
location,
price,
image_url,
rating
}=req.body;



const result=await pool.query(

`
UPDATE messes

SET

name=$1,
location=$2,
price=$3,
image_url=$4,
rating=$5

WHERE id=$6

RETURNING *
`,

[
name,
location,
price,
image_url || null,
rating || 0,
req.params.id
]

);



if(result.rows.length===0){


return res.status(404).json({

message:"Mess not found"

});


}



res.json({

message:"Mess updated successfully",

mess:result.rows[0]

});



}
catch(err){


console.error(
"UPDATE MESS ERROR:",
err
);



res.status(400).json({

message:"Update failed",

error:err.message

});


}


});







// ================= DELETE MESS =================

router.delete("/:id",async(req,res)=>{


try{


const result=await pool.query(

`
DELETE FROM messes
WHERE id=$1
RETURNING *
`,

[req.params.id]

);



if(result.rows.length===0){


return res.status(404).json({

message:"Mess not found"

});


}



res.json({

message:"Mess deleted successfully"

});



}
catch(err){


res.status(400).json({

message:"Delete failed",

error:err.message

});


}


});





module.exports=router;