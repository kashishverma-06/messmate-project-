import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import toast from "react-hot-toast";
import "../styles/MessDetails.css";

function MessDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [mess, setMess] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchMessDetails();
  }, []);


  const fetchMessDetails = async () => {

    try {

      setLoading(true);

      const res = await axios.get(`/messes/${id}`);

      setMess(res.data);


    } catch(err){

      console.log("DETAIL ERROR:",err);

      toast.error("Unable to load mess details");


    } finally {

      setLoading(false);

    }

  };


  if(loading){

    return (
      <div className="details-loading">
        Loading mess details...
      </div>
    );

  }



  if(!mess){

    return (
      <div className="details-loading">
        Mess not found
      </div>
    );

  }



  const rating = Number(mess.rating) || 0;



  return (

    <div className="mess-details-page">


      <div className="details-card">


        <button
          className="back-btn"
          onClick={()=>navigate(-1)}
        >
          ← Back
        </button>



        <div className="details-image">

          <img
            src={
              mess.image_url ||
              "/default-mess.jpg"
            }
            alt={mess.name}
          />

        </div>



        <div className="details-content">


          <h1>
            {mess.name}
          </h1>



          <p className="location">
            📍 {mess.location}
          </p>



          <p className="price-details">

            ₹{Number(mess.price).toLocaleString("en-IN")}

            <span>
              /month
            </span>

          </p>



          <div className="details-rating">

            {"⭐".repeat(Math.floor(rating))}

            {"☆".repeat(5-Math.floor(rating))}


            <span>
              {rating.toFixed(1)}/5
            </span>

          </div>



          <div className="info-box">


            <div>
              <h4>
                🍱 Food Type
              </h4>

              <p>
                Vegetarian & Healthy Meals
              </p>

            </div>



            <div>

              <h4>
                🕒 Timing
              </h4>

              <p>
                Breakfast - Dinner
              </p>

            </div>



            <div>

              <h4>
                🛡️ Hygiene
              </h4>

              <p>
                Clean & Trusted
              </p>

            </div>


          </div>




          <button className="book-btn">

            Book This Mess

          </button>



        </div>


      </div>


    </div>

  );

}


export default MessDetails;