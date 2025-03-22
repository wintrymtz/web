// import React, { useState } from "react";
// import "./AuthStyles.css";

// const Registrarse = () => {
//   const [imagen, setImagen] = useState(null);

//   const handleImagenChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagen(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="registro-container">
//       <h2 className="registro-titulo">Registrarse</h2>
//       <form className="registro-form">
//         <div className="registro-inputs">
//           <div className="input-group">
//             <label>Nombre(s)</label>
//             <input type="text" />
//           </div>
//           <div className="input-group">
//             <label>Apellidos</label>
//             <input type="text" />
//           </div>
//           <div className="input-group">
//             <label>Correo Electrónico</label>
//             <input type="email" />
//           </div>
//           <div className="input-group">
//             <label>Nombre de Usuario</label>
//             <input type="text" />
//           </div>
//           <div className="input-group">
//             <label>Contraseña</label>
//             <input type="password" />
//           </div>
//           <div className="input-group">
//             <label>Imagen de perfil</label>
//             <input type="file" accept="image/*" onChange={handleImagenChange} className="input-file" />
//           </div>
//         </div>

//         {imagen && (
//           <div className="preview-container">
//             <img src={imagen} alt="Vista previa" className="preview-imagen" />
//           </div>
//         )}

//         <button type="button" className="boton-seleccionar">Seleccionar Imagen</button>
//         <button type="submit" className="boton-aceptar">Aceptar</button>
//         <button type="button" className="boton-cancelar">Cancelar</button>
//       </form>
//     </div>
//   );
// };

// export default Registrarse;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import "./css/AuthStyles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registrarse = () => {
  const nav = useNavigate();
  const [userData, setUserData] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    usuario: "",
    password: "",
    image: null,
  });

  const [preview, setPreview] = useState(null); // Estado para la vista previa

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setUserData({ ...userData, image: file });

      // Generar vista previa
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const validateInputs = () => {
    const nameRegex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ ]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^\S+$/;

    if (!userData.nombre.trim() || !userData.apellidos.trim() || !userData.correo.trim() || !userData.usuario.trim() || !userData.password.trim() || !userData.image) {
      alert("Todos los campos deben llenarse.");
      return false;
    }

    if (!nameRegex.test(userData.nombre) || !nameRegex.test(userData.apellidos)) {
      alert("Nombre inválido, los nombres y apellidos solo pueden contener letras y espacios.");
      return false;
    }

    if (!emailRegex.test(userData.correo)) {
      alert("Favor de introducir un correo electrónico válido");
      return false;
    }

    if (!usernameRegex.test(userData.usuario)) {
      alert("El nombre de usuario no puede contener espacios");
      return false;
    }

    if (!passwordRegex.test(userData.password)) {
      alert("La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un símbolo");
      return false;
    }

    return true;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registrando usuario:", userData);

    if (!validateInputs()) {
      return;
    }

    const data = new FormData();
    data.append("firstName", userData.nombre);
    data.append("username", userData.usuario);
    data.append("lastName", userData.apellidos);
    data.append("email", userData.correo);
    data.append("password", userData.password);
    data.append("image", userData.image);

    axios
      .post("http://localhost:3001/user/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.data.msg === "ok") {
          alert("Información enviada");
          nav("/");
        }
      })
      .catch((error) => {
        alert("Error:", error);
      });
  };

  return (
    <div className="main-container">
      <div className="auth-container">
        <h2>Registrarse</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="nombre">Nombre(s)</label>
            <input type="text" id="firstName" name="nombre" value={userData.nombre} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="apellidos">Apellidos</label>
            <input type="text" id="lastName" name="apellidos" value={userData.apellidos} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="correo">Correo Electrónico</label>
            <input type="email" id="email" name="correo" value={userData.correo} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="usuario">Nombre de Usuario</label>
            <input type="text" id="username" name="usuario" value={userData.usuario} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" value={userData.password} onChange={handleChange} />
          </div>

          {/* Sección mejorada de imagen de perfil */}
          <div className="input-group custom-file-upload">
            <label htmlFor="image">Imagen de perfil</label>
            <input type="file" className="custom-file-upload" id="image" name="image" accept="image/*" onChange={handleChange} style={{ display: "none" }} />
            {preview && <img src={preview} alt="Vista previa" className="image-preview" />}
          </div>

          <div className="button-group">
            <button type="button" className="cancel-button" onClick={() => nav("/")}>Cancelar</button>
            <button type="submit" className="accept-button">Aceptar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registrarse;




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////








// import React, { useState } from "react";
// import "./AuthStyles.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Registrarse = () => {
//   const nav = useNavigate();

//   const [userData, setUserData] = useState({
//     nombre: "",
//     apellidos: "",
//     correo: "",
//     usuario: "",
//     password: "",
//     image: ""
//   });

//   const handleChange = (e) => {

//     switch (e.target.id) {
//       case 'firstName':
//         setUserData({ ...userData, [e.target.name]: e.target.value });
//         break;
//       case 'lastName':
//         setUserData({ ...userData, [e.target.name]: e.target.value });
//         break;
//       case 'username':
//         setUserData({ ...userData, [e.target.name]: e.target.value });
//         break;
//       case 'email':
//         setUserData({ ...userData, [e.target.name]: e.target.value });
//         break;
//       case 'password':
//         setUserData({ ...userData, [e.target.name]: e.target.value });
//         break;
//       case 'image':
//         setUserData({ ...userData, [e.target.name]: e.target.files[0] });
//         break;
//       default:
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Registrando usuario:", userData);

//     const data = new FormData();
//     data.append('firstName', userData.nombre);
//     data.append('username', userData.usuario);
//     data.append('lastName', userData.apellidos);
//     data.append('email', userData.correo);
//     data.append('password', userData.password);
//     data.append('image', userData.image);

//     console.log(data);

//     // Aquí puedes agregar lógica para enviar los datos a una API

//     axios.post("http://localhost:3001/user/create",
//       data,
//       {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       }
//     ).then((res) => {
//       if (res.data.msg === "ok") {
//         alert('informacion enviada');
//         nav("/Home");
//       }
//     }).catch((error) => {
//       alert('error:', error);
//     })
//   };

//   return (
//     <div className="auth-container">
//       <h2>Registrarse</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="input-group">
//           <label htmlFor="nombre">Nombre(s)</label>
//           <input type="text" id="firstName" name="firstName" value={userData.nombre} onChange={handleChange} required />
//         </div>
//         <div className="input-group">
//           <label htmlFor="apellidos">Apellidos</label>
//           <input type="text" id="lastName" name="lastName" value={userData.apellidos} onChange={handleChange} required />
//         </div>
//         <div className="input-group">
//           <label htmlFor="correo">Correo Electrónico</label>
//           <input type="email" id="email" name="email" value={userData.correo} onChange={handleChange} required />
//         </div>
//         <div className="input-group">
//           <label htmlFor="usuario">Nombre de Usuario</label>
//           <input type="text" id="username" name="username" value={userData.usuario} onChange={handleChange} required />
//         </div>
//         <div className="input-group">
//           <label htmlFor="password">Contraseña</label>
//           <input type="password" id="password" name="password" value={userData.password} onChange={handleChange} required />
//         </div>
//         <div className="input-group">
//           <label htmlFor="password">Imagen de perfil</label>
//           <input type="file" id="image" name="image" onChange={handleChange} required />
//         </div>
//         <div className="button-group">
//           <button type="button" className="cancel-button" onClick={() => nav('/')}>Cancelar</button>
//           <button type="submit" className="accept-button">Aceptar</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Registrarse;
