import React, { useState, useEffect } from "react";
import axios from "axios";

import "./styles.scss";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [showAddMovieForm, setShowAddMovieForm] = useState(false);
  const [newMovie, setNewMovie] = useState({
    MovieName: "",
    ReleasedDate: "",
    Language: "",
    Genre: "",
    Duration: "",
    CBFC: "",
    ImageUrl: "",
  });

  useEffect(() => {
    // Fetch movies from API http://localhost:3000/movies
    axios
      .get("http://localhost:3002/allmovies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  const handleAddMovie = () => {
    setShowAddMovieForm(!showAddMovieForm); // Toggle the form visibility
  };

  const handleCancelAddMovie = () => {
    setShowAddMovieForm(false);
  };

  const handleAddMovieSubmit = () => {
    if (newMovie.MovieName.trim() === "") {
      // Movie name is empty, do not add the movie
      alert("Movie name is required.");
      return;
    }

    // Send a POST request to add a new movie
    axios
      .post("http://localhost:3002/addmovie", newMovie)
      .then((response) => {
        // Refresh the movie list after adding a new movie
        axios
          .get("http://localhost:3002/allmovies")
          .then((response) => {
            setMovies(response.data);
          })
          .catch((error) => {
            console.error("Error fetching movies:", error);
          });
        setShowAddMovieForm(false);
        setNewMovie({
          MovieName: "",
          ReleasedDate: "",
          Language: "",
          Genre: "",
          Duration: "",
          CBFC: "",
          ImageUrl: "",
        });
      })
      .catch((error) => {
        console.error("Error adding a new movie:", error);
      });
  };

  const handleDeleteMovie = (movieID) => {
    // Send a DELETE request to remove a movie based on its MovieID
    axios
      .delete(`http://localhost:3002/movie/${movieID}`)
      .then(() => {
        // Refresh the movie list after deleting the movie
        axios
          .get("http://localhost:3002/allmovies")
          .then((response) => {
            setMovies(response.data);
          })
          .catch((error) => {
            console.error("Error fetching movies:", error);
          });
      })
      .catch((error) => {
        console.error("Error deleting the movie:", error);
      });
  };

  return (
    <div className="movie-dashboard-container">
      {showAddMovieForm && (
        <div className="input-container">
          {error || <p>{error}</p>}
          <input
            type="text"
            placeholder="Movie Name"
            value={newMovie.MovieName}
            onChange={(e) =>
              setNewMovie({ ...newMovie, MovieName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Release Date"
            value={newMovie.ReleasedDate}
            onChange={(e) =>
              setNewMovie({ ...newMovie, ReleasedDate: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Language"
            value={newMovie.Language}
            onChange={(e) =>
              setNewMovie({ ...newMovie, Language: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Genre"
            value={newMovie.Genre}
            onChange={(e) =>
              setNewMovie({ ...newMovie, Genre: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Duration"
            value={newMovie.Duration}
            onChange={(e) =>
              setNewMovie({ ...newMovie, Duration: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="CBFC"
            value={newMovie.CBFC}
            onChange={(e) => setNewMovie({ ...newMovie, CBFC: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newMovie.ImageUrl}
            onChange={(e) =>
              setNewMovie({ ...newMovie, ImageUrl: e.target.value })
            }
          />
          <div c>
            <div>
              <button onClick={handleAddMovieSubmit}>Add</button>
            </div>
            <div>
              <button onClick={handleCancelAddMovie}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {!showAddMovieForm && <button onClick={handleAddMovie}>Add Movie</button>}

      <table>
        <thead>
          <tr>
            <th>Sl</th>
            <th>Movie Name</th>
            <th>Release Date</th>
            <th>Genre</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, index) => (
            <tr key={movie._id}>
              <td>{index + 1}</td>
              <td>{movie.MovieName || ""}</td>
              <td>{movie.ReleasedDate || ""}</td>
              <td>{movie.Genre || "  "}</td>
              <td>
                {<img src={`${movie.ImageUrl}`} alt={movie.MovieName} /> ||
                  "   "}
              </td>
              <td>
                <button onClick={() => handleDeleteMovie(movie._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Movie;
