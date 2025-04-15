const express = require('express');
const app = express();
const cors = require("cors");

const userRoute = require('./routes/User');
const genreRoute = require('./routes/Genre');

app.use(cors());
app.use(express.json());

app.listen(3001,
    () => {
        console.log("Escuchando puerto 3001 !!!");
    }
)

app.use("/user", userRoute);
app.use("/genre", genreRoute);


// app.post("/login", (req, res) => {

//     db.query('SELECT * FROM Usuario WHERE Usuario.correo = ? AND Usuario.contra = ?',
//         [req.body.email, req.body.password], (err, data) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 if (data.length > 0) {
//                     console.log(data);
//                     res.json({
//                         "alert": "encontrado",
//                         "usuario": data[0].nombre
//                     });
//                 } else {
//                     res.json({
//                         "alert": "no encontrado",
//                     });
//                 }
//             }
//         });
// });

// app.get("/getUsers", (req, res) => {
//     db.query("SELECT nombre, foto FROM Usuario", (err, data) => {
//         if (err) {
//             console.log("/getUsers", err);
//             res.json({
//                 "msg": "Error"
//             });
//         } else if (data.length > 0) {
//             console.log("/getUsers", data)
//             res.json(data);
//         } else {
//             res.json({
//                 "msg": "No respuesta"
//             })
//         }
//     });
// });