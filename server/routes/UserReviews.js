const express = require('express');
const db = require('../Database');
const router = express.Router();



// Obtener reseñas favoritas del usuario
router.get('/favReviewsId/:userID', (req, res) => {
    const { userID } = req.params;
    
    db.query("CALL SP_GET_FavReviewsIDS(?)", [userID], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result[0]);
    });
});


// Agregar a favoritos
router.post('/favReviewsCreate/', (req, res) => {
    const { userID, reviewID } = req.body;
    
    db.query("CALL SP_CREATE_UserFavReviews(?, ?)", [userID, reviewID], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});


// Eliminar una reseña favorita
router.delete("/favReviewsDelete/:userID/:reviewID", (req, res) => {
    const { userID, reviewID } = req.params;
    db.query("CALL SP_DELETE_UserFavReviews(?, ?)", [userID, reviewID], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(200);
    });
});



module.exports = router;