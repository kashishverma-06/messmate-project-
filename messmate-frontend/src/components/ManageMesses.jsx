import React,{useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "../axiosConfig";
import toast from "react-hot-toast";
import "../styles/ManageMesses.css";

const ManageMesses=()=>{

const navigate=useNavigate();

const [messes,setMesses]=useState([]);

const [loading,setLoading]=useState(true);

const [search,setSearch]=useState("");



useEffect(()=>{

fetchMesses();

},[]);




const fetchMesses=async()=>{

try{

const res=await axios.get("/messes");

setMesses(res.data);

}
catch(error){

console.log(
"GET MESS ERROR:",
error
);

toast.error(
"Unable to load messes"
);

}
finally{

setLoading(false);

}

};






const handleDelete=async(id)=>{

const confirmDelete=window.confirm(

"Are you sure you want to delete this mess?"

);


if(!confirmDelete){

return;

}



try{

await axios.delete(`/messes/${id}`);

toast.success(
"Mess deleted successfully"
);

fetchMesses();

}
catch(error){

console.log(
"DELETE ERROR:",
error
);

toast.error(
"Delete failed"
);

}

};







const handleEdit=(id)=>{

navigate(`/edit-mess/${id}`);

};







const filteredMesses=messes.filter((mess)=>{

return(

mess.name
.toLowerCase()
.includes(search.toLowerCase())

||

mess.location
.toLowerCase()
.includes(search.toLowerCase())

);

});






if(loading){

return(

<div className="manage-loading">

Loading Messes...

</div>

);

}
return(

<div className="manage-container">

<button

className="back-btn"

onClick={()=>navigate("/owner-dashboard")}

>

← Back Dashboard

</button>
<div className="manage-header">

<div>

<h1>
Manage Messes
</h1>

<p>
View, edit and delete your mess listings.
</p>

</div>

<button
className="add-btn"
onClick={()=>navigate("/add-mess")}
>

+ Add New Mess

</button>

</div>




<div className="search-box">

<input

type="text"

placeholder="Search by mess name or location..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>

</div>





{

filteredMesses.length===0 ?

(

<div className="empty-box">

<h2>
No Messes Found
</h2>

<p>
No messes available in database.
</p>

</div>

)

:

(

<div className="table-wrapper">

<table className="mess-table">

<thead>

<tr>

<th>
Image
</th>

<th>
Mess Name
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
Actions
</th>

</tr>

</thead>

<tbody>

{

filteredMesses.map((mess)=>(

<tr key={mess.id}>

<td>

<img

className="mess-image"

src={
mess.image_url ||
"https://via.placeholder.com/120x80?text=Mess"
}

alt={mess.name}

onError={(e)=>{

e.target.src="https://via.placeholder.com/120x80?text=Mess";

}}

/>

</td>

<td>

{mess.name}

</td>

<td>

{mess.location}

</td>

<td>

₹{mess.price}

</td>

<td>

⭐ {mess.rating || 0}

</td>

<td>

<div className="action-buttons">

<button

className="edit-btn"

onClick={()=>handleEdit(mess.id)}

>

Edit

</button>

<button

className="delete-btn"

onClick={()=>handleDelete(mess.id)}

>

Delete

</button>

</div>

</td>

</tr>

))

}

</tbody>

</table>

</div>

)

}

</div>

);

};

export default ManageMesses;