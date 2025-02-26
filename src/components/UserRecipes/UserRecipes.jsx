import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./UserRecipes.module.css";

const UserRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchUserRecipes();
  }, []);

  const fetchUserRecipes = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to view your recipes");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/my-recipes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecipes(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError("Failed to load recipes");
      setLoading(false);
    }
  };

  const handleDeleteRecipe = async recipeId => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) {
      return;
    }

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_URL}/api/my-recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Remove the deleted recipe from state
      setRecipes(recipes.filter(recipe => recipe._id !== recipeId));
    } catch (err) {
      console.error("Error deleting recipe:", err);
      alert("Failed to delete recipe");
    }
  };

  if (loading) return <p>Loading your recipes...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.recipesContainer}>
      <div className={styles.addNewContainer}>
        <Link to="/create-recipe" className={styles.addNewBtn}>
          Create New Recipe
        </Link>
      </div>

      {recipes.length === 0 ? (
        <div className={styles.noRecipes}>
          <p>You haven't created any recipes yet.</p>
          <p>Click on "Create New Recipe" to get started!</p>
        </div>
      ) : (
        <div className={styles.recipeGrid}>
          {recipes.map(recipe => (
            <div key={recipe._id} className={styles.recipeCard}>
              <h3>{recipe.title}</h3>
              <p>
                {recipe.cookingTime} minutes • {recipe.servings} servings
              </p>

              <div className={styles.recipeActions}>
                <Link
                  to={`/view-recipe/${recipe._id}`}
                  className={styles.viewBtn}
                >
                  View
                </Link>
                <Link
                  to={`/edit-recipe/${recipe._id}`}
                  className={styles.editBtn}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteRecipe(recipe._id)}
                  className={styles.deleteBtn}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserRecipes;
