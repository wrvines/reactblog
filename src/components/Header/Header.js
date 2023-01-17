import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { FaHome } from "react-icons/fa";
import { auth } from "../../config/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

function Header() {
  //create array with topics
  const categories = ["Health", "Food", "Travel", "Technology"];
  let navigate = useNavigate();

  const [user] = useAuthState(auth);
  // console.log("user data", user);

  return (
    <div className="header-container ">
      <FaHome onClick={() => navigate("/")} />
      <div className="categories-container">
        {categories.map((item, index) => (
          <Link to={`/category/${item}`} className="nav-link" key={index}>
            {item}
          </Link>
        ))}
      </div>
      {user ? (
        <div>
          <span className="username">
            {user.displayName ? user.displayName : user.email}
          </span>
          <button className="auth-link" onClick={() => signOut(auth)}>
            Log out
          </button>
        </div>
      ) : (
        <Link to="/auth" className="auth-link">
          Sign Up
        </Link>
      )}
    </div>
  );
}

export default Header;
