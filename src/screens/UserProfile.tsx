import React, { useEffect, useState } from "react";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import Courses from "./Courses";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await api.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
      console.log("User data fetched:", response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("Error al cargar los datos del usuario");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className="container">
        <h1 className="textTitle">SmartThinker Web Version</h1>
        <h2>Perfil del Usuario</h2>
        <p>
          <strong>Nombre:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <button onClick={handleLogout}>Cerrar Sesión</button>
        <button onClick={()=> navigate("/courses")}>Ver Cursos</button>
      </div>
    </>
  );
};

export default UserProfile;
