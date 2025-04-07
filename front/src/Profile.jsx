import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar2 from "./navbar";
import "./css/usersList.css";

function Profile() {
    const [user, setUser] = useState([]);
    const [isSet, setIsSet] = useState(false);

    function dummy() {
        setUser(
            { username: "wintry", firstName: "jaime", lastName: 'miau', email: 'asdsad@' }
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

    const update = () => {

        console.log(user);
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
            <div className="hero" style={{ height: "100%" }}>
                <div style={{ height: "1000px", display: "flex", flexDirection: "column", alignItems: "center", }}>
                    <div className="wContainer-1">
                        <h1 style={{ marginBottom: "10px", paddingTop: "0px" }}>Perfil</h1>
                        <hr className="wLine-1"></hr>
                        <form onSubmit={(e) => { e.preventDefault() }}>
                            <img id="image" alt="imagen de perfil" src="https://i.pinimg.com/736x/c3/a0/37/c3a037cccfcb72122a41db7ac808e4c7.jpg" style={{ width: "200px", borderRadius: "50%", margin: "3vh" }}></img>
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
                    {/* <div className="wContainer-1">
                        <h1>hola</h1>
                        <h1>hola</h1>
                        <h1>hola</h1>
                        <h1>hola</h1>
                        <h1>hola</h1>
                        <h1>hola</h1>
                    </div> */}
                </div>
            </div>
        </div >
    );
}

export default Profile;
