import { createSlice } from '@reduxjs/toolkit';



const document = createSlice({
    name: 'document',
    initialState: [],
    reducers: {
        updateDocument: (state, action) => {
            return action.payload;
        }
    }
});


export const { updateDocument } = document.actions;

export default document.reducer;