import React from "react";
import styles from "./Categories.module.css";

const Categories = () => {
  return (
    <div>
      <div>
        <ul className={styles.categories}>
          <li>African</li>
          <li>Italian</li>
        </ul>
      </div>
    </div>
  );
};

export default Categories;
