const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/'); // Las fotos se guardarán aquí
    },
    filename: (req, file, cb) => {
        // Nombre único: fecha + nombre original
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Filtro de archivos (solo imágenes)
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new Error("Error: El archivo debe ser una imagen válida (jpeg, jpg o png)"));
};

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Límite 5MB
    fileFilter: fileFilter
});

module.exports = upload;