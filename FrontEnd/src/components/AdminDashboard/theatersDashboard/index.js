import React, { useState, useEffect } from "react";
import axios from "axios";

import "./styles.scss";

const Theaters = () => {
  const [theaters, setTheaters] = useState([]);
  const [showAddMovieForm, setShowAddMovieForm] = useState(false);
  const [newTheater, setNewTheater] = useState({
    name: "",
    moviesPlaying: [],
  });
  const [selectedTheater, setSelectedTheater] = useState(null); // To store the selected theater data

  useEffect(() => {
    // Fetch theaters from API http://localhost:3002/alltheaters
    axios
      .get("http://localhost:3002/alltheaters")
      .then((response) => {
        setTheaters(response.data);
      })
      .catch((error) => {
        console.error("Error fetching theaters:", error);
      });
  }, []);

  const handleAddMovie = () => {
    setShowAddMovieForm(!showAddMovieForm); // Toggle the form visibility
  };

  const handleCancelAddMovie = () => {
    setShowAddMovieForm(false);
    setSelectedTheater(null); // Reset the selected theater data
    setNewTheater({
      name: "",
      moviesPlaying: [],
    });
  };

  const handleAddMovieSubmit = () => {
    if (newTheater.name.trim() === "") {
      // Theater name is empty, do not add the theater
      alert("Theater name is required.");
      return;
    }

    if (selectedTheater) {
      // If a theater is selected, update its data
      axios
        .put(
          `http://localhost:3002/updatetheater/${selectedTheater._id}`,
          newTheater
        )
        .then((response) => {
          // Refresh the theater list after updating the theater
          axios
            .get("http://localhost:3002/alltheaters")
            .then((response) => {
              setTheaters(response.data);
            })
            .catch((error) => {
              console.error("Error fetching theaters:", error);
            });
          setShowAddMovieForm(false);
          setSelectedTheater(null);
          setNewTheater({
            name: "",
            moviesPlaying: [],
          });
        })
        .catch((error) => {
          console.error("Error updating the theater:", error);
        });
    } else {
      // Send a POST request to add a new theater
      axios
        .post("http://localhost:3002/addtheater", newTheater)
        .then((response) => {
          // Refresh the theater list after adding a new theater
          axios
            .get("http://localhost:3002/alltheaters")
            .then((response) => {
              setTheaters(response.data);
            })
            .catch((error) => {
              console.error("Error fetching theaters:", error);
            });
          setShowAddMovieForm(false);
        })
        .catch((error) => {
          console.error("Error adding a new theater:", error);
        });
    }
  };

  const handleDeleteTheater = (theaterId) => {
    // Send a DELETE request to remove a theater based on its ID
    axios
      .delete(`http://localhost:3002/removetheater/${theaterId}`)
      .then(() => {
        // Refresh the theater list after deleting the theater
        axios
          .get("http://localhost:3002/alltheaters")
          .then((response) => {
            setTheaters(response.data);
          })
          .catch((error) => {
            console.error("Error fetching theaters:", error);
          });
      })
      .catch((error) => {
        console.error("Error deleting the theater:", error);
      });
  };

  const handleRowClick = (theater, columnIndex) => {
    if (columnIndex === 1 || columnIndex === 2) {
      setNewTheater({
        name: theater.name,
        moviesPlaying: [...theater.moviesPlaying],
      });
      setSelectedTheater(theater);
      setShowAddMovieForm(true);
    }
  };

  return (
    <div className="movie-dashboard-container">
      {showAddMovieForm && (
        <div className="input-container">
          <input
            type="text"
            placeholder="Theater Name"
            value={newTheater.name}
            onChange={(e) =>
              setNewTheater({ ...newTheater, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Add Movies (comma-separated)"
            value={newTheater.moviesPlaying.join(",")}
            onChange={(e) => {
              const movies = e.target.value.split(",");
              setNewTheater({ ...newTheater, moviesPlaying: movies });
            }}
          />
          <div className="buttons-container">
            <div>
              <button onClick={handleAddMovieSubmit}>
                {selectedTheater ? "Update" : "Add"}
              </button>
            </div>
            <div>
              <button onClick={handleCancelAddMovie}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {!showAddMovieForm && (
        <button onClick={handleAddMovie}>Add Theater</button>
      )}

      <table>
        <thead>
          <tr>
            <th>Sl</th>
            <th>Theater Name</th>
            <th>Movies Playing</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {theaters.map((theater, index) => (
            <tr key={theater._id} onClick={() => handleRowClick(theater)}>
              <td>{index + 1}</td>
              <td onClick={() => handleRowClick(theater, 1)}>
                {theater.name || ""}
              </td>
              <td onClick={() => handleRowClick(theater, 2)}>
                {theater.moviesPlaying.join(", ") || " "}
              </td>
              <td>
                <button onClick={() => handleDeleteTheater(theater._id)}>
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

export default Theaters;
