import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./css/navbar.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar2() {
    const nav = useNavigate();
    const [search, setSearch] = useState();
    const [image, setIamge] = useState('');
    const [userType, setUserType] = useState('');

    useEffect(() => {
        setIamge(localStorage.getItem('userPhoto'));
        setUserType(localStorage.getItem('userType'));
        console.log(localStorage.getItem('userPhoto'));
        // setUserType('1'); /// adminnistrador opciones (1 -> admin)
    }, [])
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        console.log(image);
    }, [image])
    return (
        <nav data-bs-theme="dark" class="navbar navbar-expand-lg" style={{ backgroundColor: "#181818" }}>
            <div className="container-fluid">
                <a className="navbar-brand" href="/" style={{ color: "#a855f7" }}>MY SUMMARY</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        {/* <li class="nav-item">
                            <a class="nav-link" href="/">Favoritos</a>
                        </li> */}
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Favoritos
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/movies-fav">Películas</a></li>
                                <li><a class="dropdown-item" href="/reviews-fav">Reseñas</a></li>
                                <li><hr class="dropdown-divider" /></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Géneros
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/search/Aventura">Aventura</a></li>
                                <li><a class="dropdown-item" href="/search/Terror">Terror</a></li>
                                {/* <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li> */}
                            </ul>
                        </li>
                        {(userType === '1' &&
                            < li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="Admin-options" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Administrador
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/users-list">Lista de usuarios</a></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><a class="dropdown-item" href="genres-list">Lista de géneros</a></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><a class="dropdown-item" href="/create-movie">Crear Pelicula</a></li>
                                    {/* <li><hr class="dropdown-divider" /></li>
                                    <li><a class="dropdown-item" href="/create-review">Crear Reseña</a></li> */}
                                </ul>
                            </li>
                        )}
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/login">{image === null ? 'Inicio sesión' : 'Cerrar sesión'}</a>
                        </li>
                    </ul>
                    <form class="d-flex" role="search" onSubmit={(e) => { nav(`/search/${search}`) }}>
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => handleSearch(e)} />
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>

                    <a href={image === null ? "/login" : "/profile"}><img alt="profile-image" style={{ borderRadius: "50%", width: "50px", marginLeft: "50px" }} src={image === null || image === "" ? "https://i.pinimg.com/736x/3c/ae/07/3cae079ca0b9e55ec6bfc1b358c9b1e2.jpg" : `data:image/png;base64,${image}`}></img></a>

                </div>
            </div>
        </nav >
    );
}
export default Navbar2;