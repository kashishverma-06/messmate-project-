import React from "react";
import "../styles/AboutUs.css";


const AboutUs = () => {


const features = [

{
icon:"🔍",
title:"Find Trusted Mess",
desc:"Discover verified and affordable mess services near your location."
},

{
icon:"🍱",
title:"Quality Food",
desc:"Explore hygienic mess options with better food quality and service."
},

{
icon:"⭐",
title:"Ratings & Reviews",
desc:"Choose the best mess according to customer ratings and feedback."
},

{
icon:"📍",
title:"Location Based Search",
desc:"Find mess services easily according to your preferred area."
},

{
icon:"👨‍🍳",
title:"Mess Owner Platform",
desc:"Owners can manage their mess, pricing and customers easily."
},

{
icon:"🔒",
title:"Secure Platform",
desc:"User authentication and secure account management."
}

];



const steps=[

{
number:"01",
title:"Create Account",
desc:"Register yourself as a user or mess owner."
},

{
number:"02",
title:"Explore Mess",
desc:"Search and compare different mess services."
},

{
number:"03",
title:"Choose Best Option",
desc:"Select a mess based on price, location and rating."
},

{
number:"04",
title:"Enjoy Food",
desc:"Connect with trusted mess providers."
}

];




return (

<div className="about-page">


<section className="about-hero">


<div className="about-content">


<h1>
Connecting People With
<span> Trusted Mess Services 🍱</span>
</h1>


<p>
MessMate is a smart digital platform designed to
bridge the gap between students, professionals and
trusted mess owners. We make finding affordable,
hygienic and reliable food services easier than ever.
</p>


<button>
Explore Messes
</button>


</div>



<div className="about-image">

<div className="floating-card">

🍛 Healthy Food
<br/>
Trusted Mess

</div>

</div>


</section>





<section className="about-section">


<h2>
About MessMate
</h2>


<p>

MessMate is a next-generation mess management and
food discovery platform created to solve the everyday
problem of finding good quality food away from home.

Whether you are a student, working professional or
new resident in a city, MessMate helps you discover
the perfect mess according to your needs.

Our platform allows users to search mess services,
check pricing, view ratings and connect with mess
owners easily.

</p>


</section>






<section className="mission-section">


<div className="mission-card">

<h3>
🎯 Our Mission
</h3>

<p>
Our mission is to make affordable and hygienic food
accessible for everyone while helping local mess
owners grow their business digitally.
</p>

</div>



<div className="mission-card">

<h3>
🚀 Our Vision
</h3>

<p>
Our vision is to become India's most trusted mess
discovery platform where finding quality food becomes
simple, transparent and convenient.
</p>

</div>


</section>







<section className="feature-section">


<h2>
Why Choose MessMate?
</h2>


<div className="feature-grid">


{
features.map((item,index)=>(

<div 
className="feature-card"
key={index}
>


<div className="feature-icon">
{item.icon}
</div>


<h3>
{item.title}
</h3>


<p>
{item.desc}
</p>


</div>

))
}



</div>


</section>







<section className="how-section">


<h2>
How MessMate Works
</h2>


<div className="steps-container">


{
steps.map((step,index)=>(

<div 
className="step-card"
key={index}
>


<div className="step-number">

{step.number}

</div>


<h3>
{step.title}
</h3>


<p>
{step.desc}
</p>


</div>

))
}



</div>


</section>













</div>

);

};


export default AboutUs;