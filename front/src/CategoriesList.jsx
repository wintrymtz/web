import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar2 from "./Navbar";
import "./css/usersList.css";

function CategoriesList() {
    const [categories, setCategories] = useState([]);
    const [show, setShow] = useState(false);
    const [userDelete, setUserDelete] = useState(null);
    const [categoryCreate, setCategoryCreate] = useState(false);

    const [categoryName, setCategoryName] = useState("");
    const [categoryDesc, setCategoryDesc] = useState("");


    function handleCategoryName(e) {
        let value = e.target.value;

        // if (value.length > 10) {
        //     alert("El nombre del género no puede tener más de 10 caracteres");
        //     return;
        // }
        // if (value.length < 3) {
        //     alert("El nombre del género no puede tener menos de 3 caracteres");
        //     return;
        // }

        setCategoryName(value);
    }

    function handleCategoryDesc(e) {
        let value = e.target.value;

        // if (value.length > 10) {
        //     alert("El nombre del género no puede tener más de 10 caracteres");
        //     return;
        // }
        // if (value.length < 3) {
        //     alert("El nombre del género no puede tener menos de 3 caracteres");
        //     return;
        // }

        setCategoryDesc(value);
    }

    function dummy() {
        setCategories([
            { id: "1", category: "horror", desc: "desc1" },
            { id: "2", category: "comedy", desc: "desc2" },
            { id: "3", category: "fiction", desc: "desc3" },
            { id: "4", category: "war", desc: "desc4" },
            { id: "5", category: "mistery", desc: "desc5" },
        ]);
    }

    function handleDeleteUser(id) {
        setUserDelete(id);
        setShow(true);
    }

    function createCategory(e) {
        e.preventDefault();
        console.log(categoryName, categoryDesc);
        setCategoryCreate(true);

        document.getElementById("categoryDescInput").value = "";
        document.getElementById("categoryNameInput").value = "";

        //peticion para guardarla
    }

    function deleteUser(id) {

        setCategories(categories.filter(user => user.id !== id));
        //peticion al servidor
    }

    useEffect(() => {
        if (categoryCreate) {
            setCategoryCreate(false);
            return;
        }

        dummy();
        console.log("recargando");
    }, [categoryCreate,]);

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
                <div style={{ height: "1400px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div className="wContainer-1">
                        <h1 style={{ marginBottom: "10px", paddingTop: "0px" }}>Categorías</h1>
                        <hr className="wLine-1"></hr>
                        <table className="wTable">
                            <thead>
                                <tr className="wThead">
                                    <th scope="col">#id</th>
                                    <th scope="col">Categoría</th>
                                    <th scope="col">Descripción</th>
                                    <th scope="col">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody id="users-table">
                                {categories.map((user) => (
                                    <tr className="wRow" key={user.id}>
                                        <td style={{ textAlign: "center" }}>{user.id}</td>
                                        <td>{user.category}</td>
                                        <td>{user.desc}</td>
                                        <td className="wDelete">
                                            <Button variant="danger" onClick={() => { handleDeleteUser(user.id); }}>Eliminar</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="wContainer-1" style={{ textAlign: "left" }}>
                        <h1>Nueva Categoría</h1>
                        <hr className="wLine-1"></hr>
                        <form style={{ width: "80%", marginBottom: "5vh" }} onSubmit={(e) => { createCategory(e, "") }}>
                            <div className="form-group wForm">
                                <label for="exampleFormControlInput1">Nombre de la categoría</label>
                                <input type="text" className="form-control" id="categoryNameInput" placeholder="terror..." onChange={(e) => handleCategoryName(e)} />
                            </div>
                            <div className="form-group wForm">
                                <label for="exampleFormControlTextarea1">Descripción</label>
                                <textarea className="form-control" id="categoryDescInput" rows="3" onChange={(e) => handleCategoryDesc(e)}></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary mb-2">Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default CategoriesList;
