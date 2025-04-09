import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar2 from "./navbar";
import "./css/usersList.css";
import PopUp2 from "./PopUp2";
import PopUp1 from "./PopUp1";

function CategoriesList() {
    const [categories, setCategories] = useState([]);
    const [show, setShow] = useState(false);//para la eliminacion
    const [show2, setShow2] = useState(false); //para la creacion
    const [categoryDelete, setCategoryDelete] = useState(null);
    const [categoryCreate, setCategoryCreate] = useState(false);

    const [categoryName, setCategoryName] = useState("");
    const [categoryDesc, setCategoryDesc] = useState("");

    const [warn, setWarn] = useState('');


    function handleCategoryName(e) {
        let value = e.target.value;
        setCategoryName(value);
    }

    function handleCategoryDesc(e) {
        let value = e.target.value;
        setCategoryDesc(value);
    }

    function validate() {

        if (categoryDesc.length > 200) {
            setWarn("la descripcion del género no puede sobrepasar los 200 caracteres");
            setShow2(true);
            return false;
        }

        if (categoryDesc.length < 3) {
            setWarn("la descripcion del género no puede ser menor a los 3 caracteres");
            setShow2(true);
            return false;
        }

        if (categoryName.length > 20) {
            setWarn("El nombre del género no puede tener más de 20 caracteres");
            setShow2(true);
            return false;
        }

        if (categoryName.length < 3) {
            setWarn("El nombre del género no puede tener menos de 3 caracteres");
            setShow2(true);
            return false;
        }

        return true;
    }

    function createCategory(e) {
        e.preventDefault();
        console.log(categoryName, categoryDesc);
        setCategoryCreate(true);

        if (!validate()) return;

        setWarn('Creada correctamente');
        setShow2(true);
        //peticion para guardarla
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
        setCategoryDelete(id);
        setShow(true);
    }

    function deleteCategory(id) {

        setCategories(categories.filter(user => user.id !== id));
        //peticion al servidor
    }

    useEffect(() => {
        if (categoryCreate) {
            setCategoryCreate(false);
            return;
        }
        dummy();
    }, [categoryCreate,]);

    return (
        <div>
            <Navbar2 />

            <PopUp2
                title='ADVERTENCIA'
                text={`Seguro que quieres eliminar la categoría con el id: ${categoryDelete}`}
                show={show}
                onClose={() => { setShow(false) }}
                onAccept={() => { deleteCategory(categoryDelete) }} >
            </PopUp2>

            <PopUp1
                title='ADVERTENCIA'
                text={warn}
                show={show2}
                onClose={() => { setShow2(false) }}>
            </PopUp1>
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
                        <form style={{ width: "80%", marginBottom: "5vh" }} onSubmit={(e) => { createCategory(e) }}>
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
