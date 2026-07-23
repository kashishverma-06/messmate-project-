import React from "react";
import {Navigate} from "react-router-dom";


function OwnerRoute({children}){


const user = JSON.parse(
localStorage.getItem("user")
);


const token = localStorage.getItem("token");



if(!token || !user){

return <Navigate to="/admin-login"/>

}



if(user.role !== "admin"){

return <Navigate to="/"/>

}



return children;


}


export default OwnerRoute;