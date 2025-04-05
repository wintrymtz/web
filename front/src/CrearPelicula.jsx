


import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
// import Navbar2 from "./navbar";
import "./css/CrearPelicula.css";

const CrearPelicula = ({ onClose }) => {
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [duracion, setDuracion] = useState("");
  const [anio, setAnio] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [imagen, setImagen] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    const pelicula = { titulo, genero, duracion, anio, sinopsis, imagen };
    console.log("Película creada:", pelicula);
    onClose();
  };

  return (
    <div className="crear-pelicula">
      <h2>Crear Película</h2>

      <label className="image-upload">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <div className="image-preview">
          {imagen ? <img src={imagen} alt="Preview" /> : <span>📷 Agregar Imagen</span>}
        </div>
      </label>

      <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
      <select value={genero} onChange={(e) => setGenero(e.target.value)}>
        <option value="">Seleccionar Género</option>
        <option value="Acción">Acción</option>
        <option value="Comedia">Comedia</option>
        <option value="Drama">Drama</option>
        <option value="Terror">Terror</option>
      </select>
      <input type="text" placeholder="Duración (minutos)" value={duracion} onChange={(e) => setDuracion(e.target.value)} />
      <input type="text" placeholder="Año" value={anio} onChange={(e) => setAnio(e.target.value)} />
      <textarea placeholder="Sinopsis" value={sinopsis} onChange={(e) => setSinopsis(e.target.value)} />

      <div className="buttons">
        <button className="cancelar" onClick={onClose}>Cancelar</button>
        <button className="aceptar" onClick={handleSubmit}>Aceptar</button>
      </div>
    </div>
  );
};

export default CrearPelicula;
