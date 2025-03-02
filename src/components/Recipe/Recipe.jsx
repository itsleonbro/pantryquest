import React, { useEffect, useState } from "react";
import styles from "./Recipe.module.css";
import axios from "axios";

const Recipe = ({ recipeDetails }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  if (!recipeDetails)
    return (
      <>
        <div className={styles.loadingContainer}>
          <p>Loading...</p>
        </div>
      </>
    ); // loading state while fetching data

  const API_URL = import.meta.env.VITE_API_URL;

  const saveRecipe = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${API_URL}/api/save-recipe`,
        {
          title: recipeDetails.title,
          summary: recipeDetails.summary,
          readyInMinutes: recipeDetails.readyInMinutes,
          servings: recipeDetails.servings,
          ingredients: recipeDetails.extendedIngredients,
          instructions: recipeDetails.instructions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Recipe saved successfully!");
    } catch (error) {
      const errorMsg = error.response?.data.message || error.message;

      setErrorMessage(errorMsg);

      console.error(
        "Failed to save recipe:",
        error.response?.data || error.message
      );

      if (error.response?.status === 403) {
        setErrorMessage("You must be logged in");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={recipeDetails.image} alt={recipeDetails.title} />
      </div>
      <h2>{recipeDetails.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: recipeDetails.summary }}></div>
      <p>Ready in {recipeDetails.readyInMinutes} minutes</p>
      <p>Servings: {recipeDetails.servings}</p>
      <h2>Ingredients</h2>
      <ul className={styles.ingredients}>
        {recipeDetails &&
          recipeDetails.extendedIngredients.map((ingredient, index) => (
            <li key={index}>
              {`• ${
                ingredient.originalName.charAt(0).toUpperCase() +
                ingredient.originalName.slice(1)
              }`}
            </li>
          ))}
      </ul>

      <h2>Instructions</h2>
      <div
        className={styles.instructions}
        dangerouslySetInnerHTML={{ __html: recipeDetails.instructions }}
      ></div>
      <button className={styles.saveBtn} onClick={saveRecipe}>
        Save Recipe
      </button>

      {errorMessage && (
        <div>
          <h3>{errorMessage}</h3>
        </div>
      )}
    </div>
  );
};

export default Recipe;
