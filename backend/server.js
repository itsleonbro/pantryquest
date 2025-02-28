const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const recipeRoutes = require("./routes/recipe.routes");
const userRecipeRoutes = require("./routes/recipe.routes");
const publicRecipeRoutes = require("./routes/public.routes");

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

connectDB();

// PUBLIC routes (no auth required)
app.use("/api", publicRecipeRoutes);

// protected routes (require auth)
app.use("/api", authRoutes);
app.use("/api", userRecipeRoutes);
app.use("/api", recipeRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const port = process.env.PORT || 5001;
const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);
