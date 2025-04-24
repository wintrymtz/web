const express = require('express');
const db = require('../Database');
const archivo = require('../multerConfig');
const router = express.Router();



// Obtener películas favoritas de un usuario
router.get("/favMoviesList/:userId", (req, res) => {
    const userId = req.params.userId;

    db.query("CALL SP_GET_UserFavoriteMovies(?)", [userId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ msg: "Error al obtener películas favoritas" });
        }

        const movies = result[0] || [];

        res.status(200).json({ movies });
    });
});


// Eliminar una película favorita
router.delete("/favMoviesDelete/:userId/:movieId", (req, res) => {
  const { userId, movieId } = req.params;

  db.query("CALL SP_DELETE_UserFavoriteMovie(?, ?)", [userId, movieId], (err, result) => {
      if (err) {
          console.log(err);
          return res.status(500).json({ msg: "Error al eliminar película favorita" });
      }

      if (result.affectedRows > 0) {
          res.status(200).json({ msg: "Película eliminada de favoritos correctamente" });
      } else {
          res.status(404).json({ msg: "Película no encontrada en favoritos" });
      }
  });
});


// Obtener información de una película
router.get("/movieInfo/:movieID", (req, res) => {
    const movieID = req.params.movieID;

    db.query("CALL SP_GET_MovieByID(?)", [movieID], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ msg: "Error al obtener detalles de la película" });
        }

        const movie = result[0][0]; // el primer resultado de la primera tabla
        res.status(200).json(movie);
    });
});


module.exports = router;