import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import "./Navbar.css";


const Navbar = () => {


  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();


  const [menuOpen,setMenuOpen] = useState(false);



  const closeMenu = () => {

    setMenuOpen(false);

  };




  const handleLogout = () => {


    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );


    if(!confirmLogout)
      return;



    logout();


    toast.success(
      "Logged out successfully 👋"
    );


    navigate("/login");


    closeMenu();


  };





  return (

    <nav className="messmate-navbar">


      <div className="navbar-container">



        {/* LOGO */}

        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >

          MessMate 🍱

        </Link>





        {/* HAMBURGER */}

        <div

          className="navbar-toggle"

          onClick={()=>setMenuOpen(!menuOpen)}

        >

          <span></span>
          <span></span>
          <span></span>


        </div>







        {/* MENU */}


        <div

          className={
            menuOpen
            ?
            "navbar-menu active"
            :
            "navbar-menu"
          }

        >





          <NavLink
            to="/"
            onClick={closeMenu}
          >

            Home

          </NavLink>





          <NavLink
            to="/about"
            onClick={closeMenu}
          >

            About Us

          </NavLink>





          <NavLink
            to="/contact"
            onClick={closeMenu}
          >

            Contact

          </NavLink>





          <NavLink
            to="/messes"
            onClick={closeMenu}
          >

            Find Mess

          </NavLink>







          {
            user && user.role==="user" &&

            <>


              <NavLink
                to="/dashboard"
                onClick={closeMenu}
              >

                Dashboard

              </NavLink>



              <NavLink
                to="/profile"
                onClick={closeMenu}
              >

                Profile

              </NavLink>



            </>

          }








          {
            user && user.role==="owner" &&

            <>


              <NavLink
                to="/owner-dashboard"
                onClick={closeMenu}
              >

                Owner Panel

              </NavLink>




              <NavLink
                to="/add-mess"
                onClick={closeMenu}
              >

                Add Mess

              </NavLink>



            </>

          }







          {
            user && user.role==="admin" &&


            <NavLink
              to="/admin-dashboard"
              onClick={closeMenu}
            >

              Admin Panel

            </NavLink>


          }









          {
            user ?

            (

              <button

                className="navbar-btn"

                onClick={handleLogout}

              >

                Logout


              </button>


            )

            :

            (

              <>


              <Link

                className="navbar-login"

                to="/login"

                onClick={closeMenu}

              >

                Login


              </Link>





              <Link

                className="navbar-signup"

                to="/signup"

                onClick={closeMenu}

              >

                Signup


              </Link>



              </>


            )


          }





        </div>



      </div>



    </nav>

  );

};


export default Navbar;