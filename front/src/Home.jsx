import "./css/Home.css";
import Navbar2 from "./navbar";
import Footer from "./Footer";
import MovieCard from "./MovieCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";


const MoviesGrid = ({ movies }) => {
  const navigate = useNavigate();

  return (
    <div className="movies-grid">
      {movies.map((movie) => (

        <div className="movie-card" key={movie.movieID} onClick={() => navigate(`/details?id=${movie.movieID}`)}>
          <img src={`data:image/png;base64,${movie.poster}`} alt={movie.movieName} className="movie-image"/>
          <div className="movie-info">
            <h3>{movie.movieName}</h3>
            <p><strong>Año:</strong> {movie.yearPremiere}</p>
            <p><strong>Calificación:</strong></p>
            <div className="movie-stars">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  color={i < (movie.rating / 2) ? "gold" : "white"}
                  size={18}
                />
              ))}
            </div>

            <p>{movie.synopsis}</p>

          </div>
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3001/movies/topRated");
        setTopMovies(response.data.movies);
      } catch (error) {
        console.error("Error al obtener las mejores películas:", error);
      }
    };

    fetchTopMovies();
  }, []);

  return (
    <div className="home-container">
      <Navbar2 />
      
      <div className="hero">
        <h1>Explora las mejores películas</h1>
        <p>¡Sumérgete en resúmenes, calificaciones y reseñas de tus películas favoritas!</p>
      </div>


      <MoviesGrid movies={topMovies} />
      <Footer />
    </div>
  );
}
