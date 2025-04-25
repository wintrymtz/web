import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./css/CrearReseña.css";
import axios from "axios";

const CrearReseña = ({ onClose, movieID, onReviewSaved }) => {
  const [textoReseña, setTextoReseña] = useState("");
  const [calificacion, setCalificacion] = useState(0);
  const [hover, setHover] = useState(0);
  const [error, setError] = useState("");

  const handleGuardar = async () => {
    if (textoReseña.trim().length < 15) {
      setError("La reseña debe tener al menos 15 carácteres.");
      return;
    }

    const userID = parseInt(localStorage.getItem("userID"));

    try {
      await axios.post("http://localhost:3001/reviews/createReview", {
        descReview: textoReseña,
        rating: (calificacion*2),
        userID,
        movieID
      });

      onReviewSaved(); 
      onClose();       
    } catch (error) {
      console.error("Error al guardar la reseña:", error);
      setError("Ocurrió un error al guardar la reseña.");
    }
    
    // setError("");
    // setTextoReseña("");
    // setCalificacion(0);
    // onClose();
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton className="modalReviewCreate">
        <Modal.Title>Nueva Reseña</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalReviewCreate">
        <textarea
          placeholder="Escribe tu reseña..."
          value={textoReseña}
          onChange={(e) => setTextoReseña(e.target.value)}
        />
        <div className="popup-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={
                star <= (hover || calificacion)
                  ? "popup-star filled"
                  : "popup-star"
              }
              onClick={() => setCalificacion(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          ))}
        </div>
        {error && <p className="error">{error}</p>}
      </Modal.Body>
      <Modal.Footer className="modalReviewCreate">
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleGuardar}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CrearReseña;
