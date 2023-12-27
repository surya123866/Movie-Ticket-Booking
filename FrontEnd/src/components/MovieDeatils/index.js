import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import "./styles.scss";
import Header from "../Header";
import Footer from "../Footer";
import Slick from "./Slick";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncSelected,
  getSelectedMovie,
  removeSelectedMovie,
} from "../../features/moviesSlice";
import { getAllTheaters } from "../../features/theatersSlice";

const MovieDetails = () => {
  const selectedMovie = useSelector(getSelectedMovie);
  const theatersNames = useSelector(getAllTheaters);
  console.log(theatersNames)
  const dispatch = useDispatch();
  const { movieId } = useParams();

  useEffect(() => {
    dispatch(fetchAsyncSelected(movieId));
  }, [dispatch]);

  // const handleClearSelection = () => {
  //   dispatch(removeSelectedMovie());
  // };

  return (
    <>
      <Header />
      <div className="movie-details-page">
        <div className="theaters-section">
          <div className="theaters-section-image">
            <h2>{selectedMovie.MovieName}</h2>
            <img
              src={selectedMovie.ImageUrl}
              alt={selectedMovie.MovieName}
              className="movie-image"
            />
          </div>
          <ul>
            <h2>Theaters Showing {selectedMovie.MovieName}</h2>
            <h1>{theatersNames || <Skeleton count={5} />}</h1>
            {theatersNames.map((theaterName, index) => (
              <li key={index} style={{ listStyle: "none" }}>
                <Link
                  to={`/booking/${selectedMovie.MovieName}/${theaterName}`}
                  style={{ textDecoration: "none" }}
                >
                  {theaterName || <Skeleton count={5} />}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="slick-container">
          <Slick />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MovieDetails;
