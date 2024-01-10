const{ Pokemon , Type } = require('../db');
const { v4: uuidv4 } = require('uuid');

module.exports = async (req, res) => {
    try {
        let {name, image, hp, attack, defense, speed, height, weight, types} = req.body;
        const id = uuidv4();

        types = types.map((num) => Number(num));

        if(name && image && hp && attack && defense && types.length >= 1){
            
            const newPokemon = await Pokemon.create({
                id,
                name, 
                image, 
                hp, 
                attack, 
                defense, 
                speed, 
                height, 
                weight
            }) 

            const SelectTypes = await Type.findAll({
                where:{ id: types }
            })

            await newPokemon.addTypes(SelectTypes);
            res.status(201).json({ message: 'Pokemon Creado Exitosamente', pokemon: newPokemon });
        
        }else return res.status(400).json({message: 'Faltan algunos datos requeridos o los datos proporcionados no son válidos.'})
        
    } catch (error) {
        res.status(500).json({ error});
    }
    


}