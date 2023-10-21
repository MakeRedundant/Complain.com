import React from "react";
import "./navbar.css";

import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const currentPage = useLocation().pathname;
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#home" data-text="Home">
          <i className="far fa fa-home"></i>
          Home
        </a>
        <Link to="/profile" data-text="Profile">
          <i className="far fa-user"></i>
          Profile
        </Link>
        <a href="#skills" data-text="Skills">
          <i className="far fa-file-code"></i>
          Skills
        </a>
        <a href="#project" data-text="Project">
          <i className="far fa-folder-open"></i>
          Project
        </a>
        <a href="#contact" data-text="Contact">
          <i className="far fa fa-phone"></i>
          Contact
        </a>
        {/* Link for "Terms and Conditions" */}
        <Link to="/terms" className={currentPage === "/terms" ? "nav-link active" : "nav-link"}>
          <i className="far fa fa-book"></i>
          T&Cs
        </Link>
        {/* Link for "Donate" */}
        <Link to="/donate" className={currentPage === "/donate" ? "nav-link active" : "nav-link"}>
          <i className="far fa-heart"></i>
          Donate
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;