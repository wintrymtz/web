import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar2 from "./navbar";
import "./css/usersList.css";

function UsersList() {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [userDelete, setUserDelete] = useState(null);

    function dummy() {
        setUsers([
            { id: "1", user: "wintry", name: "jaime" },
            { id: "2", user: "wintry2", name: "jaime2" },
            { id: "3", user: "wintry3", name: "jaime3" },
            { id: "4", user: "wintry4", name: "jaime4" },
            { id: "5", user: "wintry5", name: "jaime5" },
        ]);
    }

    function handleDeleteUser(id) {
        setUserDelete(id);
        setShow(true);
    }

    function deleteUser(id) {

        setUsers(users.filter(user => user.id !== id));
        //peticion al servidor
    }

    useEffect(() => {
        dummy();
    }, []);

    return (
        <div>
            {/* Modal con React Bootstrap */}
            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: "black" }}>¿Está seguro de eliminar este usuario?</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ color: "black" }}><p>Esta accion no se puede revertir</p></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Cancelar</Button>
                    <Button variant="danger" onClick={() => { setShow(false); deleteUser(userDelete); }}>Eliminar</Button>
                </Modal.Footer>
            </Modal>

            <Navbar2 />
            <div className="hero" style={{ height: "100%" }}>
                <div style={{ height: "1000px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div className="wContainer-1">
                        <h1 style={{ marginBottom: "10px", paddingTop: "30px" }}>Usuarios registrados</h1>
                        <hr className="wLine-1"></hr>
                        <table className="wTable">
                            <thead>
                                <tr className="wThead">
                                    <th scope="col">#id</th>
                                    <th scope="col">Usuario</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody id="users-table">
                                {users.map((user) => (
                                    <tr className="wRow" key={user.id}>
                                        <td style={{ textAlign: "center" }}>{user.id}</td>
                                        <td>{user.user}</td>
                                        <td>{user.name}</td>
                                        <td className="wDelete">
                                            <Button variant="danger" onClick={() => { handleDeleteUser(user.id); }}>Eliminar</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default UsersList;
