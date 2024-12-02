
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/transactions/${email}`, {
        params: { username: email, password },
      });
  
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("password", password);
  
      setIsLoggedIn(true);
      setMessage("Login successful! Redirecting...");
      setMessageType("success");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      const errorMsg = error.response?.data?.detail || "Login failed. Please try again.";
      setMessage(typeof errorMsg === "string" ? errorMsg : JSON.stringify(errorMsg));
      setMessageType("error");
    }
  };
  
  
  
  

  return (
    <div className="container mt-5">
      <div className="card shadow p-4" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h3 className="text-center mb-4">Log In</h3>

        {/* Display success or error messages */}
        {message && (
          <div className={`alert ${messageType === "error" ? "alert-danger" : "alert-success"}`}>
            {message}
          </div>
        )}

        {/* Email input */}
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
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
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login button */}
        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={handleLogin}
        >
          Log In
        </button>

        {/* Switch to Register */}
        <div className="text-center mt-3">
          <span>Don't have an account?</span>{" "}
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
