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
                    // console.log(data[0][0]);
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

router.delete("/delete/:id", (req, res) => {
    let userId = req.params.id;

    db.query("CALL SP_DELETE_User(?)", [userId], (err, resp) => {
        if (resp.affectedRows == 1) {
            res.status(200).json({ "msg": "Usuario eliminado correctamente" });
        } else if (resp.affectedRows > 1) {
            res.status(401).json({ "msg": "Se afectó a más de un usuario" });
        } else {
            res.status(401).json({ "msg": "Ningun usuario ha sido afectado" });
        }
    });
})

router.get("/list", (req, res) => {

    db.query("CALL SP_GET_UserList()", [], (err, resp) => {
        // console.log(resp[0]);
        if (resp[0].length > 0) {
            res.status(200).json({ "msg": "Lista obtenida correctamente", "users": resp[0] })
        } else {
            res.status(401).json({
                "msg": "(error)Lista vacía",
            });
        }
    });
})

router.patch("/update", archivo.single('image'), (req, res) => {
    const userId = req.body.id;
    const username = req.body.username;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const oldImage = req.body.oldImage;
    let newImage = null;

    if (!req.file) {
        newImage = oldImage;
    } else {
        newImage = req.file.buffer.toString('base64');
    }

    db.query("CALL SP_UPDATE_User(?, ?, ?, ?, ?, ?)", [userId, username, email, firstName, lastName, newImage],
        (err, resp) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    "msg": `(error)Error de servidor`,
                });
            }

            if (resp.affectedRows == 1) {
                res.status(200).json({ "msg": "Usuario actualizado correctamente" });
            } else if (resp.affectedRows > 1) {
                res.status(401).json({ "msg": "Se afectó a más de un usuario" });
            } else {
                res.status(401).json({ "msg": "Ningun usuario ha sido afectado" });
            }
        });
});

router.get("/:id", (req, res) => {
    const userId = req.params.id;

    db.query("CALL SP_GET_User(?)", [userId], (err, resp) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                "msg": `(error)Error de servidor`,
            });
        }

        if (resp[0].length == 1) {
            res.status(200).json({ "msg": "Usuario obtenido correctamente", "user": resp[0][0] })
        } else {
            res.status(401).json({
                "msg": `(error)Usuario (id=${userId}) no encontrado`,
            });
        }
    })
});
module.exports = router;