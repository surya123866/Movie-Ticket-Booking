const express = require("express");
const router = express.Router();
const theatersController = require("../controllers/theatersController");

router.get("/alltheaters", theatersController.getAllTheaters);
router.get("/theaters/:movieName", theatersController.getAllTheatersNames);
router.post("/addtheater", theatersController.addTheater);
router.delete("/removetheater/:id", theatersController.removeTheater);
router.delete(
  "/removemovie/:id/:movieName",
  theatersController.removeMovieFromTheater
);
router.post("/addmovie/:id/:movieName", theatersController.addMovieToTheater);
router.put("/updatetheater/:id", theatersController.updateMovieToTheater);

module.exports = router;
