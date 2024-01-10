import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pokemon: [],
};

export const types = createSlice({
    name: "types",
    initialState,
    reducers: {
        addTypes: (state, action) => {
            let counter = 1;
            let types = []

            for (let i = 0; i < action.payload.length; i++) {
                const type = {
                    name: action.payload[i].name,
                    num: counter,
                };
                counter++;
                types.push(type);
            }

            state.pokemon = types;
        },
    },
});

export const { addTypes } = types.actions;
export default types.reducer;