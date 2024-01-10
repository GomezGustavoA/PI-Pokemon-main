const { User } = require('../db');

module.exports = async (req, res) => {
    try {
        const { email, user, password } = req.body;
        console.log(req.body)

        if (!email || !password || !user) return res.status(400).json({ error: 'Faltan datos' });

        // Verificar si el email ya existe
        const emailExists = await User.findOne({
            where: { email }
        });

        if (emailExists) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
        }

        // Verificar si el username ya existe
        const userExists = await User.findOne({
            where: { user }
        });

        if (userExists) {
            return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
        }

        // Si no existen ni el email ni el username, crear el usuario
        const userOk = await User.create({
            email,
            user,
            password
        });

        res.status(201).json({userOk, access: true});
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};