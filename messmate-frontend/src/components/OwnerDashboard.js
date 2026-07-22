import React,{useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "../axiosConfig";
import toast from "react-hot-toast";
import "./../styles/OwnerDashboard.css";


const OwnerDashboard=()=>{

const navigate=useNavigate();

const [data,setData]=useState({
  totalMesses:0,
  totalCustomers:0,
  averageRating:0,
  monthlyRevenue:0,
  messes:[]
});

const [loading,setLoading]=useState(true);


useEffect(()=>{

const fetchDashboard=async()=>{

try{

const res=await axios.get(
"/api/owner/dashboard"
);

console.log(
"OWNER DASHBOARD DATA:",
res.data
);


setData({

 totalMesses:res.data.totalMesses || 0,

 totalCustomers:res.data.totalCustomers || 0,

 averageRating:res.data.averageRating || 0,

 monthlyRevenue:res.data.monthlyRevenue || 0,

 messes:res.data.messes || []

});


}
catch(error){

console.log(
"OWNER DASHBOARD ERROR:",
error
);


toast.error(
"Unable to load dashboard"
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
Manage your mess services, customers and listings easily.
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
{data.totalMesses}
</h2>

<p>
Active Listings
</p>

</div>




<div className="owner-card">

<h3>
Customers
</h3>

<h2>
{data.totalCustomers}
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
⭐ {data.averageRating}
</h2>

<p>
Customer Reviews
</p>

</div>




<div className="owner-card">

<h3>
Revenue
</h3>

<h2>
₹{data.monthlyRevenue}
</h2>

<p>
Estimated Earnings
</p>

</div>


</div>







<section className="owner-messes">


<h2>
Your Mess Listings
</h2>



<div className="owner-mess-grid">


{

data.messes.length===0 ?


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


data.messes.map((mess)=>(


<div

className="owner-mess-card"

key={mess.id}

>


<img

src={
mess.image_url ||
"https://via.placeholder.com/400x250?text=Mess+Image"
}

alt={mess.name}

/>



<h3>
{mess.name}
</h3>



<p>
📍 {mess.location}
</p>



<p>
💰 ₹{mess.price}/month
</p>



<p>
⭐ {mess.rating || 0}
</p>




<button

onClick={()=>
navigate(`/mess/${mess.id}`)
}

>

View Details

</button>



</div>


))


}


</div>


</section>







<div className="owner-actions">



<div className="action-box">


<h2>
Manage Mess
</h2>


<p>
Update images, pricing and details.
</p>


<button

onClick={()=>
navigate("/messes")
}

>

Manage

</button>


</div>





<div className="action-box">


<h2>
Add Menu
</h2>


<p>
Food menu management coming soon.
</p>


<button disabled>

Coming Soon

</button>


</div>



</div>





</div>


);

};


export default OwnerDashboard;