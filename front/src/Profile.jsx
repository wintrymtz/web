import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar2 from "./navbar";
import "./css/usersList.css";
import PopUp1 from "./PopUp1";
import Footer from "./Footer";
import axios from "axios";

function Profile() {
    const [user, setUser] = useState([]);
    const [isSet, setIsSet] = useState(false);
    const [show, setShow] = useState(false);
    const [warn, setWarn] = useState('');

    const [image, setImage] = useState('');

    function dummy() {
        setUser(
            { userID: localStorage.getItem('userID'), userUsername: "wintry", userName: "jaime", userLastname: 'miau', email: 'asdsad@', photo: localStorage.getItem('userPhoto') }
        );
    }

    function requestGetUser(id) {
        axios.get(`http://localhost:3001/user/${id}`)
            .then((res) => {
                setUser(res.data.user)
                console.log('(server)', res.data.user)
            }).catch((err) => {
                console.log('(error)', err.response.data.msg)
            })
    }

    function requestUpdateUser(formData) {
        axios.patch("http://localhost:3001/user/update", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }).then((res) => {
            console.log("(server)", res.data.msg);
            setWarn("Usuario actualizado correctamente");
            setShow(true);
        }).catch((err) => {
            console.log("(server)", err.response.data.msg);
            setWarn("Error al actualizar");
            setShow(true);
        });
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

        if (!user.userName.trim() || !user.userLastname.trim() || !user.email.trim() || !user.userUsername.trim() || !user.photo) {
            setWarn("Todos los campos deben llenarse.");
            setShow(true);
            return false;
        }

        if (!nameRegex.test(user.userName) || !nameRegex.test(user.userLastname)) {
            setWarn("Nombre inválido, los nombres y apellidos solo pueden contener letras y espacios.");
            setShow(true);
            return false;
        }

        if (!emailRegex.test(user.email)) {
            setWarn("Favor de introducir un correo electrónico válido");
            setShow(true);
            return false;
        }

        if (!usernameRegex.test(user.userUsername)) {
            setWarn("El nombre de usuario no puede contener espacios");
            setShow(true);
            return false;
        }

        return true;
    }

    const update = () => {

        if (!validate()) return;

        const formData = new FormData();
        formData.append('id', user.userID);
        formData.append('username', user.userUsername);
        formData.append('email', user.email);
        formData.append('firstName', user.userName);
        formData.append('lastName', user.userLastname);
        formData.append('oldImage', user.photo)

        if (user.image) {
            formData.append('image', user.image);
        } else formData.append('image', null);
        //peticion para update
        requestUpdateUser(formData);
    }

    useEffect(() => {
        // dummy();
        requestGetUser(localStorage.getItem('userID'));

    }, []);

    useEffect(() => {
        if (!isSet) {
            if (user.length < 1) {
                return;
            }
            setIsSet(true);

            console.log(user);
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
                            <img id="image" alt="imagen de perfil" src={user.photo === null ? "https://i.pinimg.com/736x/c3/a0/37/c3a037cccfcb72122a41db7ac808e4c7.jpg" : `data:image/png;base64,${user.photo}`} style={{ width: "200px", borderRadius: "50%", margin: "3vh" }}></img>
                            <div className="input-group custom-file-upload" style={{ width: "50%", textAlign: "center" }}>
                                <label htmlFor="imageInput">Imagen de perfil</label>
                                <input type="file" className="custom-file-upload" id="imageInput" name="image" accept="image/*" onChange={handleImage} style={{ display: "none" }} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="nombre">Nombre(s)</label>
                                <input value={user.userName} type="text" id="firstName" name="userName" onChange={handleChange} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="apellidos">Apellidos</label>
                                <input value={user.userLastname} type="text" id="lastName" name="userLastname" onChange={handleChange} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="correo">Correo Electrónico</label>
                                <input value={user.email} type="email" id="email" name="email" onChange={handleChange} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="usuario">Nombre de Usuario</label>
                                <input value={user.userUsername} type="text" id="username" name="userUsername" onChange={handleChange} />
                            </div>
                            <div className="button-group">
                                <button type="submit" className="accept-button" style={{ width: "50%", marginBottom: "5vh" }} onClick={update}>Aceptar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
}

export default Profile;
