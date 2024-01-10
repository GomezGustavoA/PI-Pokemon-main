//tine la logica de nuestra esplicacion
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allPokemon: [],
    pokemon:[],
    pokemonDB:[],
    allpokeApiYDb:[]
}

export const pokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers:{
        addPokemon: (state, action) => {
            state.pokemon = action.payload.arrayPokemons;
            state.allPokemon = action.payload.arrayPokemons;
            state.pokemonDB = action.payload.arrayPokemonsBD;
            state.allpokeApiYDb = state.pokemon.concat(action.payload.arrayPokemonsBD)
        },
        orderAscendente:(state,action) =>{
            const pokemonOrdenadosAsc = state.allPokemon.sort((a, b) => {
                const poke1 = a.name.toUpperCase(); // Ignora mayúsculas y minúsculas
                const poke2 = b.name.toUpperCase(); // Ignora mayúsculas y minúsculas
              
                if  (poke1 < poke2) {
                  return -1;
                }
                if  (poke1 > poke2) {
                  return 1;
                }
                return 0; // Los nombres son iguales
              });

              state.allPokemon = pokemonOrdenadosAsc;
        },
        orderDescendente:(state,action) =>{
            const pokemonOrdenadosAsc = state.allPokemon.sort((a, b) => {
                const poke1 = a.name.toUpperCase(); // Ignora mayúsculas y minúsculas
                const poke2 = b.name.toUpperCase(); // Ignora mayúsculas y minúsculas
              
                if  (poke1 > poke2) {
                  return -1;
                }
                if  (poke1 < poke2) {
                  return 1;
                }
                return 0; // Los nombres son iguales
              });

              state.allPokemon = pokemonOrdenadosAsc;
        },
        orderAscendenteAtack:(state,action) => {
            const pokemonOrdenadosAsc = state.allPokemon.sort((a, b) => {
                const poke1 = a.attack;
                const poke2 = b.attack;
              
                if  (poke1 < poke2) {
                  return -1;
                }
                if  (poke1 > poke2) {
                  return 1;
                }
                return 0;
              });

              state.allPokemon = pokemonOrdenadosAsc;
        },
        orderDescendenteAtack:(state,action) => {
            const pokemonOrdenadosAsc = state.allPokemon.sort((a, b) => {
                const poke1 = a.attack;
                const poke2 = b.attack; 
              
                if  (poke1 > poke2) {
                  return -1;
                }
                if  (poke1 < poke2) {
                  return 1;
                }
                return 0;
              });

              state.allPokemon = pokemonOrdenadosAsc;
        },
        filterAll: (state, action) => {
            state.allPokemon = state.allpokeApiYDb;
        },
        filterDB:(state, action) => {
            state.allPokemon = state.pokemonDB;
        },
        filterApi: (state, action) => {
            state.allPokemon = state.pokemon
        },
        filterType: (state, action) => {
            state.allPokemon = state.pokemon 
            const filteredPokemon = state.allPokemon.filter(pokemon => {
              return pokemon.type.some(type => type.includes(action.payload));
            });
          
            state.allPokemon = filteredPokemon;
          }

}
})

 export const { addPokemon, orderAscendente, orderDescendente, orderDescendenteAtack, orderAscendenteAtack, filterAll, filterDB, filterApi, filterType} = pokemonSlice.actions;
 export default pokemonSlice.reducer;