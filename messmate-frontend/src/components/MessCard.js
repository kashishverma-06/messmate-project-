import React from "react";
import { useNavigate } from "react-router-dom";

import "../styles/MessLIst.css";


function MessCard({ mess }) {

  const navigate = useNavigate();

  const rating = Number(mess.rating) || 0;


  return (

    <div className="mess-card">


      <div className="mess-view">


        <div className="mess-image">

          <img
            src={mess.image_url}
            alt={`${mess.name} mess`}
            onError={(e)=>{
              e.target.src="/default-mess.jpg";
            }}
          />

        </div>



        <h3>
          {mess.name}
        </h3>



        <p>
          📍 {mess.location}
        </p>



        <p className="price">

          ₹{Number(mess.price).toLocaleString("en-IN")}/month

        </p>




        <div className="rating">


          {"⭐".repeat(Math.floor(rating))}

          {"☆".repeat(5 - Math.floor(rating))}


          <span>
            {rating.toFixed(1)}/5
          </span>


        </div>




        <div className="btn-group">


          <button
            className="view-btn"
            onClick={() => navigate(`/mess/${mess.id}`)}
          >

            View Details

          </button>


        </div>



      </div>


    </div>

  );

}


export default MessCard;