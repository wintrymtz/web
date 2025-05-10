import "./css/Home.css"; // Importamos el CSS
import { useNavigate } from "react-router-dom";

function StarRating({ rating }) {
  const stars = [];
  const filledStars = Math.floor(rating);
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} style={{ color: i <= filledStars ? "#ffd700" : "#ccc" }}>★</span>
    );
  }
  return <div className="star-ratingHome">{stars}</div>;
}

function MovieCard({ title, image, description, calif, year }) {

  const navigate = useNavigate();
  // const numericRating = parseFloat(calif.split("/")[0]) / 2;
  const numericRating = parseFloat(calif / 2);

  const handleClick = () => {
    navigate("/details");
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <StarRating rating={numericRating} />
      <p>{description}</p>
      <p>{`Año: ${year}`}</p>
    </div>);
}

export default MovieCard;