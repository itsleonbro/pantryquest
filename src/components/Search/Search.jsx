import React from "react";
import styles from "./Search.module.css";

const Search = ({ ingredients, setIngredients, handleSearch, loading }) => {
  return (
    <>
      <div className={styles.search}>
        <div className={styles.container}>
          <h1 className={styles.heading}>What's in your fridge?</h1>

          <label className={styles.label}>
            <div className={styles.inputContainer}>
              <div
                className={styles.icon}
                data-icon="MagnifyingGlass"
                data-size="20px"
                data-weight="regular"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                </svg>
              </div>

              <input
                placeholder="Search ingredients"
                value={ingredients}
                onChange={e => setIngredients(e.target.value)}
                className={styles.input}
              />

              <div className={styles.buttonContainer}>
                <button
                  onClick={handleSearch}
                  className={styles.button}
                  disabled={loading} // disable the button when loading
                >
                  {loading ? "Loading" : "Search"}
                </button>
              </div>
            </div>
          </label>
        </div>
      </div>
    </>
  );
};

export default Search;
