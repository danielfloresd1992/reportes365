import { createSlice } from '@reduxjs/toolkit';


const documetArrStore = createSlice({
    name: 'documentArr',
    initialState: [],
    reducers: {
        pushDocumentArr: (state, action) => {
            return [...state, action.payload];
        }
    }
});


export const { pushDocumentArr } = documetArrStore.actions;

export default documetArrStore.reducer;