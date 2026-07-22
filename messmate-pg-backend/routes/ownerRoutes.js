import React from "react";
import {Navigate} from "react-router-dom";

const OwnerRoute=({children})=>{

const token=localStorage.getItem("token");
const role=localStorage.getItem("role");


if(!token){

return <Navigate to="/login" />;

}


if(user.role !== "owner" && user.role !== "admin"){

return <Navigate to="/" />;

}


return children;


};


export default OwnerRoute;