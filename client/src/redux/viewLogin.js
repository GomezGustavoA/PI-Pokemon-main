import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    view: false,
};

export const view = createSlice({
    name: "view",
    initialState,
    reducers: {
        addView: (state, action) => {
            state.view = action.payload;
        },
    },
});

export const { addView } = view.actions;
export default view.reducer;