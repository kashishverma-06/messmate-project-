import React,{useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "../axiosConfig";
import toast from "react-hot-toast";
import "./../styles/OwnerDashboard.css";

const OwnerDashboard=()=>{

const navigate=useNavigate();

const [dashboard,setDashboard]=useState({
totalMesses:0,
totalCustomers:0,
averageRating:0,
messes:[]
});

const [loading,setLoading]=useState(true);


useEffect(()=>{

const fetchDashboard=async()=>{

try{

const res=await axios.get("/api/owner/dashboard");


console.log(
"OWNER DATA:",
res.data
);


setDashboard({

totalMesses:res.data.totalMesses || 0,

totalCustomers:res.data.totalCustomers || 0,

averageRating:res.data.averageRating || 0,

messes:res.data.messes || []

});


}
catch(error){

console.log(
"Dashboard Error:",
error
);

toast.error(
"Dashboard load failed"
);


}
finally{

setLoading(false);

}


};


fetchDashboard();


},[]);



if(loading){

return(

<div className="dashboard-loading">

<h2>
Loading Dashboard...
</h2>

</div>

);

}



return(

<div className="owner-dashboard">


<div className="owner-header">

<div>

<h1>
Welcome Back, Mess Partner 👋
</h1>

<p>
Manage your mess listings easily.
</p>

</div>


<button

className="add-mess-btn"

onClick={()=>navigate("/add-mess")}

>

+ Add New Mess

</button>


</div>





<div className="owner-stats">


<div className="owner-card">

<h3>
Total Messes
</h3>

<h2>
{dashboard.totalMesses}
</h2>

<p>
Your Active Listings
</p>

</div>




<div className="owner-card">

<h3>
Customers
</h3>

<h2>
{dashboard.totalCustomers}
</h2>

<p>
Registered Users
</p>

</div>





<div className="owner-card">

<h3>
Average Rating
</h3>

<h2>
⭐ {dashboard.averageRating}
</h2>

<p>
Customer Reviews
</p>

</div>


</div>







<section className="owner-messes">


<div className="section-header">

<h2>
Your Mess Listings
</h2>


<button

onClick={()=>navigate("/add-mess")}

>

Manage Mess

</button>


</div>





{

dashboard.messes.length===0 ?


(

<div className="empty-owner">

<h3>
🍱 No Mess Added
</h3>

<p>
Add your first mess listing.
</p>


</div>

)


:


(

<div className="table-container">

<table className="owner-table">


<thead>

<tr>

<th>
Image
</th>

<th>
Name
</th>

<th>
Location
</th>

<th>
Price
</th>

<th>
Rating
</th>

<th>
Action
</th>

</tr>

</thead>



<tbody>


{

dashboard.messes.map((mess)=>(


<tr key={mess.id}>


<td>

<img

src={
mess.image_url ||
"https://via.placeholder.com/100"
}

alt={mess.name}

/>

</td>



<td>
{mess.name}
</td>


<td>
📍 {mess.location}
</td>


<td>
₹{mess.price}/month
</td>


<td>
⭐ {mess.rating || 0}
</td>



<td>


<button

onClick={()=>navigate(`/mess/${mess.id}`)}

>

View

</button>


</td>


</tr>


))


}


</tbody>


</table>


</div>


)


}



</section>




</div>


);


};


export default OwnerDashboard;