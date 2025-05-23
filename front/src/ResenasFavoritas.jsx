import React, { useEffect, useState } from "react";
import Navbar2 from "./navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ResenaItem from "./ResenaItem";
import "./css/ResenasFavoritas.css";

const ResenasFavoritas = () => {
  const [resenas, setResenas] = useState([]);
  const [deleteReview, setDeleteReview] = useState(null);
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    if (!localStorage.getItem('userID')) {
      navigate('/');
    }
  }, [navigate])

  useEffect(() => {
    if (!userID) return;
    axios
      .get(`http://localhost:3001/reviews/favReviewsList/${userID}`)
      .then((res) => setResenas(res.data))
      .catch((err) => console.error(err));
  }, [userID]);

  const handleEliminar = (reviewID) => {
    axios
      .delete(`http://localhost:3001/userreviews/favReviewsDelete/${userID}/${reviewID}`)
      .then(() => {
        setResenas(resenas.filter((r) => r.reviewID !== reviewID));
        setDeleteReview(null);
      })
      .catch((err) => console.error(err));
  };

  const irADetalle = (movieID) => {
    navigate(`/details?id=${movieID}`);
  };

  return (
    <div className="favoritas-container3">
      <Navbar2 />
      <br /><br />
      <h1>Tus Reseñas Favoritas</h1>
      <br />
      <div className="favoritas-grid">
        {resenas.map((review) => (
          <div key={review.reviewID} className="favorita-wrapper">
            <ResenaItem
              review={review}
              isLiked={true}
              onClick={() => irADetalle(review.movieID)}
              onLikeClick={() => setDeleteReview(review.reviewID)}
            />

            {deleteReview === review.reviewID && (
              <div className="confirmacion-popup">
                <p>¿Quitar de favoritos?</p>
                <div className="confirmacion-botones">
                  <button onClick={() => handleEliminar(review.reviewID)}>Sí</button>
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
