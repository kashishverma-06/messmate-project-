import React,{useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "../axiosConfig";
import "../styles/Home.css";


const Home=()=>{

const navigate=useNavigate();

const token=localStorage.getItem("token");
const role=localStorage.getItem("role");


const [messes,setMesses]=useState([]);
const [loading,setLoading]=useState(true);



useEffect(()=>{

const fetchMesses=async()=>{

try{

const res=await axios.get("/messes");

setMesses(res.data.slice(0,3));


}catch(err){

console.log("HOME ERROR",err);

}
finally{

setLoading(false);

}

};


fetchMesses();


},[]);





const exploreMesses=()=>{

if(token){

navigate("/messes");

}
else{

navigate("/login");

}

};





const becomePartner=()=>{


if(!token){

navigate("/login");
return;

}


if(role==="owner"){

navigate("/add-mess");

}
else{

alert("Only mess owners can register");

}


};




const locations=[
...new Set(
messes.map(
item=>item.location
)
)
];





return(

<div className="home">



{/* HERO SECTION */}


<section className="hero">


<div className="hero-content">


<h1>

Find Affordable &
Trusted Mess Services

<span>
 Near You
</span>

</h1>



<p>

Discover hygienic, affordable and trusted
mess services around your location with MessMate.

</p>



<div className="hero-buttons">


<button
className="primary-btn"
onClick={exploreMesses}
>

Explore More Messes

</button>



<button
className="secondary-btn"
onClick={becomePartner}
>

Become Mess Partner

</button>


</div>



</div>





<div className="hero-image">


<img

src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5"

alt="Mess kitchen"

/>



<div className="hero-floating-card">

⭐ 4.8 Rating

</div>



</div>



</section>









{/* FEATURED MESSES */}



<section className="featured">


<h2>

Popular Mess Services

</h2>



<p>

Explore trusted food providers near you.

</p>




<div className="mess-container">



{

loading ?


<h3>
Loading messes...
</h3>


:


messes.length ?


messes.map(
(mess)=>(


<div
className="mess-card"
key={mess.id}
>



<div className="mess-image">


<img

src={
mess.image_url ||
"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
}

alt={mess.name}

/>


</div>





<h3>
{mess.name}
</h3>



<p>
📍 {mess.location}
</p>



<p>
₹{mess.price}/month
</p>




<div className="rating">

⭐ {Number(mess.rating || 0).toFixed(1)}

</div>




<button
onClick={exploreMesses}
>

View Details

</button>




</div>


)

)



:


<p>
No mess available
</p>



}


</div>



</section>









{/* HOW IT WORKS */}



<section className="how">


<h2>

How MessMate Works?

</h2>



<div className="steps">



<div>

<span>
1
</span>

<h3>
Create Account
</h3>

<p>
Register your account.
</p>

</div>




<div>

<span>
2
</span>

<h3>
Search Mess
</h3>

<p>
Find nearby mess.
</p>

</div>





<div>

<span>
3
</span>

<h3>
Check Details
</h3>

<p>
Compare price & rating.
</p>

</div>





<div>

<span>
4
</span>

<h3>
Connect Owner
</h3>

<p>
Start your food journey.
</p>

</div>



</div>


</section>

{/* FINAL CTA */}



<section className="owner-section">


<h2>

Ready To Find Your Perfect Mess?

</h2>


<p>

Join MessMate and discover trusted food services.

</p>



<button
onClick={exploreMesses}
>

Explore More Messes

</button>



</section>



</div>

);

};


export default Home;