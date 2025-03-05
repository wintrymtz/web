
import React from "react";
import "./Home.css"; // Importamos el CSS

const movies = [
  {
    title: "Avatar",
    image: "https://m.media-amazon.com/images/I/91N1lG+LBIS._AC_UF894,1000_QL80_.jpg",
    description: "Una película de ciencia ficción."
  },
  {
    title: "Intensamente 2",
    image: "https://lumiere-a.akamaihd.net/v1/images/1_intensamente_2_payoff_banner_pre_1_aa3d9114.png",
    description: "Secuela de Intensamente."
  },
  {
    title: "Annabelle 3",
    image: "https://hips.hearstapps.com/hmg-prod/images/poster-peliculas-terror-2019-annabelle-3-1578395572.jpg",
    description: "Nueva entrega de la saga de terror."
  },
  {
    title: "Avatar 2",
    image: "https://lumiere-a.akamaihd.net/v1/images/poster-avatar-2-lat_46034440_1_c359a2d2.png",
    description: "El regreso a Pandora."
  }
];

const Navbar = () => (
  <div className="navbar">
    <div className="logo">MOVIE SUMMARY</div>
    <ul className="nav-links">
      <li><a href="#">Inicio</a></li>
      <li><a href="#">Géneros</a></li>
    </ul>
    <div className="auth-buttons">
      <a href="/login">Iniciar Sesión</a>
      <a href="/register">Registrarse</a>
    </div>
  </div>
);

const Hero = () => (
  <div className="hero">
    <h1>Explora las mejores películas</h1>
    <p>¡Sumérgete en resúmenes, calificaciones y reseñas de tus películas favoritas!</p>
  </div>
);

const MovieCard = ({ title, image, description }) => (
  <div className="movie-card">
    <img src={image} alt={title} />
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const MoviesGrid = () => (
  <div className="movies-grid">
    {movies.map((movie, index) => (
      <MovieCard key={index} {...movie} />
    ))}
  </div>
);

const Footer = () => (
  <footer className="footer">
    <p>&copy; Resúmenes de películas de todo tipo. Reservados todos los derechos.</p>
  </footer>
);

export default function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <Hero />
      <MoviesGrid />
      <Footer />
    </div>
  );
}






// import React from "react";

// const movies = [
//   {
//     title: "Avatar",
//     image: "https://m.media-amazon.com/images/I/91N1lG+LBIS._AC_UF894,1000_QL80_.jpg",
//     description: "Una película."
//   },
//   {
//     title: "Intensamente 2",
//     image: "https://lumiere-a.akamaihd.net/v1/images/1_intensamente_2_payoff_banner_pre_1_aa3d9114.png",
//     description: "Pelicula."
//   },
//   {
//     title: "Annabelle 3",
//     image: "https://hips.hearstapps.com/hmg-prod/images/poster-peliculas-terror-2019-annabelle-3-1578395572.jpg",
//     description: "Nueva entrega de la saga de terror."
//   },
//   {
//     title: "Avatar 2",
//     image: "https://lumiere-a.akamaihd.net/v1/images/poster-avatar-2-lat_46034440_1_c359a2d2.png",
//     description: "Bla bla bla."
//   }
// ];

// const Navbar = () => (
//   <div className="flex justify-between items-center bg-black text-white p-5 sticky top-0 z-50">
//     <div className="text-xl font-bold text-purple-600">MOVIE SUMMARY</div>
//     <ul className="flex gap-5">
//       <li><a href="#" className="hover:text-teal-400">Inicio</a></li>
//       <li><a href="#" className="hover:text-teal-400">Géneros</a></li>
//     </ul>
//     <div className="flex gap-3">
//       <a href="#" className="bg-purple-600 px-4 py-2 rounded hover:bg-teal-400 hover:text-black">Iniciar Sesión</a>
//       <a href="#" className="bg-purple-600 px-4 py-2 rounded hover:bg-teal-400 hover:text-black">Registrarse</a>
//     </div>
//   </div>
// );

// const Hero = () => (
//   <div className="text-center py-20 bg-gradient-to-b from-purple-600 to-black text-white">
//     <h1 className="text-4xl font-bold">Explora las mejores películas</h1>
//     <p>¡Sumérgete en resúmenes, calificaciones y reseñas de tus películas favoritas!</p>
//   </div>
// );

// const MovieCard = ({ title, image, description }) => (
//   <div className="bg-white/75 rounded-lg shadow-lg overflow-hidden text-center p-5 w-72">
//     <img src={image} alt={title} className="w-full h-auto" />
//     <h3 className="text-xl font-semibold text-gray-900 mt-3">{title}</h3>
//     <p className="text-gray-700 text-sm">{description}</p>
//   </div>
// );

// const MoviesGrid = () => (
//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5 justify-center">
//     {movies.map((movie, index) => (
//       <MovieCard key={index} {...movie} />
//     ))}
//   </div>
// );

// const Footer = () => (
//   <footer className="bg-purple-600 text-white text-center p-3 mt-10">
//     <p>&copy; Resúmenes de películas de todo tipo. Reservados todos los derechos.</p>
//   </footer>
// );

// export default function Home() {
//   return (
//     <div className="bg-black text-white min-h-screen">
//       <Navbar />
//       <Hero />
//       <MoviesGrid />
//       <Footer />
//     </div>
//   );
// }

////////////////////////////////////////////////////////////////////////////////////////////////

// import React from "react";
// import "./Home.css"; // Asegúrate de crear este archivo para los estilos

// const Home = () => {
//   return (
//     <div>
//       {/* Barra de navegación */}
//       <div className="navbar">
//         <div className="navbar-logo">MOVIE SUMMARY</div>
//         <ul className="navbar-menu">
//           <li><a href="#">Inicio</a></li>
//           <li><a href="#">Géneros</a></li>
//         </ul>
//         <div className="navbar-buttons">
//           <a href="#">Iniciar Sesión</a>
//           <a href="#">Registrarse</a>
//         </div>
//       </div>

//       {/* Encabezado */}
//       <header>
//         <h1>Bienvenido a Movie Summaries</h1>
//       </header>

//       {/* Sección principal */}
//       <div className="hero">
//         <h1>Explora las mejores películas</h1>
//         <p>¡Sumérgete en resúmenes, calificaciones y reseñas de tus películas favoritas!</p>
//       </div>

//       {/* Grid de películas */}
//       <div className="movies-grid">
//         <div className="movie-card">
//           <img src="https://m.media-amazon.com/images/I/91N1lG+LBIS._AC_UF894,1000_QL80_.jpg" alt="Movie Poster" />
//           <h3>Avatar</h3>
//           <p>Una película.</p>
//         </div>

//         <div className="movie-card">
//           <img src="https://lumiere-a.akamaihd.net/v1/images/1_intensamente_2_payoff_banner_pre_1_aa3d9114.png" alt="Movie Poster" />
//           <h3>Intensamente 2</h3>
//           <p>Película.</p>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer>
//         <p>&copy; Resúmenes de películas de todo tipo. Reservados todos los derechos.</p>
//       </footer>
//     </div>
//   );
// };

// export default Home;
