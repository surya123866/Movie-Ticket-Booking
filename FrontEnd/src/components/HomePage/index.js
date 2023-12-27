import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import {
  fetchAsyncMovies,
  getAllMovies,
  isLoadingMovies,
} from "../../features/moviesSlice";

import "./styles.scss";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import Herobanner from "./heroBanner";

const HomePage = () => {
  const dispatch = useDispatch();
  const moviesData = useSelector(getAllMovies);

  useEffect(() => {
    dispatch(fetchAsyncMovies());
  }, []);

  const skItem = () => {
    return <div className="skeletonItem" />;
  };
  //console.log(moviesData);
  return (
    <>
      <Header />
      <div className="movies-page">
        <Herobanner />
        {isLoadingMovies ? (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        ) : (
          <ul className="movies-container">
            {moviesData.map((eachMovie) => (
              <li key={eachMovie._id}>
                <Link
                  to={`/movie/${eachMovie._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="movie-thumnail-conatainer">
                    <img
                      className="movie-banner"
                      src={eachMovie.ImageUrl || <Skeleton />}
                      alt={eachMovie.MovieName}
                    />
                    <div className="movie-details-container">
                      <p>{eachMovie.MovieName || <Skeleton />}</p>
                      <p>{eachMovie.ReleasedDate || <Skeleton />}</p>
                      <p>{eachMovie.Genre || <Skeleton />}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
