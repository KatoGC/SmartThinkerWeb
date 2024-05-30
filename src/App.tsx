import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import UserProfile from './screens/UserProfile';
import Courses from './screens/Courses';
import CreateCourse from './screens/CreateCourse';
import ProtectedRoute from './screens/ProtectedRoute'
import './styles/styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
