import React, { useState } from "react";
import "./css/AuthStyles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const IniciarSesion = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Iniciando sesión con:", { email, password });

    axios.post('http://localhost:3001/user/login', {
      email: email,
      password: password
    }).then((res) => {
      if (res.data.msg === 'encontrado') {

        const user = res.data.usuario;

        // Guardar información en el localStorage
        localStorage.setItem('userID', user.userID);
        localStorage.setItem('userUsername', user.userUsername);
        localStorage.setItem('userType', user.userType);
        localStorage.setItem('userPhoto', user.photo);

        console.log(res.data);
        console.log("Usuario guardado en localStorage:", user);
        nav('/');

      } else {
        alert('Error');
      }
    }).catch((err) => {
      console.log(err.response);
      if (err.response.data.msg === 'no encontrado') {
        alert("Usuario no existe")
      }
    });
  };

  return (
    <div className="main-container">
      <div className="auth-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button">Ingresar</button>
        </form>
        <a href="/register" className="auth-link">¿No tienes cuenta? Regístrate</a>
      </div>
    </div>
  );
};

export default IniciarSesion;
