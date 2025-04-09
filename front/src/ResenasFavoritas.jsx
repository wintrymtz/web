import React, { useState } from "react";
import Navbar2 from "./navbar";
import { useNavigate } from "react-router-dom";
import { FaThumbsUp, FaStar } from "react-icons/fa";
import "./css/ResenasFavoritas.css";

const ResenasFavoritas = () => {
    const [favorites, setFavorites] = useState([
        {
            id: 1,
            user: "Aze:3",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUna5_Y3oEfOK7TY-r5eaApMrcoMQma5mGVw&s",
            review: "Una de las mejores películas que he visto.",
            rating: 4
        },
        {
            id: 2,
            user: "WintryAuthor281",
            image: "https://d37chgxb0qq7wb.cloudfront.net/i/5dbcc982-d271-11e0-b746-0019b9fdfdec.jpg",
            review: "No me gustó.",
            rating: 0
        },
        {
            id: 3,
            user: "Memorandum0406",
            image: "https://i.pinimg.com/236x/d1/89/f0/d189f0c43e8d75b471ccef897db5b1fd.jpg",
            review: "Es muy mal pelicula, pero es entretenida de ver",
            rating: 1
        },
        {
            id: 4,
            user: "Antón Ego",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdbHOt60Y1jN2BLVjVPjfkGgPauPQZcUIMNQ&s",
            review: "La vida de un crítico es sencilla en muchos aspectos. Arriesgamos poco y tenemos poder sobre aquellos que ofrecen su trabajo y su servicio a nuestro juicio. Prosperamos con las críticas negativas, divertidas de escribir y de leer.",
            rating: 5
        },
        {
            id: 5,
            user: "Roger Zapata",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRIevkHgrSIK_4Uvb89gRAO0ncp33FCIUlvA&s",
            review: "No está mal para ser un remake, pero no es tan buena como la original.",
            rating: 3
        }
    ]);

    const [deleteReview, setDeleteReview] = useState(null);
    const navigate = useNavigate();

    const toggleFavorita = (id) => {
        setFavorites(favorites.filter(p => p.id !== id));
        setDeleteReview(null);
    };

    return (
        <div className="favoritas-container">
          <Navbar2 />

          <h1>Tus Reseñas Favoritas</h1>
          <br />

          <div className="favoritas-grid">
            {favorites.map((review) => (
              <div key={review.id} className="favorita-wrapper">
                
                <h3 className="favorita-username">{review.user}</h3>
            
                <div className="favorita-layout">
                  
                  <div className="favorita-avatar">
                    <img src={review.image} alt={review.user} className="favorita-img" />
                  </div>
            
                  <div className="favorita-card">
                    <div className="favorita-texto">
                      <p>{review.review}</p>
                      <h5 className="favorita-estrellas">Calificación:</h5>
                      <div className="favorita-estrellas">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} color={i < review.rating ? "gold" : "white"} size={24}/>
                        ))}
                      </div>
                    </div>
                  </div>
                    
                  <button className="favorita-star" onClick={(e) => { setDeleteReview(review.id); }}>
                    <FaThumbsUp size={36} />
                  </button>
                </div>
                
                {/* Popup de confirmación */}
                {deleteReview === review.id && (
                  <div className="confirmacion-popup">

                    <p>¿Quitar de favoritos?</p>

                    <div className="confirmacion-botones">
                      <button onClick={() => toggleFavorita(review.id)}>Sí</button>
                      <button onClick={() => setDeleteReview(null)}>No</button>
                    </div>
                    
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

    );
};

export default ResenasFavoritas;
