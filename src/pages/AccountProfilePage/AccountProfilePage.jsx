import React, { useEffect, useState } from "react";
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

  return (
    <div>
      <Navbar />
      <div>
        <div>username: {username}</div>
        <div>Email: {email}</div>
      </div>
    </div>
  );
};

export default AccountProfilePage;
