import React, { useEffect, useState } from "react";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/cursos");
        const coursesData = response.data.data.map((course) => ({
          id: course.id,
          title: course.attributes.title || "Sin título", // Manejo de título nulo
          description: course.attributes.description || "Sin descripción", // Manejo de descripción nula
        }));
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
        alert("Error al cargar los cursos");
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container">
      <h1 className="textTitle">SmartThinker Web Version</h1>
      <h2>Cursos</h2>
      <p>Lista de cursos:</p>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/create-course")}>Crear Curso</button>
      <button onClick={() => navigate("/user")}>Ver Perfil</button>
    </div>
  );
};

export default Courses;
