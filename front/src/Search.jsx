
import React, { useEffect, useState } from "react";
import "./css/Home.css"; // Importamos el CSS
import "./css/usersList.css";
import Navbar2 from "./navbar";
import { useNavigate, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import Footer from "./Footer";

const movies = [
    {
        title: "Avatar",
        image: "https://m.media-amazon.com/images/I/91N1lG+LBIS._AC_UF894,1000_QL80_.jpg",
        description: "Una película de ciencia ficción.",
        calif: "8/10",
        year: "2010"
    },
    {
        title: "Intensamente 2",
        image: "https://lumiere-a.akamaihd.net/v1/images/1_intensamente_2_payoff_banner_pre_1_aa3d9114.png",
        description: "Secuela de Intensamente.",
        calif: "6/10",
        year: "2010"
    },
    {
        title: "Annabelle 3",
        image: "https://hips.hearstapps.com/hmg-prod/images/poster-peliculas-terror-2019-annabelle-3-1578395572.jpg",
        description: "Nueva entrega de la saga de terror.",
        calif: "6/10",
        year: "2010"
    },
    {
        title: "Avatar 2",
        image: "https://lumiere-a.akamaihd.net/v1/images/poster-avatar-2-lat_46034440_1_c359a2d2.png",
        description: "El regreso a Pandora.",
        calif: "6/10",
        year: "2010"
    }
];

export default function Search() {

    const [results, setResults] = useState([]);
    const { input } = useParams();
    const [order, setOrder] = useState("");
    const [genre, setGenre] = useState("");
    const nav = useNavigate();

    const MoviesGrid = () => (
        <div className="movies-grid">
            {results.map((movie, index) => (
                <MovieCard key={index} {...movie} />
            ))}
        </div>
    );

    useEffect(() => {

        const data = movies;
        setResults(data);

        if (order.length > 0) {
        }

        if (data.length < 1) {
            alert('ningun resutado');
            nav('/home');
        }
    }, [order,]);

    return (
        <div className="home-container">
            <Navbar2 />
            <div className="hero">
                <div className="wContainer-1" style={{ width: "90%", margin: "auto", marginBottom: "5vh", paddingBottom: "3vh" }}>
                    <h1>Resultados de: '{input !== 'undefined' ? input : ""}'</h1>
                </div>
            </div>
            <div style={{ marginBottom: "200px" }}>
                <div style={{ display: "flex" }}>
                    <div className="wContainer-2">
                        <hr className="hr-1"></hr>
                        <h3>Ordenar por:</h3>
                        <ul className="li-1">
                            <li onClick={() => (setOrder('Destacado'))}>Destacado</li>
                            <li onClick={() => (setOrder('Reciente'))}>Reciente</li>
                            <li onClick={() => (setOrder('Hablado'))}>Más hablado</li>
                            <li onClick={() => (setOrder('Alfabético'))}>Alfabético</li>
                        </ul>
                        <hr className="hr-1"></hr>
                        <h3>Género</h3>
                        <ul className="li-1">
                            <li onClick={() => (setGenre('Terror'))}>Terror</li>
                            <li onClick={() => (setGenre('Comedia'))}>Comedia</li>
                            <li onClick={() => (setGenre('Drama'))}>Drama</li>
                        </ul>
                    </div>
                    <div style={{ width: "80%", marginLeft: "auto" }}>
                        <div style={{ width: "100%" }}>
                            <h3 style={{ textAlign: "left", paddingLeft: "5vh", fontWeight: "bold" }}>{order}{genre === "" ? "" : " (" + genre + ")"}</h3>
                            <MoviesGrid />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
}