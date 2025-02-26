// src/pages/CommunityRecipesPage/CommunityRecipesPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./CommunityRecipesPage.module.css";

const CommunityRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCommunityRecipes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/community-recipes`);
        setRecipes(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching community recipes:", err);
        setError("Failed to load community recipes");
        setLoading(false);
      }
    };

    fetchCommunityRecipes();
  }, [API_URL]);

  if (loading)
    return (
      <div>
        <Navbar />
        <div className={styles.communityRecipesContainer}>
          <h2>Community Generated Recipes</h2>
          <p className={styles.loading}>Loading recipes...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div>
        <Navbar />
        <div className={styles.communityRecipesContainer}>
          <h2>Community Generated Recipes</h2>
          <p className={styles.error}>{error}</p>
        </div>
      </div>
    );

  return (
    <div>
      <Navbar />
      <div className={styles.communityRecipesContainer}>
        <h2>Community Generated Recipes</h2>
        <p className={styles.description}>
          Discover delicious recipes created and shared by the PantryQuest
          community.
        </p>

        {recipes.length === 0 ? (
          <div className={styles.noRecipes}>
            <p>No community recipes available yet.</p>
            <p>Be the first to contribute by creating your own recipe!</p>
            <Link to="/login" className={styles.createBtn}>
              Sign in to create recipes
            </Link>
          </div>
        ) : (
          <div className={styles.recipeGrid}>
            {recipes.map(recipe => (
              <div key={recipe._id} className={styles.recipeCard}>
                <h3>{recipe.title}</h3>
                <div className={styles.recipeInfo}>
                  {recipe.cookingTime > 0 && (
                    <span>⏱️ {recipe.cookingTime} min</span>
                  )}
                  {recipe.servings > 0 && (
                    <span>👥 {recipe.servings} servings</span>
                  )}
                </div>
                <p className={styles.authorInfo}>
                  By: {recipe.authorUsername || "Community Member"}
                </p>
                <Link
                  to={`/community-recipe/${recipe._id}`}
                  className={styles.viewBtn}
                >
                  View Recipe
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityRecipesPage;
