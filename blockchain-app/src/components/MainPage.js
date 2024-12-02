
import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const MainPage = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  // Handler for Upload button
  const handleUpload = () => {
    if (isLoggedIn) {
      navigate("/upload");
    } else {
      navigate("/login");
    }
  };

  // Handler for Verification button
  const handleVerification = () => {
    navigate("/verification");
  };

  return (
    <div>
      <section
        className="text-center text-white py-5"
        style={{
          backgroundImage: "url('/images/1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        ></div>
        <div
          className="container h-100 d-flex flex-column justify-content-center align-items-center"
          style={{ zIndex: 2, position: "relative" }}
        >
          <h1 className="display-3 fw-bold">Welcome to Our Platform</h1>
          <p className="lead mt-3">
            Experience the most secure and reliable blockchain solutions.
          </p>
          <div className="mt-4">
            {/* Upload Button */}
            <button
              className="btn btn-primary btn-lg mx-2"
              onClick={handleUpload}
            >
              Upload
            </button>
            {/* Verification Button */}
            <button
              className="btn btn-outline-light btn-lg mx-2"
              onClick={handleVerification}
            >
              Verification
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
