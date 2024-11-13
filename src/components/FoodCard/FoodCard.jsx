import React from "react";
import defaultRecipes from "../DefaultRecipes";
import styles from "./FoodCard.module.css";

const FoodCard = ({ recipeData }) => {
  if (!recipeData || recipeData.length === 0) {
    return (
      <>
        <div>
          <div className={styles.recipeGrid}>
            {defaultRecipes.map(recipe => (
              <div className={styles.recipeCard} key={recipe.id}>
                <div>
                  <img src={recipe.image} alt={recipe.title} />
                </div>

                <div>
                  <h2>{recipe.title}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  console.log(recipeData);

  return (
    <div>
      <div className={styles.recipeGrid}>
        {recipeData.results.map(recipe => (
          <div className={styles.recipeCard} key={recipe.id}>
            <div>
              <img src={recipe.image} alt={recipe.title} />
            </div>

            <div>
              <h2>{recipe.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodCard;
