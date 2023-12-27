import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Link } from "react-router-dom";

import "./styles.scss";

const Corousel = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3002/allmovies");
        setMoviesData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(true);
      }
    };

    getMovies();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    centerMode: false,
    centerPadding: "90px",
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    className: "center",

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const skItem = () => {
    return <div className="skeletonItem"></div>;
  };

  return (
    <div className="slick-container">
      <h2>More you may like</h2>
      <Slider {...settings}>
        {!loading
          ? moviesData.map((eachMovie) => (
              <li key={eachMovie._id}>
                <Link
                  to={`/movie/${eachMovie._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="movie-thumnail-conatainer">
                    <img
                      className="movie-banner"
                      src={eachMovie.ImageUrl}
                      alt={eachMovie.MovieName}
                    />
                    <div className="movie-details-container">
                      <p>{eachMovie.MovieName}</p>
                      <p>{eachMovie.ReleasedDate}</p>
                      <p>{eachMovie.Genre}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))
          : Array(8)
              .fill(0)
              .map((each, i) => <li key={i}> {skItem()}</li>)}
      </Slider>
    </div>
  );
};

export default Corousel;
