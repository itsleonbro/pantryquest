const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserModel = require("./models/UserModel");

const authenticate = require("./middleware/authenticate");

const app = express();

//middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

//db connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("Error connecting to MongoDB Atlas", err));

//route to sign up
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // create JWT
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ token, message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//route to log in
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Logged in successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//route to fetch user's info
app.get("/api/dashboard", authenticate, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId, "username email");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ username: user.username, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const randomNumber = Math.floor(Math.random() * 1000);

//route to save recipe to favorites
app.post("/api/save-recipe", authenticate, async (req, res) => {
  const {
    title,
    summary,
    readyInMinutes,
    servings,
    ingredients,
    instructions,
  } = req.body;
  const userId = req.userId;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // check if the recipe already exists in the favorites
    if (user.favourites.some(fav => fav.title === title)) {
      return res.status(400).json({ message: "Recipe already in favorites" });
    }

    //add recipe to favorites if not already there
    user.favourites.push({
      title,
      recipeID: randomNumber,
      summary,
      readyInMinutes,
      servings,
      ingredients,
      instructions,
    });
    await user.save(); // save the user with the updated favorites

    res.status(200).json({ message: "Recipe added to favorites" });
  } catch (error) {
    console.error("Error saving recipe:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

//route to get user's favourite recipes
app.get("/api/favourites", authenticate, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId, "favourites");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.favourites); // return the favourites array

    console.log("hello", user.favourites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//listen
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server running on port ${port}`));
