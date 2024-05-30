import React from "react";
import { useNavigate } from "react-router-dom";

function User() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!token) {
    return <p>Please log in first</p>;
  }

  // Decodifica el token para obtener la información del usuario
  // Esto es solo un ejemplo, en producción deberías usar una biblioteca como jwt-decode
  const user = JSON.parse(atob(token.split(".")[1]));

  return (
    <div>
      <h2>User Profile</h2>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Email: {user.email}</p>
      <button onClick={() => navigate("/courses")}>Go to Courses</button>
    </div>
  );
}

export default User;
