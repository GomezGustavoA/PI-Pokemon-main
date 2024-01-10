require('dotenv').config();
const {API_ID_NAME} = process.env;
const { Pokemon , Type} = require('../db.js')
const isValidUUID = require('../validate/valiadateUuid.js')

const axios = require('axios');

module.exports = async(req, res)=>{
    try {
        const {id} = req.params;
        //verifica en base de datos
        if (isValidUUID(id)) {

            const findPoke = await Pokemon.findOne({
                where: {
                    id: id,
                },
                include: {
                    model: Type,
                    attributes: ['name'],
                },
                attributes: ['id', 'name', 'image', 'hp', 'attack', 'defense', 'speed', 'height', 'weight'],
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

            if(pokemon) return res.status(200).json({pokemon, menssage:'El pokemon se encuentra en la base de datos'})
            else return res.status(404).json({menssage:'El pokemon no se encuentra en la base de datos'})
        }

        //trae desde la api
        const { data } = await axios(`${API_ID_NAME}/${id}`);
        const {name, sprites, stats, height, weight, types} = data;
        const typeName = types.map((t) => t?.type?.name);

        const pokemon = {
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

        res.status(200).json({pokemon, menssage:'El pokemon se encuenta en la API'})

    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Manejar errores de red, timeout, etc.
            res.status(500).json({ error: 'Error in API request' });
        } else {
            // Otro tipo de error, como Pokémon no encontrado
            res.status(404).json({ error: 'No se encontro al Pokemon' });
            console.log(error)
        }
    }  
  
}

