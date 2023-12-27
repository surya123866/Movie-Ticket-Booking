const { ObjectId } = require("mongodb"); // Import ObjectId from the MongoDB client

// Import the connectToDatabase function to establish a database connection
// Replace with the actual file path
const { connectToDatabase } = require("../database");

// Controller logic for theaters
const getAllTheaters = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("theatersdb");

    const allTheaters = await collection.find({}).toArray();

    if (allTheaters.length > 0) {
      const theaterNames = allTheaters.map((theater) => theater.name);
      res.json(allTheaters);
    } else {
      res.status(404).json({
        error: "No theaters found",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving theaters" });
  }
};

const getAllTheatersNames = async (req, res) => {
  const requestedMovieName = req.params.movieName; // Assuming you pass the movieName as a parameter

  try {
    const db = await connectToDatabase();
    const collection = db.collection("theatersdb");

    const theaters = await collection
      .find({ moviesPlaying: requestedMovieName })
      .toArray();

    if (theaters.length > 0) {
      const theaterNames = theaters.map((theater) => theater.name); // Extract only theater names
      res.json(theaterNames);
    } else {
      res.status(404).json({
        error: "No theaters are currently playing the requested movie",
      });
    }
  } catch (error) {
    console.error("Error retrieving theaters:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addTheater = async (req, res) => {
  const newTheater = req.body;

  try {
    const db = await connectToDatabase();
    const collection = db.collection("theatersdb"); // Replace with your actual collection name

    // Check if a theater with the same name already exists
    const existingTheater = await collection.findOne({
      name: newTheater.name,
    });

    if (existingTheater) {
      // Theater with the same name already exists, respond with an error
      res
        .status(400)
        .json({ error: "Theater with the same name already exists" });
    } else {
      // Theater with the same name doesn't exist, proceed to insert
      const result = await collection.insertOne(newTheater);
      res.status(201).json({ error: "Theater added successfully" });
    }
  } catch (error) {
    console.error("Error adding a theater:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const removeTheater = async (req, res) => {
  const theaterId = req.params.id;

  try {
    const db = await connectToDatabase();
    const collection = db.collection("theatersdb"); // Replace with your actual collection name

    const result = await collection.deleteOne({ _id: new ObjectId(theaterId) });
    if (result.deletedCount === 1) {
      res.json({ message: "Theater removed" });
    } else {
      res.status(404).json({ error: "Theater does not found" });
    }
  } catch (error) {
    console.error("Error removing a theater:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const removeMovieFromTheater = async (req, res) => {
  const theaterId = req.params.id;
  const movieName = req.params.movieName;

  try {
    const db = await connectToDatabase();
    const collection = db.collection("theatersdb"); // Replace with your actual collection name

    const result = await collection.updateOne(
      { _id: new ObjectId(theaterId) },
      { $pull: { moviesPlaying: movieName } }
    );

    if (result.modifiedCount === 1) {
      res.json({ message: "Movie removed from the theater" });
    } else {
      res
        .status(404)
        .json({ error: "Theater not found or movie not in moviesPlaying" });
    }
  } catch (error) {
    console.error("Error removing a movie from the theater:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const addMovieToTheater = async (req, res) => {
  const theaterId = req.params.id;
  const movieName = req.params.movieName;

  try {
    const db = await connectToDatabase();
    const collection = db.collection("theatersdb");

    // Find the theater by its _id
    const theater = await collection.findOne({ _id: new ObjectId(theaterId) });

    if (!theater) {
      res.status(404).json({ error: "Theater not found" });
      return;
    }

    // Check if the movie is already in the moviesPlaying array
    if (theater.moviesPlaying.includes(movieName)) {
      res.status(400).json({ error: "Movie already exists in this theater" });
    } else {
      // Add the movie to the moviesPlaying array
      const result = await collection.updateOne(
        { _id: new ObjectId(theaterId) },
        { $push: { moviesPlaying: movieName } }
      );

      res.status(201).json({ error: "Movie added successfully" });
    }
  } catch (error) {
    console.error("Error adding a movie to the theater:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const updateMovieToTheater = async (req, res) => {
  const theaterId = req.params.id;
  const newTheaterData = req.body;
  try {
    const db = await connectToDatabase();
    const collection = db.collection("theatersdb");
    const theater = await collection.findOne({ _id: new ObjectId(theaterId) });

    if (!theater) {
      res.status(404).json({ error: "Theater not found" });
      return;
    }
    // Add the movie to the moviesPlaying array
    const result = await collection.updateOne(
      { _id: new ObjectId(theaterId) },
      { $set: newTheaterData }
    );

    res.status(201).json({ error: "Theaters data updated successfully" });
  } catch (error) {
    console.error("Error updating theater:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  updateMovieToTheater,
  getAllTheaters,
  getAllTheatersNames,
  addTheater,
  removeTheater,
  removeMovieFromTheater,
  addMovieToTheater,
};
