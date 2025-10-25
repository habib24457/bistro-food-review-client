import { Link } from "react-router-dom";
import React from "react";
import "./NavigationBar.css";

const NavigationBar = () => {
  return (
    <div className="nav-bar">
      <Link className="nav-button" to="/">
        Home
      </Link>
      <Link className="nav-button" to="/top-meals">
        Top-Meals
      </Link>
      <h2 className="nav-text">Bistro Food Review</h2>
    </div>
  );
};

export default NavigationBar;
