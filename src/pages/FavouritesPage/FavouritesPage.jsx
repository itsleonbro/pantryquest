import React, { useEffect, useState } from "react";
import styles from "./FavouritesPage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const FavouritesPage = () => {
  const [favourites, setFavourites] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/favourites`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log(response.data);
        setFavourites(response.data); // Save recipes in state
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles.favContainer}>
        <h2>Saved Recipes</h2>
        <ul>
          {favourites.map((recipe, index) => (
            <li key={index}>
              <Link to={`/faverecipe/${encodeURIComponent(recipe.title)}`}>
                {recipe.title}
              </Link>{" "}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FavouritesPage;
