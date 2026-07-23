import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "../axiosConfig";
import toast from "react-hot-toast";
import "../styles/AddMessForm.css";

function AddMessForm({onMessAdded}){
    const navigate = useNavigate();

const [loading,setLoading]=useState(false);


const [formData,setFormData]=useState({
name:"",
location:"",
price:"",
image_url:"",
rating:"",

});


const handleChange=(e)=>{

setFormData({

...formData,

[e.target.name]:e.target.value,

});

};





const validateForm=()=>{


if(!formData.name.trim()){

return "Mess name is required";

}


if(!formData.location.trim()){

return "Location is required";

}


if(!formData.price){

return "Monthly price is required";

}



if(Number(formData.price)<=0){

return "Price must be greater than zero";

}



if(!formData.image_url.trim()){

return "Image URL is required";

}



if(Number(formData.rating)<0 || Number(formData.rating)>5){

return "Rating should be between 0 and 5";

}

return null;


};







const handleSubmit=async(e)=>{

e.preventDefault();



const error=validateForm();



if(error){

toast.error(error);

return;

}



try{


setLoading(true);



const res=await axios.post("/messes",{


name:formData.name.trim(),

location:formData.location.trim(),

price:Number(formData.price),

image_url:formData.image_url.trim(),

rating:Number(formData.rating || 0),



});




toast.success(
"Mess Added Successfully 🎉"
);




setFormData({

name:"",
location:"",
price:"",
image_url:"",
rating:"",


});



if(onMessAdded){

onMessAdded(res.data);

}




}catch(err){


console.log(err);


toast.error(

err.response?.data?.message ||

"Failed to add mess"

);


}finally{


setLoading(false);


}



};





return(


<div className="mess-form-container">

<button

type="button"

className="back-btn"

onClick={()=>navigate("/owner-dashboard")}

>

← Back Dashboard

</button>
<div className="mess-form-card">



<div className="form-header">


<h2>
🍱 Register Your Mess
</h2>


<p>
Fill details and list your mess on MessMate.
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

type="text"

name="name"

placeholder="Enter mess name"

value={formData.name}

onChange={handleChange}

className="form-input"

/>


</div>







<div className="form-group">


<label>
Location
</label>


<input

type="text"

name="location"

placeholder="Enter location"

value={formData.location}

onChange={handleChange}

className="form-input"

/>


</div>







<div className="form-group">


<label>
Monthly Price (₹)
</label>


<input

type="number"

name="price"

placeholder="Example: 2500"

value={formData.price}

onChange={handleChange}

className="form-input"

/>


</div>







<div className="form-group">


<label>
Mess Image URL
</label>


<input

type="text"

name="image_url"

placeholder="https://image-url.com"

value={formData.image_url}

onChange={handleChange}

className="form-input"

/>


</div>








<div className="form-group">


<label>
Rating
</label>


<input

type="number"

name="rating"

min="0"

max="5"

step="0.1"

placeholder="4.5"

value={formData.rating}

onChange={handleChange}

className="form-input"

/>


</div>

<div className="form-preview full-width">


<h3>
Image Preview
</h3>



<img

src={
formData.image_url ||
"/default-mess.jpg"
}

alt="Preview"

onError={(e)=>{

e.target.src="/default-mess.jpg";

}}

/>



</div>







<button

type="submit"

className="submit-btn"

disabled={loading}

>


{

loading

?

"Adding Mess..."

:

"Add Mess"

}



</button>





</form>




</div>


</div>



);

}


export default AddMessForm;