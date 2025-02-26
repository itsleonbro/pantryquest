const express = require("express");
const router = express.Router();
const {
  getUserRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/userRecipe.controller");
const authenticate = require("../middleware/authenticate");

// all routes in this file require authentication
router.use(authenticate);

// protected routes
router.get("/my-recipes", getUserRecipes);
router.get("/my-recipes/:id", getRecipeById);
router.post("/my-recipes", createRecipe);
router.put("/my-recipes/:id", updateRecipe);
router.delete("/my-recipes/:id", deleteRecipe);

module.exports = router;
