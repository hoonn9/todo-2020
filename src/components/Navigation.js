import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="nav">
      <div className="nav_tab">
        <Link to="/">Home</Link>
      </div>
      <div className="nav_tab">
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
export default Navigation;
