// usersRoutes.js
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// Sign-up route
router.post("/user/signup", usersController.signup);

// Sign-in route
router.post("/user/signin", usersController.signin);

//allUsers data
router.get("/users/allusers", usersController.getUsers);
router.delete("/users/delete/:id", usersController.deleteUser);

module.exports = router;
