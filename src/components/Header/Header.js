import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { FaHome } from "react-icons/fa";

function Header() {
  //create array with topics
  const categories = ["Health", "Food", "Travel", "Technology"];

  return (
    <div className="header-container ">
      <FaHome />
      <div className="categories-container">
        {categories.map((item) => (
          <Link to={`/category/${item}`} className="nav-link">
            {item}
          </Link>
        ))}
      </div>
      <button className="auth-link">Sign Up</button>
    </div>
  );
}

export default Header;
