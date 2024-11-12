import React from "react";
import styles from "./HomePage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Search from "../../components/Search/Search";
import Categories from "../../components/Categories/Categories";
import FoodCard from "../../components/FoodCard/FoodCard";

const HomePage = ({ingredients, setIngredients, recipeData, handleSearch}) => {
  return (
    <>
      <div>
        <Navbar />
        <Search
          ingredients={ingredients}
          setIngredients={setIngredients}
          handleSearch={handleSearch}
        />

        <div className={styles.categories}>
          <Categories />
        </div>

        <div className={styles.suggestedRecipes}>
          <h2>Suggested Recipes</h2>
          <div className={styles.foodCard}>
            <FoodCard recipeData={recipeData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
