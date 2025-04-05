// import React from "react";
// import "./CrearReseña.css";

import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
// import Navbar2 from "./navbar";
import "./css/CrearReseña.css";

const CrearReseña = () => {
    const [liked, setLiked] = useState(false);
    const [starred, setStarred] = useState(false);
  
    return (
      <div className="crear-reseña-container">
        <h2>Reseñas</h2>
        <button className="nueva-reseña-btn">Nueva reseña</button>
        <div className="reseña-card">
          <div className="avatar"></div>
          <div className="reseña-content"></div>
          <div className="icons">
            <span 
              className={`icon ${starred ? "active" : ""}`} 
              onClick={() => setStarred(!starred)}
            >
              ⭐
            </span>
            <span 
              className={`icon ${liked ? "active" : ""}`} 
              onClick={() => setLiked(!liked)}
            >
              👍
            </span>
          </div>
        </div>
        <div className="divider">
          <hr />
          <div className="arrow">▼</div>
          <hr />
        </div>
        <div className="respuesta">
          <div className="avatar pequeño"></div>
          <div className="respuesta-content"></div>
        </div>
      </div>
    );
  };
  
  export default CrearReseña;