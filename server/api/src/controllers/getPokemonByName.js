require('dotenv').config();
const { API_ID_NAME } = process.env;
const axios = require('axios')
const { Pokemon, Type } = require('../db');

module.exports = async (req, res)=>{
    try {
        let { name } = req.query;
        name = name.toLowerCase();


        //busca desde la base de datos
        const findPoke = await Pokemon.findOne({
            where:{
                name,
            },
            include: {
                model: Type,
                attributes: ['name'],
            },
            atribute: ['id', 'name', 'image', 'hp', 'attack', 'defense', 'speed', 'height', 'weight'],
        });
        let pokemon;

            if (findPoke) {
                pokemon = {
                        id: findPoke.id,
                        name: findPoke.name,
                        image: findPoke.image,
                        hp: findPoke.hp,
                        attack: findPoke.attack,
                        defense: findPoke.defense,
                        speed: findPoke.speed,
                        height: findPoke.height,
                        weight: findPoke.weight,
                        type: findPoke.types.map(type => type.dataValues.name),
                    }
                }

        if(pokemon) return res.status(200).json({pokemon, message:'El Pokemon se encuentra en la Base de Datos'})
        

        //busca desde la API
        const { data } = await axios(`${API_ID_NAME}/${name}`);

        const {id, sprites, stats, height, weight, types} = data;
        const typeName = types.map((t) => t?.type?.name);
        
            pokemon = {
                        id,
                        name, 
                        image: sprites?.other['official-artwork']?.front_default, 
                        hp:stats[0]?.base_stat,
                        attack:stats[1]?.base_stat,
                        defense: stats[2]?.base_stat,
                        speed: stats[5]?.base_stat, 
                        height, 
                        weight,
                        type:typeName
                    }

        res.status(200).json({pokemon, menssage:'El Pokemon se encuentra en la API'})

        

    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Manejar errores de red, timeout, etc.
            res.status(404).json({ menssage: 'No se encontro a ningun Pokemon con ese nombre' });
        } else {
            // Otro tipo de error, como Pokémon no encontrado
            res.status(404).json({ error: 'No se encontro ningun Pokemon' });
        }
    }
    
}