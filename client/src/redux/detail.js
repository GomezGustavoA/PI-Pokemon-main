import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    detailNum: null,
};

export const detail = createSlice({
    name: "detail",
    initialState,
    reducers: {
        addDetail: (state, action) => {
            state.detailNum = action.payload
        },
        removeDetail:(state, acion) => {
            state.detailNum = null;
        }
    },
});

export const { addDetail, removeDetail } = detail.actions;
export default detail.reducer;