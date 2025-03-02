const UserModel = require("../models/UserModel");
const { v4: uuidv4 } = require("uuid");
const saveRecipe = async (req, res) => {
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

    if (user.favourites.some(fav => fav.title === title)) {
      return res.status(400).json({ message: "Recipe already in favorites" });
    }

    const uniqueID = uuidv4();

    user.favourites.push({
      title,
      recipeID: uniqueID,
      summary,
      readyInMinutes,
      servings,
      ingredients,
      instructions,
    });
    await user.save();

    res.status(200).json({ message: "Recipe added to favorites" });
  } catch (error) {
    console.error("Error saving recipe:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getFavorites = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId, "favourites");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.favourites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  saveRecipe,
  getFavorites,
};
