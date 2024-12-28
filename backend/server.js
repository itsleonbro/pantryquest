const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserModel = require("./models/UserModel");

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
    console.log("Hashed Password: ", hashedPassword); // This will log the hashed password

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
    res.status(500).json({ message: "Server error" });
  }
});

//listen
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server running on port ${port}`));
