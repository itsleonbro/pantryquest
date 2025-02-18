import React from "react";
import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import styles from "./Login.module.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    setResponse("");

    try {
      const loginResponse = await axios.post(`${API_URL}/api/login`, {
        email: email,
        password: password,
      });

      if (loginResponse.data.message === "Logged in successfully") {
        setResponse(loginResponse.data.message);
        localStorage.setItem("token", loginResponse.data.token);
        navigate("/home");
      } else {
        setResponse(loginResponse.data.message);
      }
    } catch (error) {
      console.error(error);
      setResponse("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h2 className={styles.title}>Welcome, let's get you logged in</h2>

        <form className={styles.form} onSubmit={handleLogin}>
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

          <button type="submit" className={styles.button}>
            Sign In
          </button>
        </form>

        <h2 className={styles.loginPrompt}>
          Don't have an account? <Link to={"/register"}>Sign up</Link>
        </h2>

        <h2>{response}</h2>
      </div>
    </div>
  );
};

export default Login;
