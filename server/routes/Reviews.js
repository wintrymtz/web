const express = require("express");
const router = express.Router();
const db = require('../Database');


// Crear una nueva reseña
router.post("/createReview", (req, res) => {
    const { descReview, rating, userID, movieID } = req.body;

    db.query("CALL SP_CREATE_Review(?, ?, ?, ?)", [descReview, rating, userID, movieID], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(201);
    });
});


// Obtener reseñas favoritas de un usuario
router.get("/favReviewsList/:userID", (req, res) => {
    const { userID } = req.params;
    db.query("CALL SP_GET_UserFavReviews(?)", [userID], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result[0]);
    });
});


// Reseñas de una pelicula
router.get("/movieReviews/:movieID", (req, res) => {
    const { movieID } = req.params;

    db.query("CALL SP_GET_ReviewsByMovieID(?)", [movieID], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result[0]); // retorna las reseñas
    });
});


module.exports = router;
