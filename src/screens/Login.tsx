import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/styles.css'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:1337/api/auth/local",
        {
          identifier: email,
          password: password,
        }
      );
      console.log(response.data);
      // Guardar el token y redirigir a la página del usuario
      localStorage.setItem("token", response.data.jwt);
      navigate("/user");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <a href="/signup" className="link">No tienes cuenta? <span className="signInTextBold">Registrate</span></a>
    </div>
  );
}

export default Login;
