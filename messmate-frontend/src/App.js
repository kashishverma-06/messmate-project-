import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

// Components
import Navbar from "./components/Navbar";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

// Mess System
import MessList from "./components/MessList";
import AddMessForm from "./components/AddMessForm";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          {/* PUBLIC HOME */}
          <Route path="/" element={<Home />} />

          {/* AUTH */}
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />

          {/* PROTECTED DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* PROFILE (PROTECTED) */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* MESS SYSTEM (PROTECTED - IMPORTANT FIX) */}
          <Route
            path="/messes"
            element={
              <ProtectedRoute>
                <div>
                  <AddMessForm />
                  <MessList />
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;