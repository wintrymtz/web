
import "./css/Home.css"; // Importamos el CSS
import Navbar2 from "./navbar";
import MovieCard from "./MovieCard";
import Footer from "./Footer";

const movies = [
  {
    title: "Avatar",
    image: "https://m.media-amazon.com/images/I/91N1lG+LBIS._AC_UF894,1000_QL80_.jpg",
    description: "Una película de ciencia ficción.",
    calif: "8/10",
    year: "2010"
  },
  {
    title: "Intensamente 2",
    image: "https://lumiere-a.akamaihd.net/v1/images/1_intensamente_2_payoff_banner_pre_1_aa3d9114.png",
    description: "Secuela de Intensamente.",
    calif: "6/10",
    year: "2010"
  },
  {
    title: "Annabelle 3",
    image: "https://hips.hearstapps.com/hmg-prod/images/poster-peliculas-terror-2019-annabelle-3-1578395572.jpg",
    description: "Nueva entrega de la saga de terror.",
    calif: "6/10",
    year: "2010"
  },
  {
    title: "Avatar 2",
    image: "https://lumiere-a.akamaihd.net/v1/images/poster-avatar-2-lat_46034440_1_c359a2d2.png",
    description: "El regreso a Pandora.",
    calif: "6/10",
    year: "2010"
  }
];

const Hero = () => (
  <div className="hero">
    <h1>Explora las mejores películas</h1>
    <p>¡Sumérgete en resúmenes, calificaciones y reseñas de tus películas favoritas!</p>
  </div>
);

const MoviesGrid = () => (
  <div className="movies-grid">
    {movies.map((movie, index) => (
      <MovieCard key={index} {...movie} />
    ))}
  </div>
);

export default function Home() {

  return (
    <div className="home-container">
      <Navbar2 />
      <Hero />
      <MoviesGrid />
      <Footer />
    </div>
  );
}