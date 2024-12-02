
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";

const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match. Please try again!");
      setMessageType("error");
      return;
    }
  
    try {
      // Use query parameters instead of the request body
      const response = await axios.post(`${API_BASE_URL}/register`, null, {
        params: {
          username: email,
          password: password,
        },
      });
  
      setMessage("Registration successful! Redirecting to login page...");
      setMessageType("success");
  
      // Redirect to the login page after successful registration
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      const errorMsg =
        error.response?.data?.detail || "Registration failed. Please try again.";
      setMessage(typeof errorMsg === "string" ? errorMsg : JSON.stringify(errorMsg));
      setMessageType("error");
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="card shadow p-4" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h3 className="text-center mb-4">Create Account</h3>

        {/* Display success or error messages */}
        {message && (
          <div className={`alert ${messageType === "error" ? "alert-danger" : "alert-success"}`}>
            {message}
          </div>
        )}

        {/* Email input */}
        <div className="form-group mb-3">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password input */}
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
            </button>
          </div>
        </div>

        {/* Confirm password input */}
        <div className="form-group mb-3">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              className="form-control"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
            </button>
          </div>
        </div>

        {/* Register button */}
        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={handleRegister}
        >
          Register
        </button>

        {/* Switch to login */}
        <div className="text-center mt-3">
          <span>Already have an account?</span>{" "}
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
