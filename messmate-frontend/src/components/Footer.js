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
            near you. MessMate connects students and professionals
            on one smart platform.
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

      </div>



    </footer>

  );

};


export default Footer;