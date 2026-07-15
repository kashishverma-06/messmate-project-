import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

import MessList from "./components/MessList";
import AddMessForm from "./components/AddMessForm";

// Toast Import
import { Toaster } from "react-hot-toast";


function AppContent() {

  const location = useLocation();


  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup";


  return (

    <>

      {
        !hideNavbar && <Navbar />
      }


      <Routes>


        {/* PUBLIC ROUTES */}

        <Route
          path="/"
          element={<Home />}
        />


        <Route
          path="/signup"
          element={<SignupForm />}
        />


        <Route
          path="/login"
          element={<LoginForm />}
        />




        {/* PROTECTED ROUTES */}


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />



        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />




        {/* ADD MESS */}

        <Route
          path="/add-mess"
          element={
            <ProtectedRoute>
              <AddMessForm />
            </ProtectedRoute>
          }
        />




        {/* ALL MESSES */}

        <Route
          path="/messes"
          element={
            <ProtectedRoute>
              <MessList />
            </ProtectedRoute>
          }
        />




        {/* FALLBACK */}

        <Route
          path="*"
          element={
            <div
              style={{
                textAlign:"center",
                marginTop:"100px"
              }}
            >
              <h1>
                404
              </h1>

              <p>
                Page not found
              </p>

            </div>
          }
        />


      </Routes>


      {/* Toast Container */}
      <Toaster
        position="top-right"
        reverseOrder={false}
      />


    </>

  );

}



function App(){

  return(

    <AuthProvider>

      <Router>

        <AppContent />

      </Router>

    </AuthProvider>

  );

}


export default App;