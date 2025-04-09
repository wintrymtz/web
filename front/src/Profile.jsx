import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar2 from "./navbar";
import "./css/usersList.css";
import PopUp1 from "./PopUp1";

function Profile() {
    const [user, setUser] = useState([]);
    const [isSet, setIsSet] = useState(false);
    const [show, setShow] = useState(false);
    const [warn, setWarn] = useState('');

    const [image, setImage] = useState('');

    function dummy() {
        setUser(
            { username: "wintry", firstName: "jaime", lastName: 'miau', email: 'asdsad@', image: localStorage.getItem('userPhoto') }
        );
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            const url = URL.createObjectURL(file);
            document.getElementById('image').src = url;
            setUser({ ...user, 'image': file });
        }
    }

    function validate() {

        const nameRegex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ ]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^\S+$/;

        if (!user.firstName.trim() || !user.lastName.trim() || !user.email.trim() || !user.username.trim() || !user.image) {
            setWarn("Todos los campos deben llenarse.");
            setShow(true);
            return false;
        }

        if (!nameRegex.test(user.firstName) || !nameRegex.test(user.lastName)) {
            setWarn("Nombre inválido, los nombres y apellidos solo pueden contener letras y espacios.");
            setShow(true);
            return false;
        }

        if (!emailRegex.test(user.email)) {
            setWarn("Favor de introducir un correo electrónico válido");
            setShow(true);
            return false;
        }

        if (!usernameRegex.test(user.username)) {
            setWarn("El nombre de usuario no puede contener espacios");
            setShow(true);
            return false;
        }

        return true;
    }

    const update = () => {

        if (!validate()) return;
        console.log(user);

        //peticion para update
        setWarn('Datos actualizados correctamente');
        setShow(true);
    }

    useEffect(() => {
        dummy();
    }, []);

    useEffect(() => {
        if (!isSet) {
            if (user.length < 1) {
                return;
            }
            document.getElementById('firstName').value = user.firstName;
            document.getElementById('username').value = user.username;
            document.getElementById('lastName').value = user.lastName;
            document.getElementById('email').value = user.email;
            console.log(user);
            setIsSet(true);
        }
    }, [user]);

    return (
        <div>
            <Navbar2 />
            <PopUp1
                title='ADVERTENCIA'
                text={warn}
                show={show}
                onClose={() => { setShow(false) }}>
            </PopUp1>
            <div className="hero" style={{ height: "100%" }}>
                <div style={{ height: "1000px", display: "flex", flexDirection: "column", alignItems: "center", }}>
                    <div className="wContainer-1">
                        <h1 style={{ marginBottom: "10px", paddingTop: "0px" }}>Perfil</h1>
                        <hr className="wLine-1"></hr>
                        <form onSubmit={(e) => { e.preventDefault() }}>
                            <img id="image" alt="imagen de perfil" src={user.image === null ? "https://i.pinimg.com/736x/c3/a0/37/c3a037cccfcb72122a41db7ac808e4c7.jpg" : `data:image/png;base64,${user.image}`} style={{ width: "200px", borderRadius: "50%", margin: "3vh" }}></img>
                            <div className="input-group custom-file-upload" style={{ width: "50%", textAlign: "center" }}>
                                <label htmlFor="imageInput">Imagen de perfil</label>
                                <input type="file" className="custom-file-upload" id="imageInput" name="image" accept="image/*" onChange={handleImage} style={{ display: "none" }} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="nombre">Nombre(s)</label>
                                <input type="text" id="firstName" name="firstName" value={user.firstName} onChange={handleChange} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="apellidos">Apellidos</label>
                                <input type="text" id="lastName" name="lastName" value={user.lastName} onChange={handleChange} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="correo">Correo Electrónico</label>
                                <input type="email" id="email" name="email" value={user.email} onChange={handleChange} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="usuario">Nombre de Usuario</label>
                                <input type="text" id="username" name="username" value={user.username} onChange={handleChange} />
                            </div>
                            <div className="button-group">
                                <button type="submit" className="accept-button" style={{ width: "50%", marginBottom: "5vh" }} onClick={update}>Aceptar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Profile;
