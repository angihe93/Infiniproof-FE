import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const MainPage = () => {
  return (
    <div>
      {/* Hero Section */}
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
        <div className="container h-100 d-flex flex-column justify-content-center align-items-center" style={{ zIndex: 2, position: "relative" }}>
          <h1 className="display-3 fw-bold">Welcome to Our Platform</h1>
          <p className="lead mt-3">
            Experience the most secure and reliable xxxxx solutions
          </p>
          <div className="mt-4">
            <a href="/upload" className="btn btn-primary btn-lg mx-2">
              Get Started
            </a>
            <a href="/login" className="btn btn-outline-light btn-lg mx-2">
              Log In
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Our Features</h2>
          <div className="row">
            <div className="col-md-4 text-center">
              <i className="fas fa-lock fa-4x mb-3 text-primary"></i>
              <h4>Secure Transactions</h4>
              <p>State-of-the-art encryption ensures your data is always safe.</p>
            </div>
            <div className="col-md-4 text-center">
              <i className="fas fa-globe fa-4x mb-3 text-success"></i>
              <h4>Global Access</h4>
              <p>Access our platform anywhere in the world, anytime.</p>
            </div>
            <div className="col-md-4 text-center">
              <i className="fas fa-chart-line fa-4x mb-3 text-warning"></i>
              <h4>Real-Time Insights</h4>
              <p>Track and analyze your data with real-time blockchain stats.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4" style={{ fontWeight: "bold", fontSize: "2.5rem" }}>
            About Us
          </h2>
          <p
            className="text-center"
            style={{
              fontSize: "1.25rem",
              lineHeight: "1.8",
              maxWidth: "800px",
              margin: "0 auto",
              color: "#555",
            }}
          >
            We are a cutting-edge platform that leverages blockchain technology to
            provide secure, efficient, and transparent solutions. Our mission is to
            empower individuals and businesses with tools that ensure their data is
            protected and their operations are streamlined. Join us to be part of
            the revolution in secure technology.
          </p>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="text-center text-white bg-primary py-5">
        <div className="container">
          <h2 className="display-4">Join Us Today</h2>
          <p className="lead">
            Be part of the future. Register now and experience the difference.
          </p>
          <a href="/register" className="btn btn-light btn-lg">
            Register Now
          </a>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <p>&copy; 2024 Our Platform. All rights reserved.</p>
          <div className="mt-3">
            <a href="https://facebook.com" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a href="https://twitter.com" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a href="https://linkedin.com" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin fa-lg"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
