const express = require('express');
const db = require('../Database');
const archivo = require('../multerConfig');
const router = express.Router();


//Crear película
router.post("/create", archivo.single('image'), (req, res) => {
  const movieName = req.body.movieName;
  const duration = req.body.duration;
  const year = req.body.year;
  const synopsis = req.body.synopsis;
  const image64 = req.file.buffer.toString('base64');
  console.log("hola");

  db.query("CALL SP_CREATE_CreateMovie(?, ?, ?, ?, ?)", [movieName, duration, year, synopsis, image64], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: "Internal Server Error",
        // message: err.message || "Un error ocurrió en el servidor"
      });
    } else {
      const movieID = result[0][0];
      console.log("Informacion almacenada correctamente");
      res.status(200).json({
        "msg": "ok",
        "movieID": movieID
      })
    }
  });
});

//asignar los generos a una pelicula
router.post("/link", (req, res) => {
  const movieID = req.body.movieID;
  const genres = req.body.genres;
  console.log(movieID, genres)

  let completados = 0;
  let errores = 0;

  genres.forEach((element) => {
    db.query("CALL SP_CREATE_GenreMovie(?, ?)", [element.genreID, movieID.movieID], (err, result) => {
      if (err) {
        errores++;
        console.error("Error al insertar género:", err);
      } else {
        completados += 1;
        if (completados >= genres.length) {

          if (errores > 0) {
            res.status(500).json({
              error: "Internal Server Error",
            });
          } else {
            console.log("Géneros asociados correctamente");
            res.status(200).json({
              "msg": "ok"
            })
          }
        }
      }
    })
  });

});


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
  console.log(movieID);

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

router.get("/search/:input", (req, res) => {
  let search = req.params.input;
  let movies = [];

  if (search.localeCompare('_all') == 0) {
    search = "";
    // console.log('vacío');
  }

  db.query("CALL SP_SELECT_Search2(?)", [search], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "Error al obtener películas" });
    }
    movies = result[0] || [];
    movies.forEach(e => {
      if (e.genres != null) {
        let genres = e.genres.split(', ');
        e.genres = genres;
      }

    });
    res.status(200).json({ movies });
  });

  // console.log(movies);
});



// Obtener las 4 películas mejor calificadas para mostrar en el Home
router.get("/topRated", (req, res) => {
  db.query("CALL SP_GET_TopMovies()", (err, result) => {
    if (err) {
      console.error("Error al obtener películas mejor calificadas:", err);
      return res.status(500).json({ msg: "Error al obtener top películas" });
    }

    const topMovies = result[0] || [];
    res.status(200).json({ movies: topMovies });
  });
});


module.exports = router;