const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: "recipes" },
});

const FavoritesModel = mongoose.model("favorites", favoriteSchema);

module.exports = FavoritesModel;
