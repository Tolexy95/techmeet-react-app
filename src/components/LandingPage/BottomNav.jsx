import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const BottomNav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top">
      <div className="container">
        <a className="navbar-brand" href="#">
          Techmeet<span className="dot">.</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {/* collapse */}
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#services">
                Services
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#team">
                Team
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#reviews">
                Reviews
              </a>
            </li>
            <li className="nav-item">
              <Link to= "/signIn" className="nav-link">Sign In</Link>
            </li>
          </ul>
          <Link to="/signUp" className="btn btn-brand ms-lg-3">Sign up</Link>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
