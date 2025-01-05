import React, { useEffect, useState } from "react";
import styles from "./AccountProfilePage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

const AccountProfilePage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`${API_URL}/api/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboard();
  }, []);

  const handleSaveChanges = e => {
    e.preventDefault();
  };

  return (
    <div>
      <Navbar />
      <div className={styles.profileContainer}>
        <h2 className={styles.profileHeading}>Profile</h2>

        <form action="" onSubmit={handleSaveChanges}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={e => {
                setUsername(e.target.value);
              }}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className={styles.submitBtn}>
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountProfilePage;
