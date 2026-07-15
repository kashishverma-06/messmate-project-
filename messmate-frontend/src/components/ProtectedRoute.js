import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {

  const { user } = useContext(AuthContext);

  const location = useLocation();

  const token = localStorage.getItem("token");


  if (!user && !token) {

    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname
        }}
      />
    );

  }


  return children;

};


export default ProtectedRoute;