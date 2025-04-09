import "./css/Home.css"; // Importamos el CSS

function MovieCard({ title, image, description, calif, year }) {

    return (<div className="movie-card">
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{`calif: ${calif}`}</p>
        <p>{`year: ${year}`}</p>
    </div>);
}

export default MovieCard;