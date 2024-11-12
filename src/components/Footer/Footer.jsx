import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.branding}>
          <h2 className={styles.logo}>PantryQuest</h2>
          <p>Your ultimate recipe finder and kitchen companion.</p>
        </div>

        <div className={styles.linksSection}>
          <ul className={styles.linksList}>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/recipes">Recipes</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        <div className={styles.socialMedia}>
          <h3>Follow Us</h3>
          <div className={styles.socialIcons}>
            <a
              href="https://facebook.com/leonhlabathi"
              target="_blank"
              rel="noreferrer"
            >
              <img src="./src/assets/social-icons/facebook_icon.svg" alt="" />
            </a>
            <a
              href="https://twitter.com/leonhlabathi"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="./src/assets/social-icons/x_logo_twitter_new_brand_icon.svg"
                alt=""
              />
            </a>
            <a
              href="https://instagram.com/leonhlabathi"
              target="_blank"
              rel="noreferrer"
            >
              <img src="./src/assets/social-icons/instagram_icon.svg" alt="" />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>
          &copy; {new Date().getFullYear()} PantryQuest. All rights reserved.{" "}
          <br />
          Developed by <Link to={"https://itsleon.dev"}>Leon Hlabathi</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
