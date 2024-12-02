import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success or error
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      // If login is successful
      if (response.status === 200) {
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        navigate("/account-overview");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.detail || "Login failed. Please try again."
      );
      setMessageType("error");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h3 className="text-center mb-4">Log In</h3>

        {message && (
          <div className={`alert ${messageType === "error" ? "alert-danger" : "alert-success"}`}>
            {message}
          </div>
        )}

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

        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={handleLogin}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
