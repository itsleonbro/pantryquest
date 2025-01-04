import React, { useEffect, useState } from "react";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isAccountClicked, setIsAccountClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // console.log(isLoggedIn);

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

          {isLoggedIn ? (
            <div className={styles.accountPopUp}>
              <div>
                <Link to={"/account/profile"}>Profile</Link>
              </div>

              <div>
                <Link to={"/login"}>My Recipes</Link>
              </div>

              <div onClick={handleLogOut}>
                <Link>Log Out</Link>
              </div>
            </div>
          ) : (
            <div className={styles.accountPopUp}>
              <div>
                <Link to={"/login"}>Sign In</Link>
              </div>
              <div>
                <Link to={"/register"}>Sign Up</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
