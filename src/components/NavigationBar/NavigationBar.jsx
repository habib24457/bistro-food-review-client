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
        Top Meals
      </Link>
    </div>
  );
};

export default NavigationBar;
