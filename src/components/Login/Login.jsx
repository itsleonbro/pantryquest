import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    setResponse("");

    try {
      const response = await axios.post("http://localhost:5001/login", {
        email: email,
        password: password,
      });
      if (response.data.message === "Logged in successfully") {
        console.log("success!");
        navigate("/home");

        setResponse(response.data.message);
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
        <form className={styles.form}>
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

          <button type="submit" onClick={handleLogin} className={styles.button}>
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
