import React from "react";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IniciarSesion from "./IniciarSesion";
import Registrarse from "./Registrarse";
import UsersList from "./UsersList";
import CategoriesList from "./CategoriesList";
import Profile from "./Profile";
import Search from "./Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search/:input" element={<Search />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/users-list" element={<UsersList />}></Route>
        <Route path="/genres-list" element={<CategoriesList />}></Route>
        <Route path="/login" element={<IniciarSesion />}></Route>
        <Route path="/register" element={<Registrarse />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

