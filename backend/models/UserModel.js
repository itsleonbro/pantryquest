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
});

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
