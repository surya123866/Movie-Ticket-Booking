// routes/moviesRoutes.js
const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController");

router.get("/allmovies", moviesController.getAllMovies);
router.get("/movies/:id", moviesController.getMovieById);
router.post("/addmovie", moviesController.addMovie);
router.delete("/movie/:id", moviesController.removeMovie);

module.exports = router;
