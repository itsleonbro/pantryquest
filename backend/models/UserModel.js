const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: "string", required: true, unique: true },
  name: { type: "string" },
  lastName: { type: "string" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  favourites: [
    {
      recipeID: { type: String, required: true },
      title: { type: String, required: true },
      summary: { type: String },
      readyInMinutes: { type: String },
      servings: { type: String },
      ingredients: [
        {
          name: { type: String },
        },
      ],
      instructions: { type: String },
    },
  ],

  // user-created recipes
  userRecipes: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      title: { type: String, required: true },
      ingredients: [
        {
          name: { type: String, required: true },
          amount: { type: String },
          unit: { type: String },
        },
      ],
      instructions: { type: String, required: true },
      cookingTime: { type: Number, default: 0 },
      servings: { type: Number, default: 0 },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    },
  ],
});

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
