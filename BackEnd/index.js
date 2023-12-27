const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const moviesRoutes = require("./routes/moviesRoutes");
const theatersRoutes = require("./routes/theatersRoutes");
const usersRoutes = require("./routes/usersRoutes");
const cors = require("cors");

const app = express();
const port = 3002;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Configure CORS options (adjust the options as needed)
const corsOptions = {
  origin: "*", // Allow requests from all origins (not recommended for production)
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow specified HTTP methods
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Use the cors middleware with the configured options
app.use(cors(corsOptions));

// Routes for Movies, Theaters, and Users
app.use("/", moviesRoutes);
app.use("/", theatersRoutes);
app.use("/", usersRoutes); // Use user routes

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
