import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import LoadingSpinner from "./LoadingSpinner";
import MessCard from "./MessCard";
import toast from "react-hot-toast";
import "../styles/MessLIst.css";

function MessList({ refresh }) {

  const [messes, setMesses] = useState([]);
  const [locations, setLocations] = useState([]);

  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");


  useEffect(() => {

    fetchMesses();

  }, [location, refresh]);



  const fetchMesses = async () => {

    try {

      setLoading(true);


      const url = location
        ? `/messes?location=${encodeURIComponent(location)}`
        : "/messes";


      const res = await axios.get(url);


      setMesses(res.data);


      const uniqueLocations = [
        ...new Set(
          res.data.map(
            item => item.location
          )
        )
      ];


      setLocations(uniqueLocations);


    } catch (err) {

      console.log("FETCH ERROR:", err);

      toast.error("Failed to load messes");


    } finally {

      setLoading(false);

    }

  };




  const handleDelete = async (id) => {


    const confirmDelete = window.confirm(
      "Are you sure you want to delete this mess?"
    );


    if (!confirmDelete) return;


    try {


      await axios.delete(`/messes/${id}`);



      setMesses((prev)=>
        prev.filter(
          mess => mess.id !== id
        )
      );



      toast.success(
        "Mess deleted successfully"
      );


    } catch(err){

      console.log(
        "DELETE ERROR:",
        err
      );


      toast.error(
        "Delete failed"
      );

    }

  };




  const handleEdit = async(id,data)=>{


    try{


      const res = await axios.put(
        `/messes/${id}`,
        data
      );


      setMesses((prev)=>

        prev.map((mess)=>

          mess.id === id
          ?
          (
            res.data.mess ||
            res.data
          )
          :
          mess

        )

      );


      toast.success(
        "Mess updated successfully"
      );


    }catch(err){

      console.log(
        "EDIT ERROR:",
        err
      );


      toast.error(
        "Update failed"
      );

    }

  };



  const filteredMesses = messes
    .filter((mess)=>

      mess.name
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )

    )
    .sort((a,b)=>{

      if(sort==="lowPrice"){

        return a.price-b.price;

      }


      if(sort==="highPrice"){

        return b.price-a.price;

      }


      if(sort==="rating"){

        return b.rating-a.rating;

      }


      return 0;

    });



  if(loading){

    return <LoadingSpinner/>;

  }



  return (

    <div className="mess-list-container">


      <div className="mess-header">


        <h2>
          🍽️ Explore Mess Services
        </h2>


        <p>
          Find affordable and trusted mess services near you
        </p>


      </div>



      <div className="filter-section">


        <input

          className="search-input"

          placeholder="Search mess..."

          value={search}

          onChange={(e)=>
            setSearch(e.target.value)
          }

        />



        <select

          className="form-select"

          value={location}

          onChange={(e)=>
            setLocation(e.target.value)
          }

        >


          <option value="">
            All Locations
          </option>


          {

            locations.map((loc)=>(

              <option
                key={loc}
                value={loc}
              >

                {loc}

              </option>

            ))

          }


        </select>




        <select

          className="form-select"

          value={sort}

          onChange={(e)=>
            setSort(e.target.value)
          }

        >

          <option value="">
            Sort By
          </option>


          <option value="lowPrice">
            Price Low to High
          </option>


          <option value="highPrice">
            Price High to Low
          </option>


          <option value="rating">
            Highest Rating
          </option>


        </select>




        <button

          className="refresh-btn"

          onClick={fetchMesses}

        >

          🔄 Refresh

        </button>



      </div>





      <div className="mess-count">

        Total Messes:

        <strong>
          {" "}
          {filteredMesses.length}
        </strong>


      </div>





      <div className="card-container">


        {

          filteredMesses.length===0

          ?

          (

            <div className="empty-box">

              <h3>
                😕 No Mess Found
              </h3>

              <p>
                Try changing search or location.
              </p>

            </div>

          )

          :

          (

            filteredMesses.map((mess)=>(

              <MessCard

                key={mess.id}

                mess={mess}

                onDelete={handleDelete}

                onEdit={handleEdit}

              />

            ))

          )

        }



      </div>



    </div>

  );

}


export default MessList;