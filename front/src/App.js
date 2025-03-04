import React from "react";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IniciarSesion from "./IniciarSesion";
import Registrarse from "./Registrarse";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<IniciarSesion />}></Route>
        <Route path="/register" element={<Registrarse />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

