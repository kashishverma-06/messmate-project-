import React from "react";
import { Link } from "react-router-dom";
import "./../styles/Footer.css";


const Footer = () => {


  return (

    <footer className="messmate-footer">


      <div className="footer-container">



        {/* BRAND */}

        <div className="footer-section brand-section">

          <h2>
            🍱 MessMate
          </h2>

          <p>
            Find affordable, hygienic and trusted mess services
            near you. MessMate connects students, professionals
            and mess owners on one smart platform.
          </p>


        </div>





        {/* QUICK LINKS */}

        <div className="footer-section">


          <h3>
            Quick Links
          </h3>


          <Link to="/">
            Home
          </Link>


          <Link to="/about">
            About Us
          </Link>


          <Link to="/messes">
            Find Mess
          </Link>


          <Link to="/contact">
            Contact
          </Link>


        </div>






        {/* USER */}

        <div className="footer-section">


          <h3>
            For Users
          </h3>


          <Link to="/login">
            Login
          </Link>


          <Link to="/signup">
            Create Account
          </Link>


          <Link to="/profile">
            Profile
          </Link>


        </div>






        {/* OWNER */}

        <div className="footer-section">


          <h3>
            For Mess Owners
          </h3>


          <Link to="/add-mess">
            Add Your Mess
          </Link>


          <Link to="/owner-dashboard">
            Owner Dashboard
          </Link>


          <p>
            Grow your mess business with MessMate.
          </p>


        </div>




        {/* CONTACT */}

        <div className="footer-section">


          <h3>
            Contact
          </h3>


          <p>
            📧 support@messmate.com
          </p>


          <p>
            📞 +91 9876543210
          </p>


          <p>
            📍 Madhya Pradesh, India
          </p>


        </div>



      </div>





      <div className="footer-bottom">


        <p>
          © {new Date().getFullYear()} MessMate.
          All rights reserved.
        </p>


        <div className="social-links">


          <a href="#">
            Instagram
          </a>


          <a href="#">
            Facebook
          </a>


          <a href="#">
            LinkedIn
          </a>


        </div>


      </div>




    </footer>

  );

};


export default Footer;