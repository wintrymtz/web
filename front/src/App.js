import React from "react";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IniciarSesion from "./IniciarSesion";
import Registrarse from "./Registrarse";
import UsersList from "./UsersList";
import CategoriesList from "./CategoriesList";

import CrearPelicula from "./CrearPelicula"; 
import CrearReseña from "./CrearReseña"; 


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users-list" element={<UsersList />}></Route>
        <Route path="/genres-list" element={<CategoriesList />}></Route>
        <Route path="/login" element={<IniciarSesion />}></Route>
        <Route path="/register" element={<Registrarse />}></Route>
        
        <Route path="/crear-pelicula" element={<CrearPelicula />}></Route>
        <Route path="/crear-reseña" element={<CrearReseña />}></Route>


        {/* <Route path="/crear-pelicula" element={<CrearPelicula />} /> */}
        
<Route path="/" element={<Home />}></Route>

      </Routes>
    </BrowserRouter>
  );
}
export default App;

