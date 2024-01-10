const { User } = require('../db')

module.exports = async (req, res) => {
    try {

        const { email, password } = req.query;

        console.log(email)
        console.log(password);

        if(!email || !password) return res.status(400).json({error: 'Email o contraseña incorrecto'});

        const logUser = await User.findOne({
            where: {email}
        })
 
        if(!logUser) return res.status(400).json({message: 'Usuario no encontrado'})

            return logUser.password === password ? res.status(200).json({logUser, access:true}) : res.status(401).json({access: false, message:'Contraseña incorrecta'})
    
        } catch (error) {
        res.status(500).json({error: error.message})
    }
}