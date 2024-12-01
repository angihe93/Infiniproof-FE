import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome for icons

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [message, setMessage] = useState(""); // To display success or error messages
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const handleLogin = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      setMessage("Login successful! Redirecting...");
      setMessageType("success");
      // Redirect to dashboard or another page
      // Example: window.location.href = "/dashboard";
    } catch (error) {
      if (error.response?.status === 404) {
        setMessage("Account does not exist.");
      } else if (error.response?.status === 401) {
        setMessage("Incorrect password. Please try again.");
      } else {
        setMessage("An unexpected error occurred. Please try again later.");
      }
      setMessageType("error");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h3 className="text-center mb-4">Log In</h3>

        {/* Displaying message inside a red or green alert box */}
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

        {/* Login button */}
        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={handleLogin}
        >
          Log In
        </button>

        {/* Switch to register */}
        <div className="text-center mt-3">
          <span>Don't have an account?</span>{" "}
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={() => (window.location.href = "/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


