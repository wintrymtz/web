import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar2 from "./navbar";
import "./css/usersList.css";
import PopUp2 from "./PopUp2";
import PopUp1 from "./PopUp1";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UsersList() {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [userDelete, setUserDelete] = useState(null);
    const nav = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('userID')) {
            nav('/');
        }

        if (localStorage.getItem('userType') === '0') {
            nav('/');
        }
    }, [nav])

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

        //peticion al servidor
        axios.delete(`http://localhost:3001/user/delete/${id}`)
            .then((res) => {
                console.log("(server)", res.data.msg);
                setUsers(users.filter(user => user.userID !== id));
            }).catch((err) => {
                console.log('(error)', err.response.data.msg)
            })
    }

    useEffect(() => {
        requestGetUsers();
    }, [users]);

    function requestGetUsers() {
        axios.get("http://localhost:3001/user/list")
            .then((res) => {
                setUsers(res.data.users)
                // console.log(res.data.users)
            }).catch((err) => {
                console.log('(error)', err.response.data.msg)
            })
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
                                    <tr className="wRow" key={user.userID}>
                                        <td style={{ textAlign: "center" }}>{user.userID}</td>
                                        <td>{user.userUsername}</td>
                                        <td>{user.userName}</td>
                                        <td className="wDelete">
                                            <Button variant="danger" onClick={() => { handleDeleteUser(user.userID); }}>Eliminar</Button>
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
