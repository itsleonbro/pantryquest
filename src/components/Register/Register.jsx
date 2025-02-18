import React, { useState } from "react";
import styles from "./Register.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/api/signup`, {
        username: username,
        email: email,
        password: password,
      });
      setResponse(response.data.message);

      //clear state on success
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setResponse(error.response.data.message);
      } else {
        setResponse("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.signupContainer}>
        <h2 className={styles.title}>Welcome, let's get you started</h2>
        <form className={styles.form}>
          <input
            type="text"
            placeholder="Username"
            className={styles.input}
            value={username}
            onChange={e => {
              setUsername(e.target.value);
            }}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            className={styles.input}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            className={styles.input}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />

          <button
            type="submit"
            onClick={handleSubmit}
            className={styles.button}
          >
            Sign Up
          </button>
        </form>
        <h2 className={styles.loginPrompt}>
          Already have an account? <Link to={"/login"}>Sign in</Link>
        </h2>

        <h2>{response}</h2>
      </div>
    </div>
  );
};

export default Register;
