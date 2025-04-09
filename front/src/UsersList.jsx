import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar2 from "./navbar";
import "./css/usersList.css";
import PopUp2 from "./PopUp2";
import PopUp1 from "./PopUp1";

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

    useEffect(() => {
        console.log("showUsers", show);
    }, [show])

    function deleteUser(id) {

        setUsers(users.filter(user => user.id !== id));
        //peticion al servidor
    }

    useEffect(() => {
        dummy();
    }, []);

    function falseShow() {
        console.log('uwu');
    }

    return (
        <div>
            <PopUp2
                title='ADVERTENCIA'
                text={`Seguro que quieres eliminar al usuario con el id: ${userDelete}`}
                show={show}
                onClose={() => { setShow(false) }}
                onAccept={() => { deleteUser(userDelete) }} >
            </PopUp2>
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
