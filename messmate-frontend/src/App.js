import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

// Old Mess Components
import MessList from './components/MessList';
import AddMessForm from './components/AddMessForm';

//Profile
import Profile from './pages/Profile';


function App() {
  return (
    <AuthProvider>
      <Router>

        <Navbar />

        <Routes>
          {/* Home Page (old mess UI + new home) */}
          <Route
            path="/"
            element={
              <div>
                <Home />

                {/* Old Mess System */}
                <AddMessForm />
                <MessList />
              </div>
            }
          />

          {/* Auth Pages */}
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />

          {/* Protected Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path ="/profile" element ={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          }
          />
        </Routes>

      </Router>
    </AuthProvider>
  );
}

export default App;