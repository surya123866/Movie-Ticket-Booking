import React, { useContext, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import Cookies from "js-cookie";

import "./styles.scss";
import MovieContext from "../../Contexts/MovieContext";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "20px",
    transform: "translate(-50%, -50%)",
    borderRadious: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
};

const SignInModal = ({ isOpen, onRequestClose }) => {
  const { movies, changeState } = useContext(MovieContext);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    userType: "user",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [apiError, setApiError] = useState(null);

  const [signUpMode, setSignUpMode] = useState(false); // Track sign-up mode

  const handleSignUp = () => {
    // Clear previous errors
    setErrors({
      email: "",
      password: "",
    });

    if (!userData.email || !userData.password) {
      if (!userData.email) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email is required.",
        }));
      }
      if (!userData.password) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Password is required.",
        }));
      }
      return;
    }

    axios
      .post("http://localhost:3002/user/signup", userData)
      .then((response) => {
        // Handle the response from the API, such as setting user authentication status, etc.
        alert("Account Created Successfully");
        setSignUpMode(true);
      })
      .catch((error) => {
        // Handle API errors
        alert(`${error.response.data.error}`);
        setApiError(`${error.response.data.error}`);
      });

    // Reset the userData state to empty values
    setUserData({
      email: "",
      password: "",
      userType: "user",
    });
  };

  const handleSignIn = () => {
    // Clear previous errors
    setErrors({
      email: "",
      password: "",
    });

    if (!userData.email || !userData.password) {
      if (!userData.email) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email is required.",
        }));
      }
      if (!userData.password) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Password is required.",
        }));
      }
      return;
    }

    axios
      .post("http://localhost:3002/user/signin", userData)
      .then((response) => {
        Cookies.set("Token", response.data.token, { expires: 2 });
        changeState({
          ...movies,
          SignInModal: false,
          userData,
        });
      })
      .catch((error) => {
        // Handle API errors
        alert(`${error.response.data.error}`);
        setApiError(`${error.response.data.error}`);
      });

    // Reset the userData state to empty values
    setUserData({
      email: "",
      password: "",
      userType: "user",
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Sign In Modal"
    >
      <h2>{signUpMode ? "Sign Up" : "Sign In"}</h2>
      <form className="form-container">
        <label>Email</label>
        <input
          type="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        {errors.email && <div className="error">{errors.email}</div>}

        <label>Password</label>
        <input
          type="password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        {errors.password && <div className="error">{errors.password}</div>}

        {signUpMode && (
          <div>
            <label>User Type</label>
            <select
              value={userData.userType}
              onChange={(e) =>
                setUserData({ ...userData, userType: e.target.value })
              }
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}

        {apiError && <div className="error">{apiError}</div>}

        <div>
          <button
            type="button"
            onClick={signUpMode ? handleSignUp : handleSignIn}
          >
            {signUpMode ? "Sign Up" : "Sign In"}
          </button>
          <p>
            {signUpMode
              ? "Already have an account? "
              : "Don't have an account? "}
            <span onClick={() => setSignUpMode(!signUpMode)}>
              {signUpMode ? "Sign In" : "Sign Up"}
            </span>
          </p>
        </div>
      </form>
    </Modal>
  );
};

export default SignInModal;
