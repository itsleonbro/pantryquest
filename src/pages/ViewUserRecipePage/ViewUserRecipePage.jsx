import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./ViewUserRecipePage.module.css";

const ViewUserRecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchRecipe = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/my-recipes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecipe(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError("Failed to load recipe");
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, API_URL]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) {
      return;
    }

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_URL}/api/my-recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/my-recipes");
    } catch (err) {
      console.error("Error deleting recipe:", err);
      alert("Failed to delete recipe");
    }
  };

  if (loading)
    return (
      <div>
        <Navbar />
        <div className={styles.recipeContainer}>
          <p>Loading recipe...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div>
        <Navbar />
        <div className={styles.recipeContainer}>
          <p className={styles.error}>{error}</p>
          <button
            onClick={() => navigate("/my-recipes")}
            className={styles.backBtn}
          >
            Back to My Recipes
          </button>
        </div>
      </div>
    );

  if (!recipe)
    return (
      <div>
        <Navbar />
        <div className={styles.recipeContainer}>
          <p>Recipe not found</p>
          <button
            onClick={() => navigate("/my-recipes")}
            className={styles.backBtn}
          >
            Back to My Recipes
          </button>
        </div>
      </div>
    );

  return (
    <div>
      <Navbar />
      <div className={styles.recipeContainer}>
        <div className={styles.recipeHeader}>
          <h1>{recipe.title}</h1>
          <div className={styles.recipeMeta}>
            {recipe.cookingTime > 0 && (
              <span>⏱️ {recipe.cookingTime} minutes</span>
            )}
            {recipe.servings > 0 && <span>👥 {recipe.servings} servings</span>}
          </div>
        </div>

        <div className={styles.recipeContent}>
          <div className={styles.recipeSection}>
            <h2>Ingredients</h2>
            <ul className={styles.ingredientsList}>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.amount && (
                    <span className={styles.amount}>{ingredient.amount}</span>
                  )}
                  {ingredient.unit && (
                    <span className={styles.unit}>{ingredient.unit}</span>
                  )}
                  <span className={styles.ingredientName}>
                    {ingredient.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.recipeSection}>
            <h2>Instructions</h2>
            <div className={styles.instructions}>
              {recipe.instructions.split("\n").map((step, index) => (
                <p key={index}>{step}</p>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.recipeActions}>
          <Link to="/my-recipes" className={styles.backBtn}>
            Back to My Recipes
          </Link>
          <div className={styles.actionBtns}>
            <Link to={`/edit-recipe/${id}`} className={styles.editBtn}>
              Edit Recipe
            </Link>
            <button onClick={handleDelete} className={styles.deleteBtn}>
              Delete Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserRecipePage;
