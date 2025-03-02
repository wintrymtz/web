import React, { useState } from "react";
import "./AuthStyles.css";

const IniciarSesion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Iniciando sesión con:", { email, password });
    // Aquí puedes agregar lógica para enviar los datos a una API
  };

  return (
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
      <a href="/registrarse" className="auth-link">¿No tienes cuenta? Regístrate</a>
    </div>
  );
};

export default IniciarSesion;
