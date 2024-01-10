import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pokemon : {},
    stateView: false
}

export const searchPokemonSlice = createSlice({
    name: "searchPokemon",
    initialState,
    reducers:{
        addSearchPokemon: (state, action) => {
            state.pokemon = action.payload;
            state.stateView = true
        },
        removeSearchPokemon:(state, action) => {
            state.pokemon = {};
            state.stateView = false
        },
        

    }
})

export const {addSearchPokemon, removeSearchPokemon} = searchPokemonSlice.actions;
export default searchPokemonSlice.reducer;