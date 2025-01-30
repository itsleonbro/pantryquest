import React, { useEffect, useState } from "react";
import styles from "./FaveRecipePage.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const FaveRecipePage = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { title } = useParams(); //get the recipe title from URL

  const [faveRecipes, setFaveRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchFaveRecipe = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("User not logged in");
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/favourites`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setFaveRecipes(response.data);

        //findin the recipe that matches the title
        const matchedRecipe = response.data.find(
          recipe => recipe.title === decodeURIComponent(title)
        );

        if (matchedRecipe) {
          setSelectedRecipe(matchedRecipe);
        } else {
          console.error("Recipe not found");
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchFaveRecipe();
  }, [title]); //rerun when title changes

  if (!selectedRecipe) {
    return <p>Loading recipe...</p>;
  }

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          {/* <div className={styles.imageContainer}>
        <img src={selectedRecipe.image} alt={selectedRecipe.title} />
      </div> */}
          <h2>{selectedRecipe.title}</h2>
          <div
            dangerouslySetInnerHTML={{ __html: selectedRecipe.summary }}
          ></div>
          <p>Ready in {selectedRecipe.readyInMinutes} minutes</p>
          <p>Servings: {selectedRecipe.servings}</p>
          <h2>Ingredients</h2>
          <ul className={styles.ingredients}>
            {selectedRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                {`• ${
                  ingredient.name.charAt(0).toUpperCase() +
                  ingredient.name.slice(1)
                }`}
              </li>
            ))}
          </ul>

          <h2>Instructions</h2>
          <div
            className={styles.instructions}
            dangerouslySetInnerHTML={{ __html: selectedRecipe.instructions }}
          ></div>
          <button className={styles.saveBtn}>Save Recipe</button>
        </div>
      </div>
    </>
  );
};

export default FaveRecipePage;
