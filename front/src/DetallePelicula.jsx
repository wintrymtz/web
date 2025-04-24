import React, { useEffect, useState } from "react";
import Navbar2 from "./navbar";
import "./css/Home.css";
import "./css/DetallePelicula.css";
import "./css/ResenasFavoritas.css";
import CrearReseña from "./CrearReseña";
import ResenaItem from "./ResenaItem";
import { useNavigate, useLocation } from "react-router-dom";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import axios from "axios";
import { Button } from "react-bootstrap";
import PopUp2 from "./PopUp2";

export default function DetallePelicula() {
    const nav = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const movieID = params.get("id");

    const [show, setShow] = useState(false);
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [mostrarPopup, setMostrarPopup] = useState(false);
    const [favorite, setFavorite] = useState(false);

    const userType = parseInt(localStorage.getItem("userType"));

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/movies/movieInfo/${movieID}`);
                setMovie(res.data);
            } catch (err) {
                console.error("Error al cargar la película:", err);
            }
        };

        const fetchReviews = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/reviews/movieReviews/${movieID}`);
                setReviews(res.data);
            } catch (err) {
                console.error("Error al cargar las reseñas:", err);
            }
        };

        fetchMovie();
        fetchReviews();
    }, [movieID]);

    const renderStars = (count) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span key={i} className={i < (count / 2) ? "star-filled" : "star-empty"}>★</span>
            );
        }
        return stars;
    };

    const toggleFavorite = () => {
        setFavorite(!favorite);
    };

    const deleteMovie = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/movies/delete/${id}`);
            nav("/Home");
        } catch (error) {
            console.error("Error al eliminar película:", error);
        }
    };

    return (
        <div className="home-container">
            <Navbar2 />
            <PopUp2
                title='ADVERTENCIA'
                text={`¿Seguro que quieres eliminar esta película?`}
                show={show}
                onClose={() => { setShow(false) }}
                onAccept={() => { deleteMovie(movie.movieID) }}
            />

            {movie && (
                <div className="detalle-container">
                    <div className="detalle-contenido">
                        <div className="detalle-imagen-wrapper">
                            <img src={`data:image/png;base64,${movie.image}`} alt={movie.title} className="detalle-imagen" />
                        </div>
                        <div className="detalle-info">
                            <div className="detalle-header">
                                <h1>{movie.title}</h1>
                                <div className="detalle-botones">
                                    <button onClick={toggleFavorite} className="detalle-favorito">
                                        <span className={favorite ? "star-filled" : "star-empty"}>★</span>
                                    </button>
                                    {userType !== 0 && (
                                        <button onClick={() => nav(`/movie-edit?id=${movie.movieID}`)} className="detalle-editar">
                                            ✏️
                                        </button>
                                    )}
                                </div>
                            </div>
                            <p><span className="label">Género: </span>{movie.genreName}</p>
                            <p><span className="label">Duración: </span>{movie.duration} min</p>
                            <p><span className="label">Año: </span>{movie.yearPremiere}</p>
                            <p><span className="label">Calificación: </span>{renderStars(movie.rating)}</p>
                        </div>
                    </div>

                    {userType !== 0 && (
                        <div style={{ display: "flex", justifyContent: "left", width: "100%", marginLeft: "30%" }}>
                            <Button variant="danger" onClick={() => setShow(true)}>Eliminar</Button>
                        </div>
                    )}

                    <div className="detalle-sinopsis">
                        <h2>Sinopsis:</h2>
                        <p>{movie.synopsis}</p>
                    </div>

                    <div className="detalle-top">
                        <h3>Reseñas</h3>
                        <button className="detalle-btn" onClick={() => setMostrarPopup(true)}>
                            Nueva reseña
                        </button>
                    </div>

                    <div className="detalle-reseñas">
                        {reviews.map((review, index) => (
                            <ResenaItem
                                key={index}
                                review={{
                                    user: review.user,
                                    image: review.image,
                                    review: review.review,
                                    rating: review.rating
                                }}
                                onClick={() => {}}
                                onLikeClick={() => {}}
                            />
                            
                        ))}
                    </div>
                </div>
            )}

            {mostrarPopup && <CrearReseña onClose={() => setMostrarPopup(false)} />}
        </div>
    );
}
