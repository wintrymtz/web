const express = require('express');
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
const multer = require('multer');

app.use(cors());
app.use(express.json());

app.listen(3001,
    () => {
        console.log("Escuchando puerto 3001 !!!");
    }
)

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "Max232004",
        database: "",
        port: "3306"
    }
);


const fileFilter = (req, file, cb) => {
    const formatos = ['image/png', 'image/jpg', 'image/jpeg'];

    if (formatos.includes(file.mimetype)) {
        cb(null, true);
    } else {
        return cb(new Error('Archivo no válido'));
    }
}

const strg = multer.memoryStorage();
const archivo = multer({
    storage: strg,
    fileFilter: fileFilter
});

app.post("/create", archivo.single('image'), (req, res) => {
    const username = req.body.us;
    const password = req.body.password;
    const email = req.body.email;
    const image64 = req.file.buffer.toString('base64');


    db.query('INSERT INTO Usuario (nombre, correo, contra, foto) VALUES (?,?,?, ?)',
        [username, email, password, image64], (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Informacion almacenada corerctamente");
                res.json({
                    "msg": "ok"
                })
            }
        });
});

app.post("/login", (req, res) => {

    db.query('SELECT * FROM Usuario WHERE Usuario.correo = ? AND Usuario.contra = ?',
        [req.body.email, req.body.password], (err, data) => {
            if (err) {
                console.log(err);
            } else {
                if (data.length > 0) {
                    console.log(data);
                    res.json({
                        "alert": "encontrado",
                        "usuario": data[0].nombre
                    });
                } else {
                    res.json({
                        "alert": "no encontrado",
                    });
                }
            }
        });
});

app.get("/getUsers", (req, res) => {
    db.query("SELECT nombre, foto FROM Usuario", (err, data) => {
        if (err) {
            console.log("/getUsers", err);
            res.json({
                "msg": "Error"
            });
        } else if (data.length > 0) {
            console.log("/getUsers", data)
            res.json(data);
        } else {
            res.json({
                "msg": "No respuesta"
            })
        }
    });
});