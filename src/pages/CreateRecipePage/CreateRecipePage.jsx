import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import RecipeForm from "../../components/RecipeForm/RecipeForm";
import styles from "./CreateRecipePage.module.css";

const CreateRecipePage = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.createRecipeContainer}>
        <RecipeForm />
      </div>
    </div>
  );
};

export default CreateRecipePage;
