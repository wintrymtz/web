const multer = require('multer');

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
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB en bytes
    }
});

module.exports = archivo;