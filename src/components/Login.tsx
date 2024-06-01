import React, { useState } from "react";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) {
      alert("Por favor complete todos los campos");
      return;
    }

    try {
      const response = await api.post("/auth/local", {
        identifier: email,
        password: password,
      });

      const token = response.data.jwt;
      localStorage.setItem("jwt", token);
      console.log(response.data);

      console.log("Login successful, token stored:", token);
      alert("Inicio de sesión exitoso");
      navigate("/user");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error en el inicio de sesión");
    }
  };

  return (
    <div className="container">
      <h1 className="textTitle">SmartThinker Web Version</h1>
      <h2>Iniciar Sesión</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(email, password);
        }}
      >
        {" "}
        {/* Envuelve los inputs en un form */}
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar Sesión</button>{" "}
        {/* Cambia a type="submit" */}
      </form>
      <div className="signInText">
        ¿No tienes cuenta?{" "}
        <span className="signInTextBold" onClick={() => navigate("/signup")}>
          Regístrate
        </span>
      </div>
    </div>
  );
};

export default Login;
