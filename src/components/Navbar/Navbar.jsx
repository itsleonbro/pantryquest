import React from "react";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <Link to="/home">
            <h1>PantryQuest</h1>
          </Link>
        </div>

        <div className={styles.rightMenu}>
          <FavoriteBorderRoundedIcon />
          <AccountCircleRoundedIcon />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
