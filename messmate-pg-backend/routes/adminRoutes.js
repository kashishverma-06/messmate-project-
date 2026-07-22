const express=require("express");
const router=express.Router();

const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const pool=require("../config/db");



router.get("/",(req,res)=>{
  res.json({
    message:"Admin route working"
  });
});


router.post("/login",async(req,res)=>{

try{

const {email,password}=req.body;


const result=await pool.query(
"SELECT * FROM admins WHERE email=$1",
[email]
);


if(result.rows.length===0){
return res.status(401).json({
message:"Admin not found"
});
}


const admin=result.rows[0];


const match=await bcrypt.compare(
password,
admin.password
);


if(!match){
return res.status(401).json({
message:"Invalid password"
});
}


const token=jwt.sign(
{
id:admin.id,
role:"admin"
},
process.env.JWT_SECRET,
{
expiresIn:"1d"
}
);


res.json({
message:"Login successful",
token,
admin:{
name:admin.name,
email:admin.email,
role:"admin"
}
});


}catch(error){

console.log(error);

res.status(500).json({
message:"Server error"
});

}

});


module.exports=router;