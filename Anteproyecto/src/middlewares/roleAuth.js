const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        // El usuario ya viene en req.user gracias al middleware de auth
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: "No tienes permisos para realizar esta acción. Se requiere rol: " + allowedRoles.join(' o ') 
            });
        }
        next();
    };
};

module.exports = authorizeRoles;