import React, { useState } from "react";
import Navbar2 from "./navbar";
import "./css/Home.css";
import "./css/DetallePelicula.css";
import { useNavigate } from "react-router-dom";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";

export default function DetallePelicula() {
    const nav = useNavigate();

    const movie = {
        title: "Avatar",
        image: "https://m.media-amazon.com/images/I/91N1lG+LBIS._AC_UF894,1000_QL80_.jpg",
        genre: "Ciencia Ficción",
        duration: "2h 42min",
        year: 2009,
        rating: 4,
        synopsis: "En un exuberante planeta llamado Pandora, un ex-marine parapléjico se embarca en una misión única, pero pronto se ve atrapado entre seguir órdenes y proteger el mundo que siente como su hogar."
    };

    const dummyReviews = [
        {
            user: "WintryAuthor281",
            text: "¡La pelicula es genial, mi favorita de todos los tiempos, la veria mil veces!",
            rating: 5,
            photo: "https://img.freepik.com/foto-gratis/hermosa-foto-golden-retriever-gafas-sol-panuelo-rojo_181624-24610.jpg?semt=ais_hybrid&w=740"
        },
        {
            user: "Memorandum0406",
            text: "Una experiencia cinematográfica impresionante. La actuación, la dirección y la música se combinan perfectamente para crear una historia emocionante y conmovedora.",
            rating: 4,
            photo: "https://i.pinimg.com/originals/05/51/ac/0551acaa8bb74361d077bb19e922b79c.jpg"
        },
        {
            user: "Aze:3",
            text: "La pelicula inicia algo lenta, pero se pone mejor después de la segunda mitad.",
            rating: 2,
            photo: "https://img.freepik.com/foto-gratis/vista-frontal-concepto-perro-lindo-divertido_23-2148786513.jpg"
        }
    ];

    const renderStars = (count) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span key={i} className={i < count ? "star-filled" : "star-empty"}>
                    ★
                </span>
            );
        }
        return stars;
    };

    const [likedReviews, setLikedReviews] = useState([false, false, false]);

    const toggleLike = (index) => {
        const newLikes = [...likedReviews];
        newLikes[index] = !newLikes[index];
        setLikedReviews(newLikes);
    };

    return (
        <div className="home-container">
            <Navbar2 />
            <div className="detalle-container">
                <div className="detalle-contenido">
                    <div className="detalle-imagen-wrapper">
                        <img src={movie.image} alt={movie.title} className="detalle-imagen" />
                    </div>
                    <div className="detalle-info">
                        <h1>{movie.title}</h1>
                        <p><span className="label">Género:   </span> {movie.genre}</p>
                        <p><span className="label">Duración:   </span> {movie.duration}</p>
                        <p><span className="label">Año:   </span> {movie.year}</p>
                        <p><span className="label">Calificación:   </span> {renderStars(movie.rating)}</p>
                    </div>
                </div>

                <div className="detalle-sinopsis">
                    <h2>Sinopsis:</h2>
                    <p>{movie.synopsis}</p>
                </div>


                <div className="detalle-top">
                    <h3>Reseñas</h3>

                    <button className="detalle-btn" onClick={() => nav("/create-review")}>
                        Nueva reseña
                    </button>
                </div>

                <div className="detalle-reseñas">
                    {dummyReviews.map((review, index) => (
                        <div className="reseña-wrapper" key={index}>
                            <span className="reseña-usuario">{review.user}</span>
                            <div className="reseña-exterior">
                                <img src={review.photo} alt="usuario" className="reseña-foto" />
                                <div className="reseña-item">
                                    <div className="reseña-cuerpo">
                                        <p>"{review.text}"</p>
                                        <div className="reseña-estrellas">{renderStars(review.rating)}</div>
                                    </div>
                                </div>
                                <button className="reseña-like" onClick={() => toggleLike(index)}>
                                    {likedReviews[index] ? <FaThumbsUp color="#007bff" /> : <FaRegThumbsUp color="#aaa" />}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>


            </div>

        </div>
    );
}
