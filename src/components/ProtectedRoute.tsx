import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('jwt');

  if (!token) {
    alert('No estás autenticado. Por favor, inicia sesión.');
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
