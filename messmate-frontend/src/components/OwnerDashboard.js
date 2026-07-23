import React,{useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "../axiosConfig";
import toast from "react-hot-toast";
import "../styles/OwnerDashboard.css";


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

fetchDashboard();

},[]);





const fetchDashboard=async()=>{


try{


const res=await axios.get(
"/api/owner/dashboard",
);



console.log(
"Dashboard Data:",
res.data
);



setDashboard({

totalMesses:
res.data.totalMesses || 0,


totalCustomers:
res.data.totalCustomers || 0,


averageRating:
res.data.averageRating || 0,


messes:
res.data.messes || []

});


}

catch(error){


console.log(
"Dashboard Error:",
error.response?.data || error.message
);


toast.error(
"Unable to load dashboard"
);


}

finally{

setLoading(false);

}


};






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



{/* HEADER */}

<div className="owner-header">


<div className="welcome-section">

<h1>
Welcome Admin 👋
</h1>


<p>
Manage your MessMate business from one place.
</p>


</div>



<button

className="add-mess-btn"

onClick={()=>navigate("/add-mess")}

>

+ Add New Mess

</button>



</div>





{/* STAT CARDS */}


<div className="owner-stats">



<div className="owner-card">

<div className="card-icon">
🍱
</div>

<h3>
Total Messes
</h3>


<h2>
{dashboard.totalMesses}
</h2>


<p>
Active Listings
</p>


</div>





<div className="owner-card">

<div className="card-icon">
👥
</div>


<h3>
Total Customers
</h3>


<h2>
{dashboard.totalCustomers}
</h2>


<p>
Registered Users
</p>


</div>





<div className="owner-card">


<div className="card-icon">
⭐
</div>


<h3>
Average Rating
</h3>


<h2>
{dashboard.averageRating}
</h2>


<p>
Customer Reviews
</p>


</div>




</div>








{/* MESSES SECTION */}



<section className="owner-messes">



<div className="section-header">


<div>

<h2>
Mess Listings
</h2>


<p>
Manage all available mess services
</p>

</div>





<button

onClick={()=>navigate("/manage-messes")}

>

Manage Mess

</button>



</div>







{

dashboard.messes.length===0 ?



<div className="empty-owner">


<h3>
🍱 No Mess Found
</h3>


<p>
Currently no mess listing available.
Add your first mess.
</p>



<button

onClick={()=>navigate("/add-mess")}

>

Add Mess

</button>



</div>



:



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

<strong>
{mess.name}
</strong>

</td>




<td>

📍 {mess.location}

</td>




<td>

₹{mess.price}

</td>




<td>

<span className="rating">

⭐ {mess.rating || 0}

</span>


</td>




<td>


<button

className="view-btn"

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



}



</section>







</div>


);


};


export default OwnerDashboard;