const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const { connectToDatabase } = require("../database");
const bcrypt = require("bcrypt");

// Secret key for JWT token
const jwtSecret = "3&^r!2XkG@p$L#9o*QaS@W%zN*Yt6ZpB"; // Replace with your actual secret key
const tokenExpiration = "1d"; // Token expires in 1 day

// Controller logic for user sign-up
const signup = async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    // Implement logic to save user details to the database
    // Hash the password before storing it in the database for security
    const db = await connectToDatabase();
    const usersCollection = db.collection("users");

    // Check if the user with the same email already exists
    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user data, including userType
    const newUser = {
      email,
      password: hashedPassword,
      userType,
    };

    const result = await usersCollection.insertOne(newUser);

    if (result.acknowledged) {
      res.json({ error: "user Created successfully" });
    } else {
      res.status(500).json({ error: "User registration failed" });
    }
  } catch (error) {
    console.error("Sign-up error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller logic for user sign-in
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Implement logic to check if the user is available in the database
    // Compare the hashed password with the stored hashed password
    const db = await connectToDatabase();
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Compare the password with the hashed password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // If the user is found and the password is correct, auto-generate a JWT token
    const token = jwt.sign({ email, userType: user.userType }, jwtSecret, {
      expiresIn: tokenExpiration,
    });

    // Customize the response based on user type
    if (user.userType === "admin") {
      res.json({ token, userType: "admin" });
    } else {
      res.json({ token, userType: "user" });
    }
  } catch (error) {
    console.error("Sign-in error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection("users");

    const allUsers = await usersCollection.find({}).toArray();

    if (allUsers.length > 0) {
      // Users found, send the user data as a response
      res.status(200).json(allUsers);
    } else {
      // No users found
      res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    // Handle errors, e.g., log the error and send an error response
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection("users");

    const userId = req.params.id;

    const result = await usersCollection.deleteOne({
      _id: new ObjectId(userId),
    });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signup,
  signin,
  getUsers,
  deleteUser,
};
