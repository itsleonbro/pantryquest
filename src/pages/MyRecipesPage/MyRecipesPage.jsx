import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import UserRecipes from "../../components/UserRecipes/UserRecipes";
import styles from "./MyRecipesPage.module.css";

const MyRecipesPage = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.myRecipesContainer}>
        <h2>My Recipes</h2>
        <UserRecipes />
      </div>
    </div>
  );
};

export default MyRecipesPage;
