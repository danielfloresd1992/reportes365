import { createSlice } from '@reduxjs/toolkit';



const queryAlertDocument = createSlice({
    name: 'queryAlertDocument',
    initialState: {},
    reducers: {
        setQueryAlertDocument: (state, action) => {
            return action.payload;
        }
    }
});


export const { setQueryAlertDocument } = queryAlertDocument.actions;

export default queryAlertDocument.reducer;