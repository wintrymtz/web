import React, { useState } from "react";
import Navbar2 from "./navbar";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./css/PeliculasFavoritas.css";

const PeliculasFavoritas = () => {
    const [favorites, setFavorites] = useState([
        {
            id: 1,
            title: "Avatar",
            year: 2009,
            rating: 4,
            image: "https://m.media-amazon.com/images/I/91N1lG+LBIS._AC_UF894,1000_QL80_.jpg"
        },
        {
            id: 2,
            title: "Intensamente 2",
            year: 2024,
            rating: 3,
            image: "https://lumiere-a.akamaihd.net/v1/images/1_intensamente_2_payoff_banner_pre_1_aa3d9114.png"
        },
        {
            id: 3,
            title: "Interstellar",
            year: 2014,
            rating: 5,
            image: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
        },
        {
            id: 4,
            title: "Avengers",
            year: 2012,
            rating: 4,
            image: "https://http2.mlstatic.com/D_NQ_NP_810279-MLM41571618624_042020-O-avengersposter-original-de-cine.webp"
        },
        {
            id: 5,
            title: "Buscando a Nemo",
            year: 2003,
            rating: 3,
            image: "https://es.web.img2.acsta.net/c_310_420/pictures/14/02/13/11/08/054573.jpg"
        }
    ]);

    const [deleteMovie, setDeleteMovie] = useState(null);

    const navigate = useNavigate();

    const toggleFavorita = (id) => {
        setFavorites(favorites.filter(p => p.id !== id));
        setDeleteMovie(null);
    };

    return (
        <div className="favoritas-container">
            <Navbar2 />

            <h1>Tus Peliculas Favoritas</h1><br></br>

            <div className="favoritas-grid">              

                {favorites.map(peli => (
                    <div className="favorita-card" key={peli.id} onClick={() => navigate("/details")} >
                        <div className="favorita-img-wrapper">
                            <img src={peli.image} alt={peli.title} className="favorita-img" />
                            <button className="favorita-star" onClick={(e) => { e.stopPropagation(); setDeleteMovie(peli.id); }}> <FaStar size={35} /> </button>

                            {/* Confirmación */}
                            {deleteMovie === peli.id && (
                                <div className="confirmacion-popup" onClick={(e) => e.stopPropagation()}>
                                    <p>¿Quitar de favoritos?</p>
                                    <div className="confirmacion-botones">
                                        <button className="confirmacion-si" onClick={() => toggleFavorita(peli.id)}>Sí</button>
                                        <button className="confirmacion-no" onClick={() => setDeleteMovie(null)}>No</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="favorita-texto">
                            <h3>{peli.title}</h3>
                            <p><strong>Año:</strong> {peli.year}</p>
                            <p><strong>Calificación:</strong></p>
                            <div className="favorita-estrellas">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        color={i < peli.rating ? "gold" : "white"}
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
