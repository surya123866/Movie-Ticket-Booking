const { ObjectId } = require("mongodb"); // Import ObjectId from the MongoDB client

// Import the connectToDatabase function to establish a database connection
// Replace with the actual file path
const { connectToDatabase } = require("../database");

// Controller logic for movies
const getAllMovies = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("moviesdb");

    const movies = await collection.find({}).toArray();
    res.json(movies);
  } catch (error) {
    console.error("Error retrieving movies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMovieById = async (req, res) => {
  const movieId = req.params.id;

  try {
    const db = await connectToDatabase();
    const collection = db.collection("moviesdb"); // Replace with your actual collection name

    const movie = await collection.findOne({
      _id: new ObjectId(movieId),
    });

    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    console.error("Error retrieving a movie:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addMovie = async (req, res) => {
  const newMovie = req.body;

  try {
    const db = await connectToDatabase();
    const collection = db.collection("moviesdb");

    // Check if a movie with the same MovieName already exists
    const existingMovie = await collection.findOne({
      MovieName: newMovie.MovieName,
    });

    if (existingMovie) {
      // Movie with the same MovieName already exists, respond with an error
      res
        .status(400)
        .json({ error: "Movie with the same name already exists" });
    } else {
      // Movie with the same MovieName doesn't exist, proceed to insert
      const result = await collection.insertOne(newMovie);
      res.status(201).json(result);
    }
  } catch (error) {
    console.error("Error adding a movie:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const removeMovie = async (req, res) => {
  const movieId = req.params.id;
  console.log(movieId);

  try {
    const db = await connectToDatabase();
    const collection = db.collection("moviesdb"); // Replace with your actual collection name

    const result = await collection.deleteOne({ _id: new ObjectId(movieId) });
    if (result.deletedCount === 1) {
      res.json({ message: "Movie removed" });
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    console.error("Error removing a movie:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  removeMovie,
};
