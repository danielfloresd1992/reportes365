import { createSlice } from '@reduxjs/toolkit';


const openFormStore = createSlice({
    name: 'openmModalBoolean',
    initialState: false,
    reducers: {
        setOpenForm: (state, action) => {
            return action.payload;
        }
    }
});


export const { setOpenForm } = openFormStore.actions;

export default openFormStore.reducer;