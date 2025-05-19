import { useEffect, useState } from "react";
import Navbar2 from "./navbar";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/CrearPelicula.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CrearPelicula = ({ onClose }) => {
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [duracion, setDuracion] = useState("");
  const [anio, setAnio] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errores, setErrores] = useState({});
  const [mostrarPopup, setMostrarPopup] = useState(false);

  const [genres, setGenres] = useState([]);
  const [genresData, setGenresData] = useState([]);

  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showRedirect, setShowRedirect] = useState(false);


  function requestGetGenres() {
    axios.get("http://localhost:3001/genre/list")
      .then((res) => {
        setGenresData(res.data.genres)
      }).catch((err) => {
        console.log('(error)', err.response.data.msg)
      })
  }

  const requestCreateMovie = () => {

    const formData = new FormData();
    formData.append("movieName", titulo);
    formData.append("duration", duracion);
    formData.append("year", anio);
    formData.append("synopsis", sinopsis);
    formData.append("image", imagen);
    console.log(imagen);

    axios.post("http://localhost:3001/movies/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log(res);
        if (res.data.msg === "ok") {
          console.log("Mandando request de generos")
          requestLinkGenres(res.data.movieID);
        }
      }).catch((err) => {
        console.log('(error)', err.response.data)
      })
  }

  const requestLinkGenres = (movieID) => {
    axios.post("http://localhost:3001/movies/link", { genres: genres, movieID: movieID })
      .then((res) => {
        console.log(res);
        if (res.data.msg === "ok") {
          //Aquí se concluye como una peticion correcta
          setShowPopup(true);
          setShowRedirect(true);
        }
      }).catch((err) => {
        console.log('(error)', err.response.data.msg)
      })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleGenres = (e) => {
    const genreID = e.target.value;
    const genreName = e.target.options[e.target.selectedIndex].text;

    console.log(genreName, genreID);

    // Verifica que no esté vacío ni duplicado
    if (
      genreName &&
      !genres.some(g => g.genreName === genreName || g.genreID === genreID)
    ) {
      setGenres([...genres, { genreID, genreName }]);
    }
    console.log(e.target.value);
  }

  const deleteGenre = (element) => {
    setGenres(genres.filter(g => g !== element));
  };

  useEffect(() => {
    console.log(genres)
  }, [genres])

  useEffect(() => {
    requestGetGenres();
  }, [])

  useEffect(() => {
    console.log(genresData)
  }, [genresData])

  const handleSubmit = () => {
    const nuevosErrores = {};

    if (!titulo.trim()) {
      nuevosErrores.titulo = "El título es obligatorio";
    } else if (titulo.length > 40) {
      nuevosErrores.titulo = "El título no debe superar los 40 caracteres";
    }

    if (genres.length < 1) nuevosErrores.genero = "Selecciona un género";

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
      confirmarCreacion();
    }
  };

  const confirmarCreacion = () => {
    const pelicula = { titulo, genero, duracion, anio, sinopsis, imagen };
    console.log("Película creada:", pelicula);
    setMostrarPopup(false);
    requestCreateMovie();
  };

  return (
    <div>
      <Navbar2 />

      <div className="crear-pelicula">
        <h2>Crear Película</h2>

        <label className="image-upload">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <div className="image-preview">
            {preview ? <img src={preview} alt="Preview" /> : <span>📷 Agregar Imagen</span>}
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

        <select value={genero} onChange={(e) => handleGenres(e)}>
          <option value="">Seleccionar Género</option>
          {genresData && genresData.length > 0 &&
            genresData.map((element, index) => (
              <option value={element.genreID}>{element.genreName}</option>
            ))
          }
        </select>
        {errores.genero && <p className="error">{errores.genero}</p>}
        <div style={{ margin: "5px", display: "flex" }}>

          {genres && genres.length > 0 &&
            genres.map((element, index) => (
              <span className="genreItem" key={index} onClick={() => deleteGenre(element)}>
                {element.genreName}
              </span>
            ))
          }
        </div>
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
    </div >
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
