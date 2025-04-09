import { useState } from "react";
import Navbar2 from "./navbar";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/CrearPelicula.css";
import { useNavigate } from "react-router-dom";

const CrearPelicula = ({ onClose }) => {
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [duracion, setDuracion] = useState("");
  const [anio, setAnio] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [imagen, setImagen] = useState(null);
  const [errores, setErrores] = useState({});
  const [mostrarPopup, setMostrarPopup] = useState(false);

  const navigate = useNavigate();
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
      nuevosErrores.duracion = "Ingresa una duración válida (ejemplo: 120)";
    }

    if (!anio || isNaN(anio) || anio < 1900 || anio > new Date().getFullYear()) {
      nuevosErrores.anio = "Ingresa un año válido";
    }

    if (!sinopsis.trim()) nuevosErrores.sinopsis = "La sinopsis es obligatoria";
    if (!imagen) nuevosErrores.imagen = "Debes subir una imagen";

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      setShowPopup(true);
      setShowRedirect(true);
    }
  };

  const confirmarCreacion = () => {
    const pelicula = { titulo, genero, duracion, anio, sinopsis, imagen };
    console.log("Película creada:", pelicula);
    setMostrarPopup(false);
    navigate("/Home");
  };

  return (
    <div>
      <Navbar2 />

      <div className="crear-pelicula">
        <h2>Crear Película</h2>

        <label className="image-upload">
          <input type="file" accept="image/*" onChange={handleImageChange} />
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
          />
          <div className="contador">{titulo.length}/40</div>
        </div>
        {errores.titulo && <p className="error">{errores.titulo}</p>}

        <select value={genero} onChange={(e) => setGenero(e.target.value)}>
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
        />
        {errores.duracion && <p className="error">{errores.duracion}</p>}

        <input
          type="text"
          placeholder="Año"
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
        />
        {errores.anio && <p className="error">{errores.anio}</p>}

        <textarea
          placeholder="Sinopsis"
          value={sinopsis}
          onChange={(e) => setSinopsis(e.target.value)}
        />
        {errores.sinopsis && <p className="error">{errores.sinopsis}</p>}

        <div className="buttons">
          <button className="cancelar" onClick={onClose}>Cancelar</button>
          <button className="aceptar" onClick={handleSubmit}>Aceptar</button>
        </div>
      </div>

      {/* POPUP DE CONFIRMACIÓN */}
      <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
        <div className="modal-content custom-modal">
          <Modal.Body className="text-center">
            <p>Película añadida correctamente</p>
            <Button variant="light" onClick={() => navigate("/Home")}>Aceptar</Button>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
};

export default CrearPelicula;




// const CrearPelicula = ({ onClose }) => {
//   const [titulo, setTitulo] = useState("");
//   const [genero, setGenero] = useState("");
//   const [duracion, setDuracion] = useState("");
//   const [anio, setAnio] = useState("");
//   const [sinopsis, setSinopsis] = useState("");
//   const [imagen, setImagen] = useState(null);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImagen(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = () => {
//     const pelicula = { titulo, genero, duracion, anio, sinopsis, imagen };
//     console.log("Película creada:", pelicula);
//     onClose();
//   };

//   return (
//     <div className="crear-pelicula">
//       <h2>Crear Película</h2>

//       <label className="image-upload">
//         <input type="file" accept="image/*" onChange={handleImageChange} />
//         <div className="image-preview">
//           {imagen ? <img src={imagen} alt="Preview" /> : <span>📷 Agregar Imagen</span>}
//         </div>
//       </label>

//       <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
//       <select value={genero} onChange={(e) => setGenero(e.target.value)}>
//         <option value="">Seleccionar Género</option>
//         <option value="Acción">Acción</option>
//         <option value="Comedia">Comedia</option>
//         <option value="Drama">Drama</option>
//         <option value="Terror">Terror</option>
//       </select>
//       <input type="text" placeholder="Duración (minutos)" value={duracion} onChange={(e) => setDuracion(e.target.value)} />
//       <input type="text" placeholder="Año" value={anio} onChange={(e) => setAnio(e.target.value)} />
//       <textarea placeholder="Sinopsis" value={sinopsis} onChange={(e) => setSinopsis(e.target.value)} />

//       <div className="buttons">
//         <button className="cancelar" onClick={onClose}>Cancelar</button>
//         <button className="aceptar" onClick={handleSubmit}>Aceptar</button>
//       </div>
//     </div>
//   );
// };

// export default CrearPelicula;
