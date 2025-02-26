import React, { useEffect, useState, useRef } from "react";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isAccountClicked, setIsAccountClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAccountClicked(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // close dropdown when scrolling
  useEffect(() => {
    function handleScroll() {
      if (isAccountClicked) {
        setIsAccountClicked(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isAccountClicked]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsAccountClicked(prevState => !prevState);
  };

  const handleLinkClick = () => {
    setIsAccountClicked(false);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <Link to="/home">
            <h1>PantryQuest</h1>
          </Link>
        </div>

        <div className={styles.navLinks}>
          <Link to="/home">Home</Link>
          <Link to="/community-recipes">Community Recipes</Link>
        </div>

        <div className={styles.rightMenu} ref={dropdownRef}>
          <Link to={"/account/favourites"}>
            <FavoriteBorderRoundedIcon />
          </Link>

          <div className={styles.accountIcon} onClick={toggleDropdown}>
            <AccountCircleRoundedIcon />
          </div>

          {isLoggedIn ? (
            <div
              className={`${styles.accountPopUp} ${
                isAccountClicked ? styles.show : ""
              }`}
            >
              <div onClick={handleLinkClick}>
                <Link to={"/home"}>Home</Link>
              </div>
              <div onClick={handleLinkClick}>
                <Link to={"/community-recipes"}>Community Recipes</Link>
              </div>
              <div onClick={handleLinkClick}>
                <Link to={"/my-recipes"}>My Recipes</Link>
              </div>
              <div onClick={handleLinkClick}>
                <Link to={"/account/profile"}>Profile</Link>
              </div>
              <div onClick={handleLinkClick}>
                <Link to={"/account/favourites"}>Saved Recipes</Link>
              </div>
              <div
                onClick={() => {
                  handleLogOut();
                  handleLinkClick();
                }}
              >
                <Link>Log Out</Link>
              </div>
            </div>
          ) : (
            <div
              className={`${styles.accountPopUp} ${
                isAccountClicked ? styles.show : ""
              }`}
            >
              <div onClick={handleLinkClick}>
                <Link to={"/community-recipes"}>Community Recipes</Link>
              </div>
              <div onClick={handleLinkClick}>
                <Link to={"/login"}>Sign In</Link>
              </div>
              <div onClick={handleLinkClick}>
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
