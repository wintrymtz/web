const express = require('express');
const db = require('../Database');
const archivo = require('../multerConfig');
const router = express.Router();

router.post("/create", archivo.single('image'), (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const image64 = req.file.buffer.toString('base64');

    console.log(lastName);

    db.query('CALL SP_USER_RegisterUser(?, ?, ?, ?, ?, ?)',
        [username, firstName, lastName, email, password, image64], (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    error: "Internal Server Error",
                    // message: err.message || "Un error ocurrió en el servidor"
                });
            } else {
                console.log("Informacion almacenada corerctamente");
                res.status(200).json({
                    "msg": "ok"
                })
            }
        });
});

router.post("/login", (req, res) => {
    console.log(req.body);

    db.query('CALL SP_LOGIN_LoginUser(?, ?)',
        [req.body.email, req.body.password], (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Internal Server Error" });
            } else {
                console.log(data[0]);
                if (data[0].length > 0) {
                    console.log(data[0][0]);
                    res.status(200).json({
                        "msg": "encontrado",
                        "usuario": data[0][0],
                    });
                } else {
                    console.log('No encontrado');
                    res.status(401).json({
                        "msg": "no encontrado",
                    });
                }
            }
        });
});

module.exports = router;