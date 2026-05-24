const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // 1. Leer el token del encabezado (Authorization: Bearer <token>)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Acceso denegado. No se proporcionó un token." });
    }

    try {
        // 2. Verificar si el token es válido
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Guardamos los datos del usuario en la petición (req.user) para usarlos después
        req.user = verified; 
        
        next(); // Continuar al siguiente paso (el controlador)
    } catch (error) {
        res.status(403).json({ message: "Token no válido o expirado." });
    }
};