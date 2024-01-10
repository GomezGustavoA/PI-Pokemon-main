const axios = require('axios')
require('dotenv').config();
const { Pokemon ,Type} = require('../db');
const { API_ID_NAME } = process.env;

module.exports = async( req, res ) =>{
    try {
        const arrayPokemons = [];
        let arrayPokemonsBD = [];

        const {cantPo} = req.query;
        const cantPoke = Number(cantPo)

        if(!cantPoke || isNaN(cantPoke)) return res.status(400).json({ error: 'cantPoke debe ser un número válido' });
        
        if(cantPoke <= 0 || cantPoke >= 1000) return res.status(400).json({ error: 'cantPoke debe ser un número positivo menor a 1000' });
        
        // Realiza la consulta para buscar todos los Pokémon con sus tipos en bd
        const pokemonesConTipo = await Pokemon.findAll({
            include: {
            model: Type,
            attributes: ['name'], // Puedes seleccionar las columnas específicas que deseas incluir de Type
            },
            attributes: ['id', 'name', 'image', 'hp', 'attack', 'defense', 'speed', 'height', 'weight'], // Selecciona las columnas específicas del modelo Pokemon
        });

        // Crear array para pokemonesConTipo
        if(pokemonesConTipo) {
            arrayPokemonsBD = pokemonesConTipo.map((pokemon) => {
                const pokemonInfo = {
                id: pokemon.id,
                image: pokemon.image,
                name: pokemon.name,
                hp: pokemon.hp,
                attack: pokemon.attack,
                defense: pokemon.defense,
                speed: pokemon.speed,
                height: pokemon.height,
                weight: pokemon.weight,
                type: pokemon.types?.map((type) => type.name),
                };
            return pokemonInfo;
        });}

        for (let index = 1; index <= cantPoke; index++) {

            await axios(`${API_ID_NAME}/${index}`)
            .then(({data}) =>{

                const {id, name, sprites, stats, height, weight, types} = data;
                const typeName = types.map((t) => t?.type?.name);

                const pokemon = {
                     id,
                     name, 
                     image: sprites.other['official-artwork'].front_default, 
                     hp:stats[0]?.base_stat,
                     attack:stats[1]?.base_stat,
                     defense: stats[2]?.base_stat,
                     speed: stats[5]?.base_stat, 
                     height, 
                     weight,
                     type: typeName
                    }
                arrayPokemons.push(pokemon);
            })
            .catch((error) => {
                res.status(400).json({error:'Error en la solicitud'})
            })
        
        } 

        console.log(arrayPokemonsBD)
        res.status(200).json({arrayPokemons, arrayPokemonsBD})
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}