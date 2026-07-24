import React,{useEffect,useState} from "react";
import {useParams,useNavigate} from "react-router-dom";
import axios from "../axiosConfig";
import toast from "react-hot-toast";
import "../styles/AddMessForm.css";


const EditMess=()=>{


const {id}=useParams();
const navigate=useNavigate();


const [formData,setFormData]=useState({

name:"",
location:"",
price:"",
image_url:"",
rating:""

});


const [loading,setLoading]=useState(false);



useEffect(()=>{

fetchMess();

},[]);



const fetchMess=async()=>{

try{

const res=await axios.get(`/messes/${id}`);

setFormData(res.data);

}
catch(error){

console.log(error);

toast.error("Unable to load mess");

}

};




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


await axios.put(

`/messes/${id}`,

{

name:formData.name,
location:formData.location,
price:Number(formData.price),
image_url:formData.image_url,
rating:Number(formData.rating || 0)

}

);


toast.success(
"Mess updated successfully"
);


navigate("/manage-messes");


}
catch(error){

console.log(error);

toast.error(
"Update failed"
);

}
finally{

setLoading(false);

}


};




return(


<div className="mess-form-container">

<button

className="edit-back-btn"

onClick={()=>navigate("/manage-messes")}

>
← Back Manage Messes
</button>



<div className="mess-form-card">


<div className="form-header">

<h2>
✏️ Edit Mess
</h2>

<p>
Update your mess details
</p>

</div>




<form
className="mess-form"
onSubmit={handleSubmit}
>


<div className="form-group">

<label>
Mess Name
</label>


<input

className="form-input"

name="name"

value={formData.name}

onChange={handleChange}

/>

</div>



<div className="form-group">

<label>
Location
</label>


<input

className="form-input"

name="location"

value={formData.location}

onChange={handleChange}

/>

</div>



<div className="form-group">

<label>
Price
</label>


<input

className="form-input"

name="price"

value={formData.price}

onChange={handleChange}

/>

</div>




<div className="form-group">

<label>
Image URL
</label>


<input

className="form-input"

name="image_url"

value={formData.image_url}

onChange={handleChange}

/>

</div>




<div className="form-group">

<label>
Rating
</label>


<input

className="form-input"

name="rating"

value={formData.rating}

onChange={handleChange}

/>

</div>




<button

className="submit-btn"

disabled={loading}

>

{
loading
?
"Updating..."
:
"Update Mess"
}

</button>



</form>


</div>


</div>


);


};


export default EditMess;