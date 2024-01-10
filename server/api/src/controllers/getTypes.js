const axios = require('axios');
require('dotenv').config();
const { Type } = require('../db')
const {API_TYPE} = process.env;

module.exports = async (req, res) =>{
    try {
        
        const {data} = await axios(`${API_TYPE}`,{ timeout: 5000 })
        const { results } = data;
        
        for (let i = 0; i < results.length; i++) {
            await Type.findOrCreate({
                where: {name:results[i].name}
            })
        }
        res.status(200).json({message:'Los tipos se cargaron con exito', results})
    
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Manejar errores de red, timeout, etc.
            res.status(500).json({ error: 'Error in API request' });
        } else {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}