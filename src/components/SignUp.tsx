import React, { useState } from "react";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username || !email || !password) {
      alert("Por favor complete todos los campos");
      return;
    }

    try {
      const response = await api.post("/auth/local/register", {
        username: username,
        email: email,
        password: password,
      });
      console.log(response.data);
      alert("Registro exitoso");
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Error en el registro");
    }
  };

  return (
    <div className="container">
      <h1 className="textTitle">SmartThinker Web Version</h1>

      <h2>Registrarse</h2>
      <input
        type="text"
        placeholder="Nombre de Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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
      <button onClick={handleSignup}>Registrarse</button>
      <div className="signInText">
        ¿Ya tienes cuenta?{" "}
        <span className="signInTextBold" onClick={() => navigate("/login")}>
          Inicia Sesión
        </span>
      </div>
    </div>
  );
};

export default Signup;
