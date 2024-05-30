import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:1337/api/users', {
        firstName,
        lastName,
        email,
        password,
      });
      console.log(response.data);
      // Guardar el token y redirigir a la página del usuario
      localStorage.setItem('token', response.data.jwt);
      navigate('/user');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
      <div className="signInText">
        ¿Ya tienes cuenta? <span className="signInTextBold" onClick={() => navigate('/login')}>Inicia Sesión</span>
      </div>
    </div>
  );
}

export default Signup;
