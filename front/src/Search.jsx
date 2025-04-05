
import React, { useEffect, useState } from "react";
import "./Home.css"; // Importamos el CSS
import "./css/usersList.css";
import Navbar2 from "./Navbar";
import { useParams } from "react-router-dom";

const movies = [
    {
        title: "Avatar",
        image: "https://m.media-amazon.com/images/I/91N1lG+LBIS._AC_UF894,1000_QL80_.jpg",
        description: "Una película de ciencia ficción."
    },
    {
        title: "Intensamente 2",
        image: "https://lumiere-a.akamaihd.net/v1/images/1_intensamente_2_payoff_banner_pre_1_aa3d9114.png",
        description: "Secuela de Intensamente."
    },
    {
        title: "Annabelle 3",
        image: "https://hips.hearstapps.com/hmg-prod/images/poster-peliculas-terror-2019-annabelle-3-1578395572.jpg",
        description: "Nueva entrega de la saga de terror."
    },
    {
        title: "Avatar 2",
        image: "https://lumiere-a.akamaihd.net/v1/images/poster-avatar-2-lat_46034440_1_c359a2d2.png",
        description: "El regreso a Pandora."
    }
];

const MovieCard = ({ title, image, description }) => (
    <div className="movie-card">
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
);

const MoviesGrid = () => (
    <div className="movies-grid">
        {movies.map((movie, index) => (
            <MovieCard key={index} {...movie} />
        ))}
    </div>
);

const Footer = () => (
    <footer className="footer">
        <p>&copy; Resúmenes de películas de todo tipo. Reservados todos los derechos.</p>
    </footer>
);

export default function Search() {

    const [results, setResults] = useState([]);
    const { input } = useParams();

    useEffect(() => {


        //obtener resultados de busqueda
    }, [])
    return (
        <div className="home-container">
            <Navbar2 />
            <div className="hero">
                <div className="wContainer-1" style={{ width: "90%", margin: "auto", marginBottom: "5vh", paddingBottom: "3vh" }}>
                    <h1>Resultados de: '{input !== 'undefined' ? input : ""}'</h1>
                </div>
                <div style={{ display: "flex" }}>
                    <div style={{ width: "80%", marginLeft: "auto" }}>
                        <div style={{ backgroundColor: "gray", width: "100%" }}>
                            <MoviesGrid />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
}