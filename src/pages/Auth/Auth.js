import React from "react";
import { auth } from "../../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

function Auth() {
  let navigate = useNavigate();
  const [existingUser, setExistingUser] = React.useState(false);
  //create state for form data
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("signup");
    //connect to firebase auth
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
        //add name as username
        updateProfile(auth.currentUser, {
          displayName: name,
        });
        //navigate to homepage
        navigate("/");
      })
      .catch((err) => {
        alert(err.code);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("login");
    //log in
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        //navigate to homepage
        navigate("/");
      })
      .catch((err) => {
        alert(err.code);
      });
  };

  return (
    <div className="auth-container">
      {existingUser ? (
        <form className="auth-form" onSubmit={handleLogin}>
          <h1>Log in with your email</h1>
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Enter your password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button type="submit">Login</button>
          <p>
            Don't have an account?{" "}
            <span className="form-link" onClick={() => setExistingUser(false)}>
              Sign up
            </span>
          </p>
        </form>
      ) : (
        <form className="auth-form" onSubmit={handleSignup}>
          <h1>Sign up with your email</h1>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter your name"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Enter your password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button type="submit">Register</button>
          <p>
            Already have an account?{" "}
            <span className="form-link" onClick={() => setExistingUser(true)}>
              Sign in
            </span>
          </p>
        </form>
      )}
    </div>
  );
}

export default Auth;
