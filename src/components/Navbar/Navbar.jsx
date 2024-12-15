import React, { useState } from "react";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isAccountClicked, setIsAccountClicked] = useState(false);

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

          <div
            onClick={() => {
              setIsAccountClicked(prevState => !prevState);
            }}
          >
            <AccountCircleRoundedIcon />
          </div>

          {isAccountClicked && (
            <div className={styles.accountPopUp}>
              <div>
                <Link to={"/register"}>Sign Up</Link>
              </div>
              <div>
                <Link to={"/login"}>Sign In</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
