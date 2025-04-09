import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./css/CrearReseña.css";

const CrearReseña = ({ onClose }) => {
  const [textoReseña, setTextoReseña] = useState("");
  const [calificacion, setCalificacion] = useState(0);
  const [hover, setHover] = useState(0);
  const [error, setError] = useState("");

  const handleGuardar = () => {
    if (textoReseña.trim().length < 15) {
      setError("La reseña debe tener al menos 15 caracteres.");
      return;
    }
    if (calificacion === 0) {
      setError("Debes seleccionar una calificación.");
      return;
    }

    console.log("Reseña:", textoReseña);
    console.log("Calificación:", calificacion);

    setError("");
    setTextoReseña("");
    setCalificacion(0);
    onClose(); // Cierra el popup
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

///////////////////////////////////////////////////////////////////////////////////////

// const CrearReseña = () => {
//     const [liked, setLiked] = useState(false);
//     const [starred, setStarred] = useState(false);
  
//     return (
//       <div className="crear-reseña-container">
//         <h2>Reseñas</h2>
//         <button className="nueva-reseña-btn">Nueva reseña</button>
//         <div className="reseña-card">
//           <div className="avatar"></div>
//           <div className="reseña-content"></div>
//           <div className="icons">
//             <span 
//               className={`icon ${starred ? "active" : ""}`} 
//               onClick={() => setStarred(!starred)}
//             >
//               ⭐
//             </span>
//             <span 
//               className={`icon ${liked ? "active" : ""}`} 
//               onClick={() => setLiked(!liked)}
//             >
//               👍
//             </span>
//           </div>
//         </div>
//         <div className="divider">
//           <hr />
//           <div className="arrow">▼</div>
//           <hr />
//         </div>
//         <div className="respuesta">
//           <div className="avatar pequeño"></div>
//           <div className="respuesta-content"></div>
//         </div>
//       </div>
//     );
//   };
  
//   export default CrearReseña;