import React, { useState } from "react";
import toast from "react-hot-toast";
import "../styles/ContactUs.css";

const ContactUs = () => {

  const [form, setForm] = useState({
    name:"",
    email:"",
    message:""
  });


  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };


  const handleSubmit = (e)=>{
    e.preventDefault();

    if(!form.name || !form.email || !form.message){
      toast.error("Please fill all fields");
      return;
    }

    toast.success("Message sent successfully 🎉");

    setForm({
      name:"",
      email:"",
      message:""
    });
  };


  return (

    <div className="contact-page">

      <div className="contact-container">


        <div className="contact-info">

          <h1>
            Contact MessMate 🍱
          </h1>

          <p>
            Have questions about mess services?
            We are here to help you.
          </p>


          <div className="contact-box">

            <h3>
              📍 Address
            </h3>

            <p>
              MessMate, Madhya Pradesh, India
            </p>

          </div>



          <div className="contact-box">

            <h3>
              📧 Email
            </h3>

            <p>
              support@messmate.com
            </p>

          </div>



          <div className="contact-box">

            <h3>
              📞 Phone
            </h3>

            <p>
              +91 9876543210
            </p>

          </div>


        </div>





        <div className="contact-form-card">


          <h2>
            Send Message
          </h2>


          <form onSubmit={handleSubmit}>


            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
            />



            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
            />



            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={form.message}
              onChange={handleChange}
            />



            <button>
              Send Message
            </button>


          </form>


        </div>


      </div>


    </div>

  );

};


export default ContactUs;