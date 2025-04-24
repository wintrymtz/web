import React, { useState, useEffect } from "react";
import Navbar2 from "./navbar";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import "./css/PeliculasFavoritas.css";

const PeliculasFavoritas = () => {
    const [favorites, setFavorites] = useState([]);
    const [deleteMovie, setDeleteMovie] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userID = parseInt(localStorage.getItem("userID"));
        console.log("userID:", userID);

        if (!userID) {
            console.error("No hay userID en localStorage");
            return;
        }

        const fetchFavorites = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/movies/favMoviesList/${userID}`);
                setFavorites(response.data.movies);
            } catch (error) {
                console.error("Error al obtener películas favoritas:", error);
            }
        };

        fetchFavorites();
    }, []);

    const eliminarFavorita = async (movieID) => {
        const userID = parseInt(localStorage.getItem("userID"));
    
        try {
            await axios.delete(`http://localhost:3001/movies/favMoviesDelete/${userID}/${movieID}`);
            
            // Actualiza la lista local sin la película eliminada
            setFavorites(prev => prev.filter(p => p.movieID !== movieID));
            setDeleteMovie(null);
        } catch (error) {
            console.error("Error al eliminar la película favorita:", error);
        }
    };

    return (
        <div className="favoritas-container2">
            <Navbar2 />

            <br/><br/><h1>Tus Películas Favoritas</h1>

            <div className="favoritas-grid2">
                {favorites.map(peli => (
                    <div className="favorita-card2" key={peli.movieID} id={peli.movieID} onClick={() => navigate(`/details?id=${peli.movieID}`)}>
                        <div className="favorita-img-wrapper2">

                            <img src={`data:image/png;base64,${peli.poster}`} alt={peli.movieName} className="favorita-img2" />

                            <button className="favorita-star2" onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteMovie(peli.movieID);
                                }}>
                                <FaStar size={35} />
                            </button>

                            {deleteMovie === peli.movieID && (
                                <div className="confirmacion-popup2" onClick={(e) => e.stopPropagation()}>
                                    <p>¿Quitar de favoritos?</p>
                                    <div className="confirmacion-botones2">
                                        <button className="confirmacion-si2" onClick={() => eliminarFavorita(peli.movieID)}> Sí </button>
                                        <button className="confirmacion-no2" onClick={() => setDeleteMovie(null)}> No </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="favorita-texto2">
                            <h3>{peli.movieName}</h3>
                            <p><strong>Año:</strong> {peli.yearPremiere}</p>
                            <p><strong>Calificación:</strong></p>
                            <div className="favorita-estrellas2">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        color={i < (peli.rating / 2) ? "gold" : "white"}
                                        size={18}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PeliculasFavoritas;
