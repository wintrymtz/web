import React, { useState } from "react";
import "./AuthStyles.css";

const Registrarse = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    usuario: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registrando usuario:", formData);
    // Aquí puedes agregar lógica para enviar los datos a una API
  };

  return (
    <div className="auth-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="nombre">Nombre(s)</label>
          <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="apellidos">Apellidos</label>
          <input type="text" id="apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="correo">Correo Electrónico</label>
          <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="usuario">Nombre de Usuario</label>
          <input type="text" id="usuario" name="usuario" value={formData.usuario} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="button-group">
          <button type="button" className="cancel-button" onClick={() => window.history.back()}>Cancelar</button>
          <button type="submit" className="accept-button">Aceptar</button>
        </div>
      </form>
    </div>
  );
};

export default Registrarse;
