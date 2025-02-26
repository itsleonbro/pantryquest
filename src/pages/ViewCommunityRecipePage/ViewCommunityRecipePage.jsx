// src/pages/ViewCommunityRecipePage/ViewCommunityRecipePage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./ViewCommunityRecipePage.module.css";

const ViewCommunityRecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/community-recipe/${id}`
        );
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

  if (loading)
    return (
      <div>
        <Navbar />
        <div className={styles.recipeContainer}>
          <p className={styles.loading}>Loading recipe...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div>
        <Navbar />
        <div className={styles.recipeContainer}>
          <p className={styles.error}>{error}</p>
          <Link to="/community-recipes" className={styles.backBtn}>
            Back to Community Recipes
          </Link>
        </div>
      </div>
    );

  if (!recipe)
    return (
      <div>
        <Navbar />
        <div className={styles.recipeContainer}>
          <p>Recipe not found</p>
          <Link to="/community-recipes" className={styles.backBtn}>
            Back to Community Recipes
          </Link>
        </div>
      </div>
    );

  return (
    <div>
      <Navbar />
      <div className={styles.recipeContainer}>
        <div className={styles.recipeHeader}>
          <h1>{recipe.title}</h1>
          <p className={styles.authorInfo}>
            Created by: {recipe.authorUsername || "Community Member"}
          </p>
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
          <Link to="/community-recipes" className={styles.backBtn}>
            Back to Community Recipes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewCommunityRecipePage;
