import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import AdminLogin from "./pages/AdminLogin";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";

import Profile from "./pages/Profile";

import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import OwnerDashboard from "./components/OwnerDashboard";

import MessList from "./components/MessList";
import MessDetails from "./components/MessDetails";
import AddMessForm from "./components/AddMessForm";
import Footer from "./components/Footer";

import OwnerRoute from "./components/OwnerRoute";
import ManageMesses from "./components/ManageMesses";

import { Toaster } from "react-hot-toast";



function AppContent() {

  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/admin-login";

    const hideFooter =
  location.pathname === "/login" ||
  location.pathname === "/signup" ||
  location.pathname === "/admin-login";


  return (
    <>

      {!hideNavbar && <Navbar />}

      <Routes>

        {/* PUBLIC ROUTES */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<AboutUs />}
        />

        <Route
          path="/contact"
          element={<ContactUs />}
        />

        <Route
          path="/signup"
          element={<SignupForm />}
        />

        <Route
          path="/login"
          element={<LoginForm />}
        />


<Route
path="/admin-login"
element={<AdminLogin/>}
/>


        {/* USER ROUTES */}

       

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />


        {/* MESS ROUTES */}

        <Route
          path="/messes"
          element={
            <ProtectedRoute>
              <MessList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mess/:id"
          element={
            <ProtectedRoute>
              <MessDetails />
            </ProtectedRoute>
          }
        />


        {/* OWNER ROUTES */}
{/* OWNER ROUTES */}

<Route
path="/owner-dashboard"
element={
  <OwnerRoute>
    <OwnerDashboard />
  </OwnerRoute>
}
/>



<Route
path="/add-mess"
element={
  <OwnerRoute>
    <AddMessForm />
  </OwnerRoute>
}
/>



<Route
path="/manage-messes"
element={
  <OwnerRoute>
    <ManageMesses />
  </OwnerRoute>
}
/>


        {/* 404 */}

        <Route
          path="*"
          element={
            <div
              style={{
                textAlign: "center",
                marginTop: "100px"
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
      {!hideFooter && <Footer />}

      <Toaster
        position="top-right"
        reverseOrder={false}
      />

    </>
  );
}


function App() {

  return (
    <AuthProvider>

      <Router>

        <AppContent />

      </Router>

    </AuthProvider>
  );

}


export default App;