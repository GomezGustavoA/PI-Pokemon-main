const { Router } = require('express');
const getPokemons = require('../controllers/getPokemons');
const getPokemonById = require('../controllers/getPokemonById');
const getPokemonByName = require('../controllers/getPokemonByName');
const createPokemon = require('../controllers/postPokemon');
const getTypes = require('../controllers/getTypes');
const getLogin = require('../controllers/login');
const postLogin = require('../controllers/postLogin');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons', getPokemons);
router.get('/pokemons/name', getPokemonByName);
router.get('/pokemons/:id', getPokemonById);
router.post('/pokemons', createPokemon)
router.get('/types', getTypes);
router.get('/login', getLogin);
router.post('/login', postLogin);

module.exports = router;
