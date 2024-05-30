import React, { useState } from "react";
import api from "../axiosConfig";

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateCourse = async () => {
    if (!title || !description) {
      alert("Por favor complete todos los campos");
      return;
    }

    const body = {
      data: {
        title: title,
        description: description,
      },
    };

    try {
      const response = await api.post("/courses", body);
      console.log(response.data);
      alert("Curso creado exitosamente");
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div className="container">
      <h2>Crear Curso</h2>
      <input
        type="text"
        placeholder="Título del Curso"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Descripción del Curso"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleCreateCourse}>Crear Curso</button>
    </div>
  );
};

export default CreateCourse;
