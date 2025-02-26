const express = require("express");
const router = express.Router();
const {
  getAllCommunityRecipes,
  getCommunityRecipeById,
} = require("../controllers/userRecipe.controller");

router.get("/community-recipes", getAllCommunityRecipes);
router.get("/community-recipe/:id", getCommunityRecipeById);

module.exports = router;
