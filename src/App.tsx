import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/SignUp";
import UserProfile from "./screens/User";
import Courses from "./screens/Courses";
import CreateCourse from "./screens/CreateCourse";
import "./styles/styles.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/create-course" element={<CreateCourse />} />
      </Routes>
    </Router>
  );
}

export default App;
