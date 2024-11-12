import React from "react";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <h1>PantryQuest</h1>
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
