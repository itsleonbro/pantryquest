import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import RecipeForm from "../../components/RecipeForm/RecipeForm";
import styles from "./EditRecipePage.module.css";

const EditRecipePage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState(null);
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

  if (loading)
    return (
      <div>
        <Navbar />
        <div className={styles.editRecipeContainer}>
          <p>Loading recipe...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div>
        <Navbar />
        <div className={styles.editRecipeContainer}>
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

  return (
    <div>
      <Navbar />
      <div className={styles.editRecipeContainer}>
        <RecipeForm recipeId={id} initialData={recipe} />
      </div>
    </div>
  );
};

export default EditRecipePage;
