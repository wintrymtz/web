import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "./navbar";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/CrearPelicula.css";

const EditarPeliculas = () => {
  const navigate = useNavigate();

  // Datos dummy cargados inicialmente
  const [titulo, setTitulo] = useState("Mi película favorita");
  const [genero, setGenero] = useState("Acción");
  const [duracion, setDuracion] = useState("120");
  const [anio, setAnio] = useState("2020");
  const [sinopsis, setSinopsis] = useState("Una sinopsis interesante y bien escrita.");
  const [imagen, setImagen] = useState("https://via.placeholder.com/150");

  const [errores, setErrores] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    const nuevosErrores = {};

    if (!titulo.trim()) {
      nuevosErrores.titulo = "El título es obligatorio";
    } else if (titulo.length > 40) {
      nuevosErrores.titulo = "El título no debe superar los 40 caracteres";
    }

    if (!genero) nuevosErrores.genero = "Selecciona un género";

    if (!duracion || isNaN(duracion) || duracion <= 0) {
      nuevosErrores.duracion = "Ingresa una duración válida";
    }

    if (!anio || isNaN(anio) || anio < 1900 || anio > new Date().getFullYear()) {
      nuevosErrores.anio = "Ingresa un año válido";
    }

    if (!sinopsis.trim()) nuevosErrores.sinopsis = "La sinopsis es obligatoria";
    if (!imagen) nuevosErrores.imagen = "Debes subir una imagen";

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      setShowPopup(true);
      setTimeout(() => navigate("/Home"), 2000);
    }
  };

  return (
    <div>
      <Navbar2 />

      <div className="crear-pelicula">
        <h2>Editar Película</h2>

        <label className="image-upload">
          <input type="file" accept="image/*" onChange={handleImageChange} disabled={!editMode} />
          <div className="image-preview">
            {imagen ? <img src={imagen} alt="Preview" /> : <span>📷 Agregar Imagen</span>}
          </div>
        </label>
        {errores.imagen && <p className="error">{errores.imagen}</p>}

        <div className="input-con-contador">
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            disabled={!editMode}
          />
          <div className="contador">{titulo.length}/40</div>
        </div>
        {errores.titulo && <p className="error">{errores.titulo}</p>}

        <select value={genero} onChange={(e) => setGenero(e.target.value)} disabled={!editMode}>
          <option value="">Seleccionar Género</option>
          <option value="Acción">Acción</option>
          <option value="Comedia">Comedia</option>
          <option value="Drama">Drama</option>
          <option value="Terror">Terror</option>
        </select>
        {errores.genero && <p className="error">{errores.genero}</p>}

        <input
          type="text"
          placeholder="Duración (minutos)"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          disabled={!editMode}
        />
        {errores.duracion && <p className="error">{errores.duracion}</p>}

        <input
          type="text"
          placeholder="Año"
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
          disabled={!editMode}
        />
        {errores.anio && <p className="error">{errores.anio}</p>}

        <textarea
          placeholder="Sinopsis"
          value={sinopsis}
          onChange={(e) => setSinopsis(e.target.value)}
          disabled={!editMode}
        />
        {errores.sinopsis && <p className="error">{errores.sinopsis}</p>}

        <div className="buttons">
          <button className="cancelar" onClick={() => setEditMode(true)}>Editar</button>
          <button className="aceptar" onClick={handleSubmit} disabled={!editMode}>Aceptar</button>
        </div>
      </div>

      {/* Popup de confirmación */}
      <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
        <Modal.Body className="text-center">
          <p>✅ Película actualizada correctamente</p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditarPeliculas;
