import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar2 from "./navbar";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/CrearPelicula.css";
import axios from "axios";

const EditarPeliculas = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [duracion, setDuracion] = useState("");
  const [anio, setAnio] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [imagen, setImagen] = useState("");
  const [generosDisponibles, setGenerosDisponibles] = useState([]);

  const [errores, setErrores] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const obtenerIdDeURL = () => {
    const params = new URLSearchParams(location.search);
    return params.get("id");
  };

  useEffect(() => {
    const id = obtenerIdDeURL();

    const fetchData = async () => {
      try {
        const [peliculaRes, generosRes] = await Promise.all([
          axios.get(`http://localhost:3001/movies/movieInfo/${id}`),
          axios.get(`http://localhost:3001/genre/list`)
        ]);

        const pelicula = peliculaRes.data;
        const generos = generosRes.data.genres;

        setTitulo(pelicula.movieName);
        setGenero(pelicula.genreName);
        setDuracion(pelicula.duration.toString());
        setAnio(pelicula.yearPremiere.toString());
        setSinopsis(pelicula.synopsis);
        setImagen(pelicula.poster);
        setGenerosDisponibles(generos.map(g => g.genreName));

      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      const base64ImageOnly = base64String.split(',')[1];
      setImagen(base64ImageOnly);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
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
      try {
        const id = obtenerIdDeURL();
        await axios.put(`http://localhost:3001/movies/updateMovie/${id}`, {
          movieName: titulo,
          genreName: genero,
          duration: parseInt(duracion),
          yearPremiere: parseInt(anio),
          synopsis: sinopsis,
          poster: imagen
        });
        setShowPopup(true);
      } catch (error) {
        console.error("Error al actualizar película:", error);
      }

    }
  };

  const handleCancelar = () => {
    setEditMode(false);
    //Recargamos para tener datos de defailt
    window.location.reload();
  };

  const handleEliminar = async () => {
    try {
      const id = obtenerIdDeURL();
      await axios.delete(`http://localhost:3001/movies/deleteMovie/${id}`);
      setShowConfirmDelete(false);
      navigate("/Home");
    } catch (error) {
      console.error("Error al eliminar película:", error);
    }
  };

  return (
    <div>
      <Navbar2 />

      <div className="crear-pelicula">

        <h2>Editar Película</h2>

        {/* --------Imagen--------- */}
        <label className="image-upload">
          <input type="file" accept="image/*" onChange={handleImageChange} disabled={!editMode} />
          <div className="image-preview">
            {imagen ? <img src={`data:image/png;base64,${imagen}`} alt="Preview" /> : <span>📷 Agregar Imagen</span>}
          </div>
        </label>
        {errores.imagen && <p className="error">{errores.imagen}</p>}


        {/* --------Titulo--------- */}
        <div className="input-con-contador">
          <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} disabled={!editMode} className={!editMode ? "disabled-input" : ""} />
          <div className="contador">{titulo.length}/40</div>
        </div>
        {errores.titulo && <p className="error">{errores.titulo}</p>}


        {/* --------Género---------
        <select value={genero} onChange={(e) => setGenero(e.target.value)} disabled={!editMode} className={!editMode ? "disabled-input" : ""}>
          <option value="">Seleccionar Género</option>
          {generosDisponibles.map((g, idx) => (
            <option key={idx} value={g}>{g}</option>
          ))}
        </select>
        {errores.genero && <p className="error">{errores.genero}</p>} */}


        {/* --------Duracion--------- */}
        <input type="text" placeholder="Duración (minutos)" value={duracion} onChange={(e) => setDuracion(e.target.value)} disabled={!editMode} className={!editMode ? "disabled-input" : ""} />
        {errores.duracion && <p className="error">{errores.duracion}</p>}


        {/* --------Año--------- */}
        <input type="text" placeholder="Año de estreno" value={anio} onChange={(e) => setAnio(e.target.value)} disabled={!editMode} className={!editMode ? "disabled-input" : ""} />
        {errores.anio && <p className="error">{errores.anio}</p>}


        {/* --------Sinopsis--------- */}
        <textarea placeholder="Sinopsis" value={sinopsis} onChange={(e) => setSinopsis(e.target.value)} disabled={!editMode} className={!editMode ? "disabled-input" : ""} />
        {errores.sinopsis && <p className="error">{errores.sinopsis}</p>}


        {/* --------Botones--------- */}
        <div className="buttons">
          <button className="editar" onClick={() => setEditMode(true)}>Editar</button>
          <button className="cancelar" onClick={handleCancelar} disabled={!editMode}>Cancelar</button>
          <button className="aceptar" onClick={handleSubmit} disabled={!editMode}>Aceptar</button>
        </div>
      </div>

      <br></br><br></br>
      <button className="cancelar" onClick={() => setShowConfirmDelete(true)}>Eliminar Pelicula</button>


      {/* --------Pop Up de confirmación de actualización--------- */}
      <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
        <div className="modal-content custom-modal">
          <Modal.Body className="text-center">
            <p>Película actualizada correctamente</p>
            <Button variant="light" onClick={() => navigate("/Home")}>Aceptar</Button>
          </Modal.Body>
        </div>
      </Modal>


      {/* --------Pop Up de confirmación de eliminación--------- */}
      <Modal show={showConfirmDelete} onHide={() => setShowConfirmDelete(false)} centered>
        <div className="modal-content custom-modal">
          <Modal.Body className="text-center">
            <p>¿Estás seguro de que deseas eliminar esta película?</p>
            <Button variant="danger" onClick={handleEliminar}>Eliminar</Button>
            <Button variant="secondary" onClick={() => setShowConfirmDelete(false)}>Cancelar</Button>
          </Modal.Body>
        </div>
      </Modal>

    </div>
  );
};

export default EditarPeliculas;
