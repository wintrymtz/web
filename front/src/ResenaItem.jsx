import React from "react";
import { FaThumbsUp, FaStar } from "react-icons/fa";
import "./css/ResenasFavoritas.css";

const ResenaItem = ({ review, onClick, onLikeClick }) => {
  return (
    <>
      <br></br>
      <h3 className="favorita-username">{review.user}</h3>
      <div className="favorita-layout">
        <div className="favorita-avatar">
          <img src={`data:image/png;base64,${review.image}`} alt={review.user} className="favorita-img" />
        </div>

        <div className="favorita-card" onClick={onClick}>
          <div className="favorita-texto">
            <p>{review.review}</p>
            <h5 className="favorita-estrellas">Calificación:</h5>
            <div className="favorita-estrellas">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} color={i < (review.rating / 2) ? "gold" : "white"} size={24} />
              ))}
            </div>
          </div>
        </div>

        <button className="favorita-star" onClick={onLikeClick}>
          <FaThumbsUp size={50} />
        </button>
      </div>
    </>
  );
};

export default ResenaItem;
