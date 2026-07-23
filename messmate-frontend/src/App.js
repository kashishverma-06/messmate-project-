import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";

import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import AdminLogin from "./pages/AdminLogin";

import Profile from "./pages/Profile";
import MessList from "./components/MessList";
import MessDetails from "./components/MessDetails";

import OwnerDashboard from "./components/OwnerDashboard";
import AddMessForm from "./components/AddMessForm";
import ManageMesses from "./components/ManageMesses";
import EditMess from "./components/EditMess";

import ProtectedRoute from "./components/ProtectedRoute";
import OwnerRoute from "./components/OwnerRoute";

import { Toaster } from "react-hot-toast";

function AppContent() {
  const location = useLocation();

  const authPages = ["/login", "/signup", "/admin-login"];

  const hideNavbar = authPages.includes(location.pathname);
  const hideFooter = authPages.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<AboutUs />} />

        <Route path="/contact" element={<ContactUs />} />

        <Route path="/signup" element={<SignupForm />} />

        <Route path="/login" element={<LoginForm />} />

        <Route path="/admin-login" element={<AdminLogin />} />


        {/* ================= USER ROUTES ================= */}

        {/* User Dashboard (Abhi MessList ko hi dashboard bana diya) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MessList />
            </ProtectedRoute>
          }
        />

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

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />


        {/* ================= ADMIN ROUTES ================= */}

        <Route
          path="/admin/dashboard"
          element={
            <OwnerRoute>
              <OwnerDashboard />
            </OwnerRoute>
          }
        />

        <Route
          path="/admin/add-mess"
          element={
            <OwnerRoute>
              <AddMessForm />
            </OwnerRoute>
          }
        />

        <Route
          path="/admin/manage-messes"
          element={
            <OwnerRoute>
              <ManageMesses />
            </OwnerRoute>
          }
        />

        <Route
          path="/admin/edit-mess/:id"
          element={
            <OwnerRoute>
              <EditMess />
            </OwnerRoute>
          }
        />


        {/* ================= OLD ROUTES (Backward Compatibility) ================= */}

        {/* Inhe abhi remove mat karna */}
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

        <Route
          path="/edit-mess/:id"
          element={
            <OwnerRoute>
              <EditMess />
            </OwnerRoute>
          }
        />


        {/* ================= 404 ================= */}

        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", marginTop: "100px" }}>
              <h1>404</h1>
              <p>Page not found</p>
            </div>
          }
        />

      </Routes>

      {!hideFooter && <Footer />}

      <Toaster position="top-right" reverseOrder={false} />
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