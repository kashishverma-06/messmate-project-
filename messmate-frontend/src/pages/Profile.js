import React,{useEffect,useState} from "react";
import axios from "../axiosConfig";
import toast from "react-hot-toast";
import "../styles/Profile.css";


const Profile=()=>{

const [profile,setProfile]=useState(null);
const [loading,setLoading]=useState(true);


useEffect(()=>{
fetchProfile();
},[]);



const fetchProfile=async()=>{

try{

const res=await axios.get("/api/auth/profile");

setProfile(res.data);


}catch(error){

console.log("PROFILE ERROR:",error);

toast.error("Unable to load profile");


}finally{

setLoading(false);

}

};



if(loading){

return(

<div className="profile-loader">

<div className="loader-circle"></div>

<p>
Loading your profile...
</p>

</div>

);

}



if(!profile){

return(

<div className="profile-loader">

<h3>
Profile not found
</h3>

<p>
Please login again
</p>

</div>

);

}



return(

<div className="profile-page">


<div className="profile-cover"></div>



<div className="profile-card">



<div className="profile-header">


<div className="profile-avatar">

{profile.username?.charAt(0).toUpperCase()}

</div>



<h1>
{profile.username}
</h1>


<p>
Welcome back to MessMate 🍽️
</p>



<span className="role-badge">

{profile.role || "User"}

</span>



</div>





<div className="profile-details">


<div className="profile-box">

<span>
Username
</span>

<h3>
{profile.username}
</h3>

</div>




<div className="profile-box">

<span>
Email Address
</span>

<h3>
{profile.email}
</h3>

</div>




<div className="profile-box">

<span>
Account Type
</span>

<h3>
{profile.role || "User"}
</h3>

</div>




<div className="profile-box">

<span>
Member ID
</span>

<h3>
#{profile.id}
</h3>

</div>


</div>




<div className="profile-footer">

<p>
✨ Thank you for being a part of MessMate community
</p>

</div>



</div>


</div>


);

};


export default Profile;