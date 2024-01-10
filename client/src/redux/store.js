import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice";
import searchPokemonReducer from "./searchPokemon";
import typesReducer from "./types";
import detailReducer from "./detail";
import userNameReducer from "./userName";
import viewLoginReducer from "./viewLogin";

export const store = configureStore({
    reducer:{
        pokemon: pokemonReducer,
        searchPokemon: searchPokemonReducer,
        types: typesReducer,
        detail: detailReducer,
        userName: userNameReducer,
        view: viewLoginReducer
    }
});