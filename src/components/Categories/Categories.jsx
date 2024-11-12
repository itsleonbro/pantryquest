import React from "react";
import styles from "./Categories.module.css";

const Categories = () => {
  return (
    <div>
      <div>
        <ul className={styles.categories}>
          <li>African</li>
          <li>Italian</li>
          <li>Vegetarian</li>
          <li>Japanese</li>
          <li>Dessert</li>
          <li>Snack</li>
        </ul>
      </div>
    </div>
  );
};

export default Categories;
