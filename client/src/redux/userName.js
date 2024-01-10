import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName : '',
}

export const userName = createSlice({
    name: "userName",
    initialState,
    reducers:{
        addUserName: (state, action) => {
            state.userName = action.payload;
        },
    }
})

export const { addUserName } = userName.actions;
export default userName.reducer;