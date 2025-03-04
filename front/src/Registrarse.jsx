import React, { useState } from "react";
import "./AuthStyles.css";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registrando usuario:", userData);

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
          nav("/Home");
        }
      })
      .catch((error) => {
        alert("Error:", error);
      });
  };

  return (
    <div className="auth-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="nombre">Nombre(s)</label>
          <input type="text" id="firstName" name="nombre" value={userData.nombre} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="apellidos">Apellidos</label>
          <input type="text" id="lastName" name="apellidos" value={userData.apellidos} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="correo">Correo Electrónico</label>
          <input type="email" id="email" name="correo" value={userData.correo} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="usuario">Nombre de Usuario</label>
          <input type="text" id="username" name="usuario" value={userData.usuario} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" value={userData.password} onChange={handleChange} required />
        </div>
        
        {/* Sección mejorada de imagen de perfil */}
        <div className="input-group">
          <label htmlFor="image">Imagen de perfil</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleChange} />
          {preview && <img src={preview} alt="Vista previa" className="image-preview" />}
        </div>

        <div className="button-group">
          <button type="button" className="cancel-button" onClick={() => nav("/")}>Cancelar</button>
          <button type="submit" className="accept-button">Aceptar</button>
        </div>
      </form>
    </div>
  );
};

export default Registrarse;













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
