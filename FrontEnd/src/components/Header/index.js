import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineCloseCircle } from "react-icons/ai";

import "./styles.scss";
import MovieContext from "../../Contexts/MovieContext";
import Cookies from "js-cookie";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isMenuOpen, setMenuStatus] = useState(false);
  const [isUserLogedIn, setisUserLogedIn] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [movieSearchResults, setMovieSearchResults] = useState([]);
  const navigate = useNavigate();
  const { movies, changeState } = useContext(MovieContext);
  const isAdmin = isUserLogedIn && movies.userData.userType === "Admin";
  console.log(movies.userData.userType);

  const updateContextState = () => {
    changeState({
      ...movies,
      SignInModal: true,
    });
    if (Cookies.get("Token") !== "undefied") {
      setisUserLogedIn(true);
    }
  };

  const onLogOut = () => {
    Cookies.remove("Token");
    setisUserLogedIn(false);
  };

  const navigationHandler = (type) => {
    let path = "";

    switch (type) {
      case "home":
        path = "/home";
        break;
      case "movie":
        path = "/booking";
        break;
      case "TV":
        path = "/explore";
        break;
      default:
        path = "/account";
        break;
    }

    navigate(path);
    setMobileMenu(false);
  };

  const MenuBar = () => {
    return (
      <div className="menu-container">
        <h2>Hey</h2>
        <ul>
          <li>Login & Rgister</li>
          <li>Notifications</li>
          <li>Your Orders</li>
          <li>View all your bookings</li>
          <li>View commonly asked queries</li>
          <li>Permissions & More Rewards</li>
          <li> rewards</li>
          <li> Help & Support </li>
          <li>Accounts & Settings </li>
          <li>offers and Chat Location</li>
          <li>Payments</li>
          <li>BookASmile</li>
        </ul>
      </div>
    );
  };

  const getMovieDetails = (movieName) => {
    axios
      .get(`http://localhost:3002/allmovies`)
      .then((response) => {
        const matchedMovies = response.data.filter((movie) =>
          movie.MovieName.includes(movieName)
        );

        if (matchedMovies.length > 0) {
          setMovieSearchResults(matchedMovies);
        } else {
          setMovieSearchResults([]);
        }
      })
      .catch((error) => {
        console.error("Fetching Error:", error);
        // Handle the error more gracefully, show an error message to the user, etc.
      });
  };

  const getMoviesData = (e) => {
    const movieName = e.target.value;
    setSearchText(movieName);
    if (movieName.length > 0) {
      getMovieDetails(movieName);
    } else {
      setMovieSearchResults([]);
    }
  };

  return (
    <header className="navbar">
      <h1 className="logo" onClick={() => navigate("/")}>
        ReelBook
      </h1>
      <div>
        <input
          type="search"
          className="input"
          placeholder="Search for movies"
          onChange={getMoviesData}
        />
        {searchText.length > 0 && (
          <ul className="movie-search-results-container">
            {movieSearchResults.length > 0 ? (
              movieSearchResults.map((eachMovie) => (
                <li style={{ listStyle: "none" }} key={eachMovie._id}>
                  <Link to={`/movie/${eachMovie._id}`}>
                    {eachMovie.MovieName}
                  </Link>
                </li>
              ))
            ) : (
              <p>Movies Not Found</p>
            )}
          </ul>
        )}
      </div>
      <ul className="menuItems">
        <li className="menuItem">
          <select defaultValue={"Hyderabad"}>
            <option value={"Hyderabad"}>Hyderabad</option>
            <option value={"Visakhapatnam"}>Visakhapatnam</option>
            <option value={"Mumbai"}>Mumbai</option>
            <option value={"Chennai"}>Chennai</option>
            <option value={"Banglore"}>Banglore</option>
            <option value={"Hyderabad"}>New Delhi</option>
            <option value={"Hyderabad"}>Pune</option>
          </select>
        </li>
        <li className="menuItem">
          {isAdmin ? (
            <Link to={"/dashboard"}>
              <button>Dashboard</button>
            </Link>
          ) : (
            ""
          )}
        </li>
        <li className="menuItem">
          {isUserLogedIn ? (
            <button onClick={onLogOut}>LogOut</button>
          ) : (
            <button onClick={updateContextState}>SignIn</button>
          )}
        </li>

        {mobileMenu ? (
          <li className="menuItem" onClick={() => navigationHandler("account")}>
            Account
          </li>
        ) : (
          ""
        )}
        {isMenuOpen ? MenuBar() : ""}
        <li className="menuItem">
          <>
            {isMenuOpen ? (
              <li className="menuIcon">
                <AiOutlineCloseCircle
                  onClick={() => setMenuStatus(false)}
                  style={{ fontSize: "25px" }}
                  className="close-icon"
                />
              </li>
            ) : (
              <li className="menuIcon">
                <GiHamburgerMenu
                  onClick={() => setMenuStatus(true)}
                  style={{ fontSize: "25px" }}
                />
              </li>
            )}
          </>
        </li>
      </ul>
    </header>
  );
};

export default Header;
