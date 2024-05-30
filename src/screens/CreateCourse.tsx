import React, { useState } from "react";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateCreation, setDateCreation] = useState("");
  const navigate = useNavigate();

  const handleCreateCourse = async () => {
    if (!title || !description) {
      alert("Por favor complete todos los campos");
      return;
    }

    try {
      const response = await api.post("/cursos", {
        data: {
          title: title,
          description: description,
          dateCreation: dateCreation,
        },
      });
      console.log(response.data);
      alert("Curso creado exitosamente");
      navigate("/courses");
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Error al crear el curso");
    }
  };

  return (
    <div className="container">
      <h1 className="textTitle">SmartThinker Web Version</h1>
      <h2>Crear Curso</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={dateCreation}
        onChange={(e) => setDateCreation(e.target.value)}
        title="Fecha de Creación"
        placeholder="Fecha de Creación"
      />
      <button onClick={handleCreateCourse}>Crear Curso</button>
    </div>
  );
};

export default CreateCourse;
