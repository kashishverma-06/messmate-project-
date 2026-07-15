import React, { createContext, useState, useEffect } from "react";
import axios from "../axiosConfig";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  // Check existing login
  useEffect(() => {

    const verifyUser = async () => {

      const token = localStorage.getItem("token");


      if (!token) {
        setLoading(false);
        return;
      }


      try {

        const res = await axios.get("/api/auth/profile");

        setUser({
          token,
          ...res.data
        });


      } catch (error) {

        console.log("AUTH VERIFY ERROR:", error);

        localStorage.removeItem("token");
        setUser(null);

      }
      finally {

        setLoading(false);

      }

    };


    verifyUser();


  }, []);



  // Login
  const login = async (token) => {

    localStorage.setItem("token", token);


    try {

      const res = await axios.get("/api/auth/profile");


      setUser({
        token,
        ...res.data
      });


    } catch(error){

      console.log(error);

      setUser({
        token
      });

    }

  };



  // Logout
  const logout = () => {

    localStorage.removeItem("token");

    setUser(null);

  };



  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};