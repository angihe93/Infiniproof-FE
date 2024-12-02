import React, { useState, useEffect } from "react"; // Import React hooks
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Import Navigate for redirection
import Navbar from "./components/Navbar"; // Navbar for navigation
import MainPage from "./components/MainPage";
import LoginPage from "./components/LoginPage";
import LandingPage from "./components/LandingPage";
import AccountOverview from "./components/AccountOverview";
import UploadPage from "./components/UploadPage";

const App = () => {
  // State to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status from localStorage on app load
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Remove login status
    setIsLoggedIn(false); // Update state
  };

  return (
    <Router>
      {/* Navbar: Pass login state and logout handler */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} onLogout={handleLogout} />

      <Routes>
        {/* Main Page */}
        <Route path="/" element={<MainPage />} />

        {/* Login Page */}
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />

        {/* Register Page */}
        <Route path="/register" element={<LandingPage />} />

        {/* Account Overview: Protect this route for logged-in users only */}
        <Route
          path="/account-overview"
          element={
            isLoggedIn ? (
              <AccountOverview />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Upload Page: Protect this route for logged-in users only */}
        <Route
          path="/upload"
          element={
            isLoggedIn ? (
              <UploadPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

