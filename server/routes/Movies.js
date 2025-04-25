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


// Actualizar película
router.put("/updateMovie/:id", (req, res) => {
    const { movieName, synopsis, poster, duration, yearPremiere, genreName } = req.body;
    const id = req.params.id;
  
    db.query("CALL SP_UPDATE_Movie(?, ?, ?, ?, ?, ?, ?)",
      [id, movieName, synopsis, poster, duration, yearPremiere, genreName],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ msg: "Error al actualizar la película" });
        }
        res.status(200).send("Película actualizada correctamente");
      }
    );
});


// Eliminar película
router.delete("/deleteMovie/:id", (req, res) => {
    const id = req.params.id;
  
    db.query("CALL SP_DELETE_Movie(?)", [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Error al eliminar la película" });
      }
      res.status(200).send("Película eliminada correctamente");
    });
});



module.exports = router;