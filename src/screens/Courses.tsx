import React, { useEffect, useState } from "react";
import api from "../axiosConfig";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses");
        setCourses(response.data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container">
      <h2>Cursos Disponibles</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h3>{course.attributes.title}</h3>
            <p>{course.attributes.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
