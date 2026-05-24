const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro de nuevo usuario
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // 1. Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        // 2. Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Crear el usuario
        const newUser = await User.create({
            name,
            email,
            password_hash: hashedPassword, // Ahora sí coinciden
            role: role || 'user' // Es bueno añadir el rol por si lo envías en el body
}       );

        res.status(201).json({ 
            message: "Usuario creado con éxito", 
            userId: newUser.id 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login de usuario
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Buscar usuario
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        // 2. Comprobar contraseña
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

        // 3. Generar JWT (RA4 - Comunicaciones seguras)
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};