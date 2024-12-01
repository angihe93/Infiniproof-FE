import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome for icons

const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [message, setMessage] = useState(""); // To display success or error messages
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match. Please try again!");
      setMessageType("error"); // Set message type to "error"
      return;
    }
    try {
      await axios.post("http://127.0.0.1:8000/api/register", {
        email,
        password,
      });
      setMessage("Registration successful! Please log in.");
      setMessageType("success"); // Set message type to "success"
    } catch (error) {
      setMessage(
        error.response?.data?.detail || "Registration failed. Please check your input."
      );
      setMessageType("error"); // Set message type to "error"
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h3 className="text-center mb-4">Create Account</h3>

        {/* Displaying message inside a red or blue alert box based on the message type */}
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
            onClick={() => alert("Redirect to login page")}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;




