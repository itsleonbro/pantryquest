import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./RecipeForm.module.css";

const RecipeForm = ({ recipeId = null, initialData = null }) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([
    { name: "", amount: "", unit: "" },
  ]);
  const [instructions, setInstructions] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [servings, setServings] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const isEditing = !!recipeId;

  useEffect(() => {
    // If editing, fill form with initial data
    if (initialData) {
      setTitle(initialData.title || "");
      setIngredients(
        initialData.ingredients || [{ name: "", amount: "", unit: "" }]
      );
      setInstructions(initialData.instructions || "");
      setCookingTime(initialData.cookingTime || "");
      setServings(initialData.servings || "");
    }
  }, [initialData]);

  // If editing but no initial data, fetch the recipe data
  useEffect(() => {
    if (isEditing && !initialData) {
      fetchRecipe();
    }
  }, [recipeId, initialData]);

  const fetchRecipe = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/api/my-recipes/${recipeId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const recipe = response.data;
      setTitle(recipe.title);
      setIngredients(
        recipe.ingredients.length > 0
          ? recipe.ingredients
          : [{ name: "", amount: "", unit: "" }]
      );
      setInstructions(recipe.instructions);
      setCookingTime(recipe.cookingTime);
      setServings(recipe.servings);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching recipe:", err);
      setError("Failed to load recipe");
      setLoading(false);
    }
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "", unit: "" }]);
  };

  const handleRemoveIngredient = index => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      setError("Recipe title is required");
      return;
    }

    // Filter out empty ingredients
    const filteredIngredients = ingredients.filter(
      ing => ing.name.trim() !== ""
    );

    if (filteredIngredients.length === 0) {
      setError("At least one ingredient is required");
      return;
    }

    if (!instructions.trim()) {
      setError("Instructions are required");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in");
      return;
    }

    const recipeData = {
      title,
      ingredients: filteredIngredients,
      instructions,
      cookingTime: parseInt(cookingTime) || 0,
      servings: parseInt(servings) || 0,
    };

    try {
      setLoading(true);
      setError("");

      if (isEditing) {
        // Update existing recipe
        await axios.put(`${API_URL}/api/my-recipes/${recipeId}`, recipeData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Create new recipe
        await axios.post(`${API_URL}/api/my-recipes`, recipeData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setLoading(false);
      navigate("/my-recipes");
    } catch (err) {
      console.error("Error saving recipe:", err);
      setError("Failed to save recipe");
      setLoading(false);
    }
  };

  if (loading && isEditing) return <p>Loading recipe...</p>;

  return (
    <div className={styles.formContainer}>
      <h2>{isEditing ? "Edit Recipe" : "Create New Recipe"}</h2>

      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} className={styles.recipeForm}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.recipeTitle}>
            Recipe Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter recipe title"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Ingredients *</label>
          {ingredients.map((ing, index) => (
            <div key={index} className={styles.ingredientRow}>
              <input
                type="text"
                value={ing.name}
                onChange={e =>
                  handleIngredientChange(index, "name", e.target.value)
                }
                placeholder="Ingredient name"
                className={styles.ingredientName}
              />
              <input
                type="text"
                value={ing.amount}
                onChange={e => {
                  const newValue = e.target.value.replace(/[^0-9]/g, "");
                  handleIngredientChange(
                    index,
                    "amount",
                    newValue.replace(/^0+/, "")
                  ); // remove leading zeroes
                }}
                placeholder="Amount"
                className={styles.ingredientAmount}
                maxLength={5}
              />
              <input
                type="text"
                value={ing.unit}
                onChange={e =>
                  handleIngredientChange(
                    index,
                    "unit",
                    e.target.value.replace(/[^a-zA-Z]/g, "")
                  )
                }
                placeholder="Unit"
                className={styles.ingredientUnit}
              />
              <button
                type="button"
                onClick={() => handleRemoveIngredient(index)}
                className={styles.removeBtn}
                disabled={ingredients.length <= 1}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddIngredient}
            className={styles.addBtn}
          >
            + Add Ingredient
          </button>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="instructions">Instructions *</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={e => setInstructions(e.target.value)}
            placeholder="Enter step by step instructions"
            rows="6"
            required
          ></textarea>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="cookingTime">Cooking Time (minutes)</label>
            <input
              type="number"
              id="cookingTime"
              value={cookingTime}
              onChange={e => setCookingTime(e.target.value)}
              placeholder="e.g., 30"
              min="0"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="servings">Servings</label>
            <input
              type="number"
              id="servings"
              value={servings}
              onChange={e => setServings(e.target.value)}
              placeholder="e.g., 4"
              min="1"
            />
          </div>
        </div>

        <div className={styles.formActions}>
          <button
            type="button"
            onClick={() => navigate("/my-recipes")}
            className={styles.cancelBtn}
          >
            Cancel
          </button>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading
              ? "Saving..."
              : isEditing
              ? "Update Recipe"
              : "Create Recipe"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
