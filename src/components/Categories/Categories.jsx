import React from "react";
import styles from "./Categories.module.css";

const Categories = ({ setCuisine, handleCuisineSearch }) => {
  const handleCategoryClick = category => {
    setCuisine(category);
    handleCuisineSearch();
  };

  return (
    <div>
      <div>
        <ul className={styles.categories}>
          <li onClick={() => handleCategoryClick("Italian")}>Italian</li>
          <li onClick={() => handleCategoryClick("Japanese")}>Japanese</li>
          <li onClick={() => handleCategoryClick("Asian")}>Asian</li>
          <li onClick={() => handleCategoryClick("American")}>American</li>
          <li onClick={() => handleCategoryClick("European")}>European</li>
        </ul>
      </div>
    </div>
  );
};

export default Categories;
