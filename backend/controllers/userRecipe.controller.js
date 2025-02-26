const UserModel = require("../models/UserModel");
const mongoose = require("mongoose");

const getUserRecipes = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Sort recipes by most recently updated
    const sortedRecipes = [...user.userRecipes].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );

    res.status(200).json(sortedRecipes);
  } catch (error) {
    console.error("Error fetching user recipes:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getRecipeById = async (req, res) => {
  const userId = req.userId;
  const recipeId = req.params.id;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const recipe = user.userRecipes.id(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createRecipe = async (req, res) => {
  const userId = req.userId;
  const { title, ingredients, instructions, cookingTime, servings } = req.body;

  if (!title || !instructions) {
    return res
      .status(400)
      .json({ message: "Title and instructions are required" });
  }

  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res
      .status(400)
      .json({ message: "At least one ingredient is required" });
  }

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new recipe with MongoDB ObjectId
    const newRecipe = {
      _id: new mongoose.Types.ObjectId(),
      title,
      ingredients,
      instructions,
      cookingTime: cookingTime || 0,
      servings: servings || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    user.userRecipes.push(newRecipe);
    await user.save();

    res.status(201).json({
      message: "Recipe created successfully",
      recipe: newRecipe,
    });
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateRecipe = async (req, res) => {
  const userId = req.userId;
  const recipeId = req.params.id;
  const { title, ingredients, instructions, cookingTime, servings } = req.body;

  if (!title || !instructions) {
    return res
      .status(400)
      .json({ message: "Title and instructions are required" });
  }

  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res
      .status(400)
      .json({ message: "At least one ingredient is required" });
  }

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const recipe = user.userRecipes.id(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    recipe.title = title;
    recipe.ingredients = ingredients;
    recipe.instructions = instructions;
    recipe.cookingTime = cookingTime || 0;
    recipe.servings = servings || 0;
    recipe.updatedAt = new Date();

    await user.save();

    res.status(200).json({
      message: "Recipe updated successfully",
      recipe,
    });
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  const userId = req.userId;
  const recipeId = req.params.id;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const recipeIndex = user.userRecipes.findIndex(
      recipe => recipe._id.toString() === recipeId
    );

    if (recipeIndex === -1) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    user.userRecipes.splice(recipeIndex, 1);
    await user.save();

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getUserRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
