import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  const [messes, setMesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMesses = async () => {
      try {
        const res = await axios.get("/messes");

        setMesses(res.data.slice(0, 3));

      } catch (error) {
        console.log("HOME DATA ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMesses();
  }, []);


  const features = [
    {
      icon: "🍱",
      title: "Quality Food",
      desc: "Fresh and hygienic meals from trusted mess providers."
    },
    {
      icon: "🔍",
      title: "Easy Discovery",
      desc: "Find the best mess according to your location."
    },
    {
      icon: "💰",
      title: "Affordable Plans",
      desc: "Choose food plans that match your budget."
    },
    {
      icon: "⭐",
      title: "Trusted Messes",
      desc: "Connect with reliable food services."
    }
  ];


  const locations = [
    ...new Set(messes.map((mess) => mess.location))
  ];


  const averagePrice = messes.length
    ? Math.round(
        messes.reduce(
          (sum, mess) => sum + Number(mess.price),
          0
        ) / messes.length
      )
    : 0;


  return (
    <div className="home">

      {/* HERO SECTION */}

      <section className="hero">

        <div className="hero-content">

          <h1>
            Find Your Perfect Mess
            <span> Near You</span>
          </h1>

          <p>
            Discover affordable, hygienic and trusted mess
            services with MessMate.
          </p>


          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => navigate("/messes")}
            >
              Explore Messes
            </button>


            <button
              className="secondary-btn"
              onClick={() => navigate("/add-mess")}
            >
              Register Your Mess
            </button>

          </div>

        </div>


        <div className="hero-image">

          <div className="food-card">

            🍛

            <h3>
              Fresh Meals
            </h3>

            <p>
              Healthy Food Everyday
            </p>

          </div>

        </div>

      </section>



      {/* FEATURES */}

      <section className="features">

        <h2>
          Why Choose MessMate?
        </h2>


        <div className="feature-container">

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



      {/* FEATURED MESSES */}

      <section className="featured">

        <h2>
          Popular Messes 🍽️
        </h2>


        <div className="mess-container">

          {
            loading ? (

              <p>
                Loading messes...
              </p>

            ) : messes.length ? (

              messes.map((mess)=>(
                <div
                  className="mess-card"
                  key={mess.id}
                >

                  <div className="mess-image">
                    🍽️
                  </div>


                  <h3>
                    {mess.name}
                  </h3>


                  <p>
                    📍 {mess.location}
                  </p>


                  <p>
                    💰 ₹{mess.price}/month
                  </p>


                  <button
                    onClick={() => navigate("/messes")}
                  >
                    View Messes
                  </button>


                </div>
              ))

            ) : (

              <p>
                No mess available
              </p>

            )
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
            <span>1</span>
            <h3>Search</h3>
            <p>
              Find mess near your location.
            </p>
          </div>


          <div>
            <span>2</span>
            <h3>Compare</h3>
            <p>
              Compare prices and facilities.
            </p>
          </div>


          <div>
            <span>3</span>
            <h3>Connect</h3>
            <p>
              Connect with mess providers.
            </p>
          </div>

        </div>

      </section>



      {/* DYNAMIC STATS */}

      <section className="stats">


        <div>
          <h2>
            {messes.length}+
          </h2>

          <p>
            Featured Messes
          </p>
        </div>


        <div>
          <h2>
            {locations.length}+
          </h2>

          <p>
            Locations
          </p>
        </div>


        <div>
          <h2>
            ₹{averagePrice}
          </h2>

          <p>
            Average Price
          </p>
        </div>


        <div>
          <h2>
            100%
          </h2>

          <p>
            Trusted
          </p>
        </div>


      </section>



      {/* CTA */}

      <section className="owner-section">

        <h2>
          Own a Mess?
        </h2>


        <p>
          Register your mess and connect with more students.
        </p>


        <button
          onClick={() => navigate("/add-mess")}
        >
          Register Now
        </button>

      </section>


    </div>
  );
};

export default Home;
/*import React from "react";
import "../styles/Home.css";

const Home = () => {
  const features = [
    {
      icon: "🍱",
      title: "Quality Food",
      desc: "Enjoy fresh, hygienic and tasty meals from trusted mess providers."
    },
    {
      icon: "🔍",
      title: "Easy Discovery",
      desc: "Find the best mess options near your college or workplace."
    },
    {
      icon: "💰",
      title: "Affordable Plans",
      desc: "Compare prices and choose plans that fit your budget."
    },
    {
      icon: "⭐",
      title: "Verified Messes",
      desc: "Connect with reliable and student-friendly mess services."
    }
  ];


  const messes = [
    {
      name:"Sharma Food Corner",
      location:"Bhopal",
      price:"₹2500/month",
      rating:"4.8"
    },
    {
      name:"Royal Student Mess",
      location:"Indore",
      price:"₹3000/month",
      rating:"4.6"
    },
    {
      name:"Healthy Kitchen",
      location:"Khandwa",
      price:"₹2200/month",
      rating:"4.7"
    }
  ];


  return (
    <div className="home">


      {/* HERO SECTION }

      <section className="hero">

        <div className="hero-content">

          <h1>
            Find Your Perfect Mess
            <span> Near You</span>
          </h1>

          <p>
            Discover affordable, hygienic and trusted mess services
            with MessMate. Find food that fits your lifestyle and budget.
          </p>


          <div className="hero-buttons">

            <button className="primary-btn">
              Explore Messes
            </button>

            <button className="secondary-btn">
              Register Your Mess
            </button>

          </div>

        </div>


        <div className="hero-image">

          <div className="food-card">

            🍛

            <h3>
              Fresh Meals
            </h3>

            <p>
              Daily Healthy Food
            </p>

          </div>


        </div>


      </section>



      {/* SEARCH SECTION /}


      <section className="search-section">

        <h2>
          Search Your Mess
        </h2>


        <div className="search-box">

          <input 
            placeholder="Enter Location"
          />


          <select>

            <option>
              Food Type
            </option>

            <option>
              Veg
            </option>

            <option>
              Non Veg
            </option>

          </select>



          <select>

            <option>
              Budget
            </option>

            <option>
              Below ₹2000
            </option>

            <option>
              ₹2000 - ₹3000
            </option>


          </select>


          <button>
            Search
          </button>


        </div>


      </section>




      {/* FEATURES }


      <section className="features">

        <h2>
          Why Choose MessMate?
        </h2>


        <div className="feature-container">


        {
          features.map((item,index)=>(

            <div className="feature-card" key={index}>

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





      {/* FEATURED MESSES }


      <section className="featured">


        <h2>
          Popular Messes
        </h2>



        <div className="mess-container">


        {
          messes.map((mess,index)=>(

            <div className="mess-card" key={index}>


              <div className="mess-image">
                🍽️
              </div>


              <h3>
                {mess.name}
              </h3>


              <p>
                📍 {mess.location}
              </p>


              <p>
                💰 {mess.price}
              </p>


              <p>
                ⭐ {mess.rating}
              </p>


              <button>
                View Details
              </button>


            </div>


          ))
        }


        </div>


      </section>






      {/* HOW IT WORKS }


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
              Search
            </h3>

            <p>
              Find mess near your location.
            </p>

          </div>



          <div>

            <span>
              2
            </span>

            <h3>
              Compare
            </h3>

            <p>
              Compare prices and facilities.
            </p>

          </div>




          <div>

            <span>
              3
            </span>

            <h3>
              Connect
            </h3>

            <p>
              Contact mess owner easily.
            </p>

          </div>



        </div>


      </section>






      {/* CTA }


      <section className="owner-section">


        <h2>
          Own a Mess?
        </h2>


        <p>
          Grow your mess business and reach more students with MessMate.
        </p>


        <button>
          Register Now
        </button>


      </section>






      {/* STATS }


      <section className="stats">


        <div>
          <h2>
            500+
          </h2>

          <p>
            Students
          </p>

        </div>



        <div>

          <h2>
            100+
          </h2>

          <p>
            Mess Partners
          </p>

        </div>



        <div>

          <h2>
            20+
          </h2>

          <p>
            Locations
          </p>

        </div>



        <div>

          <h2>
            4.8 ⭐
          </h2>

          <p>
            Rating
          </p>

        </div>


      </section>



    </div>
  );
};


export default Home;

/*import React from "react";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Welcome to MessMate 🏠</h1>
        <p>Your trusted platform to find and manage mess easily.</p>
      </div>
    </div>
  );
};

export default Home;*/