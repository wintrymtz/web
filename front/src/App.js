import React from "react";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IniciarSesion from "./IniciarSesion";
import Registrarse from "./Registrarse";
import UsersList from "./UsersList";
import CategoriesList from "./CategoriesList";
import Profile from "./Profile";
import Search from "./Search";
import MovieDetails from "./DetallePelicula";
import FavoriteMovies from "./PeliculasFavoritas";
import FavoriteReviews from "./ResenasFavoritas";
import MovieEdit from "./EditarPelicula";
import CrearPelicula from "./CrearPelicula";
import CrearReseña from "./CrearReseña";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/movie-edit" element={<MovieEdit />}></Route>
        <Route path="/reviews-fav" element={<FavoriteReviews />}></Route>
        <Route path="/movies-fav" element={<FavoriteMovies />}></Route>
        <Route path="/details" element={<MovieDetails />}></Route>
        <Route path="/search/:input" element={<Search />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/users-list" element={<UsersList />}></Route>
        <Route path="/genres-list" element={<CategoriesList />}></Route>
        <Route path="/login" element={<IniciarSesion />}></Route>
        <Route path="/register" element={<Registrarse />}></Route>

        <Route path="/create-movie" element={<CrearPelicula />}></Route>
        <Route path="/create-review" element={<CrearReseña />}></Route>
        <Route path="/home" element={<Home />}></Route>


        {/* <Route path="/crear-pelicula" element={<CrearPelicula />} /> */}

        <Route path="/" element={<Home />}></Route>

      </Routes>
    </BrowserRouter>
  );
}
export default App;

