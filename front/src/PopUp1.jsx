import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./css/Modal.css";


function PopUp1({ title, text, show, onClose }) {

    return (
        <Modal show={show} onHide={onClose} centered className="my-modal">
            <Modal.Header closeButton >
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body><p>{text}</p></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Okay</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PopUp1;