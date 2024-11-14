import React from "react";
import styles from "./Recipe.module.css";

const Recipe = ({ recipeDetails }) => {
  if (!recipeDetails)
    return (
      <>
        <div className={styles.loadingContainer}>
          <p>Loading...</p>
        </div>
      </>
    ); // loading state while fetching data

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
    </div>
  );
};

export default Recipe;
