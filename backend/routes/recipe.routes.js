const express = require('express');
const router = express.Router();
const { saveRecipe, getFavorites } = require('../controllers/recipe.controller');
const authenticate = require('../middleware/authenticate');

router.post('/save-recipe', authenticate, saveRecipe);
router.get('/favourites', authenticate, getFavorites);

module.exports = router;