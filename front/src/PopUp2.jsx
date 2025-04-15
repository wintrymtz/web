import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./css/Modal.css";


function PopUp2({ title, text, show, onClose, onAccept }) {

    return (
        <Modal show={show} onHide={onClose} centered className="my-modal">
            <Modal.Header closeButton >
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body><p>{text}</p></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cancelar</Button>
                <Button variant="danger" onClick={() => { onAccept(); onClose() }}>Eliminar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PopUp2;