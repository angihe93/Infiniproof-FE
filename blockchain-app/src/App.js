import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import LoginPage from "./components/LoginPage";
import LandingPage from "./components/LandingPage";
import AccountOverview from "./components/AccountOverview";
import UploadPage from "./components/UploadPage";
import VerificationPage from "./components/VerificationPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage to persist login state
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle logout logic
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} onLogout={handleLogout} />
      <Routes>
        {/* Main Page: Pass isLoggedIn to control conditional navigation */}
        <Route path="/" element={<MainPage isLoggedIn={isLoggedIn} />} />
        {/* Login Page */}
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        {/* Register Page */}
        <Route path="/register" element={<LandingPage />} />
        {/* Account Overview: Protected route */}
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
        {/* Upload Page: Now accessible unconditionally */}
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/verification" element={<VerificationPage />} />
      </Routes>
    </Router>
  );
};

export default App;


