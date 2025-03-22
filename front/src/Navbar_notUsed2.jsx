
function Navbar() {
    return (<div className="navbar">
        <div className="logo">MOVIE SUMMARY</div>
        <ul className="nav-links">
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Géneros</a></li>
        </ul>
        <div className="auth-buttons">
            <a href="/login">Iniciar Sesión</a>
            <a href="/register">Registrarse</a>
        </div>
    </div>);
}
export default Navbar;