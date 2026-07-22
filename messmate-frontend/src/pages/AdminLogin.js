import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "../axiosConfig";
import toast from "react-hot-toast";
import "../styles/AdminLogin.css";


const AdminLogin=()=>{

const navigate=useNavigate();

const [formData,setFormData]=useState({
email:"",
password:""
});

const [loading,setLoading]=useState(false);


const handleChange=(e)=>{

setFormData({
...formData,
[e.target.name]:e.target.value
});

};



const handleSubmit=async(e)=>{

e.preventDefault();

try{

setLoading(true);


const response = await axios.post(
"/api/admin/login",
{
  email: formData.email.trim(),
  password: formData.password,
}
);


localStorage.setItem(
"token",
response.data.token
);


localStorage.setItem(
"user",
JSON.stringify(response.data.admin)
);


toast.success(
"Admin login successful "
);


navigate("/owner-dashboard");


}catch(error){

toast.error(
error.response?.data?.message || "Login failed"
);

}finally{

setLoading(false);

}

};



return(

<div className="admin-login-container">


<div className="admin-login-card">


<h1>
 Admin Login
</h1>


<p>
Login to manage MessMate platform
</p>



<form onSubmit={handleSubmit}>


<div className="admin-input-group">

<label>
Email
</label>

<input
type="email"
name="email"
placeholder="Enter admin email"
value={formData.email}
onChange={handleChange}
required
/>

</div>



<div className="admin-input-group">

<label>
Password
</label>

<input
type="password"
name="password"
placeholder="Enter password"
value={formData.password}
onChange={handleChange}
required
/>

</div>




<button
type="submit"
disabled={loading}
className="admin-login-btn"
>

{
loading
?
"Logging in..."
:
"Login"
}

</button>


</form>


</div>


</div>

);

};


export default AdminLogin;