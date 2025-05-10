const express = require('express');
const db = require('../Database');
const router = express.Router();

router.post("/create", (req, res) => {
    const genreName = req.body.genreName;
    const descGenre = req.body.genreDescription;

    db.query('CALL SP_CREATE_CreateGenre(?, ?)',
        [genreName, descGenre], (err, resp) => {
            if (err) {
                res.status(500).json({
                    "msg": "Internal Server Error",
                });
            } else {
                res.status(200).json({
                    "msg": "Informacion almacenada correctamente"
                })
            }
        });
});

router.delete("/delete/:id", (req, res) => {
    let genreId = req.params.id;
    db.query("CALL SP_DELETE_Genre(?)", [genreId], (err, resp) => {
        if (err) {
            if (err.code === "ER_ROW_IS_REFERENCED_2") {
                return res.status(500).json({ msg: "fk" });
            }
            return res.status(500).json({ msg: "ERROR DEL SERVIDOR" });
        }
        if (resp.affectedRows == 1) {
            res.status(200).json({ "msg": "Género eliminado correctamente" });
        } else if (resp.affectedRows > 1) {
            res.status(401).json({ "msg": "Se afectó a más de un usuario" });
        } else {
            res.status(401).json({ "msg": "Ningun usuario ha sido afectado" });
        }
    });
})

router.get("/list", (req, res) => {

    db.query("CALL SP_GET_GenreList()", [], (err, resp) => {
        // console.log(resp[0]);
        if (resp[0].length > 0) {
            res.status(200).json({ "msg": "Lista obtenida correctamente", "genres": resp[0] })
        } else {
            res.status(401).json({
                "msg": "(error)Lista vacía",
            });
        }
    });
})
module.exports = router;