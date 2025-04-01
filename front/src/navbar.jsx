import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./css/navbar.css";

function Navbar2() {
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
                        <li class="nav-item">
                            <a class="nav-link" href="/">Favoritos</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Favoritos
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/">Películas</a></li>
                                <li><a class="dropdown-item" href="/">Reseñas</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" href="/">Something else here</a></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Géneros
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/">Aventura</a></li>
                                <li><a class="dropdown-item" href="/">Terror</a></li>
                                {/* <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li> */}
                            </ul>
                        </li>

                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="Admin-options" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Administrador
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/users-list">Lista de usuarios</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" href="genres-list">Lista de géneros</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" href="/Crear-Pelicula">Crear Pelicula</a></li>
                            </ul>
                        </li>
                    </ul>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>

                    <a href="/profile"><img alt="profile-image" style={{ borderRadius: "50%", width: "50px", marginLeft: "50px" }} src="https://i.pinimg.com/736x/c3/a0/37/c3a037cccfcb72122a41db7ac808e4c7.jpg"></img></a>
                </div>
            </div>
        </nav>
    );
}
export default Navbar2;