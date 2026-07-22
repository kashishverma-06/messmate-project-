import React from "react";
import { Navigate } from "react-router-dom";


const OwnerRoute=({children})=>{


const role=localStorage.getItem("role");


if(role!=="owner"){

return <Navigate to="/" />;

}


return children;


};


export default OwnerRoute;