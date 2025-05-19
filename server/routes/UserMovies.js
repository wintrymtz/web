const express = require('express');
const db = require('../Database');
const router = express.Router();



// Revisar si una película es favorita
router.get("/isFavorite/:userID/:movieID", (req, res) => {
    const { userID, movieID } = req.params;
    db.query("CALL SP_GET_ifMovieFav(?, ?)", [userID, movieID], (err, results) => {
        if (err) return res.status(500).send(err);
        const isFavorite = results[0].length > 0;
        res.json({ isFavorite });
    });
});

// Agregar a favoritos
router.post("/addFavorite", (req, res) => {
    const { userID, movieID } = req.body;
    db.query("CALL SP_CREATE_UserMovie(?, ?)", [userID, movieID], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        res.sendStatus(201);
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


module.exports = router;