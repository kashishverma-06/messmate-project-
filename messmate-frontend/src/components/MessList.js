import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import LoadingSpinner from "./LoadingSpinner";
import MessCard from "./MessCard";
import toast from "react-hot-toast";

function MessList({ refresh }) {

  const [messes, setMesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");


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


      setMesses((prev) =>
        prev.filter(
          (mess) => mess.id !== id
        )
      );


      toast.success(
        "Mess deleted successfully"
      );


    } catch (err) {

      console.log("DELETE ERROR:", err);

      toast.error(
        "Delete failed"
      );

    }

  };



  const handleEdit = async (id, data) => {

    try {

      const res = await axios.put(
        `/messes/${id}`,
        data
      );


      setMesses((prev) =>
        prev.map((mess) =>
          mess.id === id
            ? (
                res.data.mess ||
                res.data
              )
            : mess
        )
      );


      toast.success(
        "Mess updated successfully"
      );


    } catch (err) {

      console.log(
        "EDIT ERROR:",
        err
      );


      toast.error(
        "Update failed"
      );

    }

  };



  if (loading) {

    return <LoadingSpinner />;

  }



  return (

    <div className="mess-list-container">


      <div className="mess-header">

        <h2>
          🍛 Mess Listings
        </h2>


        <p>
          Find and manage available mess services
        </p>

      </div>



      <div className="filter-section">


        <select
          className="form-select"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >

          <option value="">
            All Locations
          </option>


          <option value="Indore">
            Indore
          </option>


          <option value="Bhopal">
            Bhopal
          </option>


          <option value="Khandwa">
            Khandwa
          </option>


          <option value="Ujjain">
            Ujjain
          </option>


        </select>


      </div>



      <div className="mess-count">

        Total Messes:

        <strong>
          {" "}
          {messes.length}
        </strong>

      </div>




      <div className="card-container">


        {
          messes.length === 0

          ?

          (
            <p className="empty-message">
              No mess found 😕
            </p>
          )

          :

          (

            messes.map((mess) => (

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