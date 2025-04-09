import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "./navbar";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/CrearPelicula.css";

const EditarPeliculas = () => {
  const navigate = useNavigate();

  const datosIniciales = {
    titulo: "Avatar",
    genero: "Ciencia Ficción",
    duracion: "162",
    anio: "2009",
    sinopsis:
      "En un exuberante planeta llamado Pandora, un ex-marine parapléjico se embarca en una misión única, pero pronto se ve atrapado entre seguir órdenes y proteger el mundo que siente como su hogar.",
    imagen:
      "https://moviepostermexico.com/cdn/shop/products/AVATAR1.jpg?v=1604506515",
  };

  const [titulo, setTitulo] = useState(datosIniciales.titulo);
  const [genero, setGenero] = useState(datosIniciales.genero);
  const [duracion, setDuracion] = useState(datosIniciales.duracion);
  const [anio, setAnio] = useState(datosIniciales.anio);
  const [sinopsis, setSinopsis] = useState(datosIniciales.sinopsis);
  const [imagen, setImagen] = useState(datosIniciales.imagen);

  const [errores, setErrores] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showRedirect, setShowRedirect] = useState(false);

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
      setShowRedirect(true); // señal para redireccionar tras cerrar
    }
  };

  const handleCancelar = () => {
    setTitulo(datosIniciales.titulo);
    setGenero(datosIniciales.genero);
    setDuracion(datosIniciales.duracion);
    setAnio(datosIniciales.anio);
    setSinopsis(datosIniciales.sinopsis);
    setImagen(datosIniciales.imagen);
    setEditMode(false);
    setErrores({});
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    if (showRedirect) {
      navigate("/Home");
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
            className={!editMode ? "disabled-input" : ""}
          />
          <div className="contador">{titulo.length}/40</div>
        </div>
        {errores.titulo && <p className="error">{errores.titulo}</p>}

        <select
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          disabled={!editMode}
          className={!editMode ? "disabled-input" : ""}
        >
          <option value="">Seleccionar Género</option>
          <option value="Acción">Acción</option>
          <option value="Comedia">Comedia</option>
          <option value="Drama">Drama</option>
          <option value="Terror">Terror</option>
          <option value="Ciencia Ficción">Ciencia Ficción</option>
        </select>
        {errores.genero && <p className="error">{errores.genero}</p>}

        <input
          type="text"
          placeholder="Duración (minutos)"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          disabled={!editMode}
          className={!editMode ? "disabled-input" : ""}
        />
        {errores.duracion && <p className="error">{errores.duracion}</p>}

        <input
          type="text"
          placeholder="Año"
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
          disabled={!editMode}
          className={!editMode ? "disabled-input" : ""}
        />
        {errores.anio && <p className="error">{errores.anio}</p>}

        <textarea
          placeholder="Sinopsis"
          value={sinopsis}
          onChange={(e) => setSinopsis(e.target.value)}
          disabled={!editMode}
          className={!editMode ? "disabled-input" : ""}
        />
        {errores.sinopsis && <p className="error">{errores.sinopsis}</p>}

        <div className="buttons">
          <button className="editar" onClick={() => setEditMode(true)}>Editar</button>
          <button className="cancelar" onClick={handleCancelar} disabled={!editMode}>Cancelar</button>
          <button className="aceptar" onClick={handleSubmit} disabled={!editMode}>Aceptar</button>
        </div>
      </div>

      <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
        <div className="modal-content custom-modal">
          <Modal.Body className="text-center">
            <p>Película actualizada correctamente</p>
            <Button variant="light" onClick={() => navigate("/Home")}>Aceptar</Button>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
};

export default EditarPeliculas;
