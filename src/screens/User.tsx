import React, { useEffect, useState } from "react";
import api from "../axiosConfig";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/users/me");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Perfil del Usuario</h2>
      <p>
        Nombre: {user.firstName} {user.lastName}
      </p>
      <p>Email: {user.email}</p>
      <p>Ocupación: {user.occupation}</p>
      <p>Edad: {user.age}</p>
      <p>Rol: {user.role}</p>
      <p>Descripción: {user.description}</p>
    </div>
  );
};

export default UserProfile;
