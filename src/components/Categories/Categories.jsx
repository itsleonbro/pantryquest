import React from "react";
import styles from "./Categories.module.css";

const Categories = () => {
  return (
    <div>
      <div>
        <ul className={styles.categories}>
          <li>Italian</li>
          <li>Japanese</li>
          <li>Asian</li>
          <li>American</li>
          <li>European</li>
        </ul>
      </div>
    </div>
  );
};

export default Categories;
