import React, { useEffect, useState } from "react";
import styles from "./RecipePage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Recipe from "../../components/Recipe/Recipe";
import { useParams } from "react-router-dom";

const RecipePage = () => {
  let params = useParams();

  // state for recipe info search
  const [recipeDetails, setRecipeDetails] = useState(null);

  const apiKey = import.meta.env.VITE_API_KEY;
  const RecipeInfoApiURL = `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${apiKey}&includeNutrition=false`;

  // api 'https://api.spoonacular.com/recipes/{id}/information?'

  function fetchData() {
    fetch(RecipeInfoApiURL)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then(data => setRecipeDetails(data))
      .catch(error => console.error("Error:", error));
  }

  useEffect(() => {
    fetchData();
  }, [params.id]);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className={styles.recipeContainer}>
        <Recipe recipeDetails={recipeDetails} />
      </div>
    </>
  );
};

export default RecipePage;
