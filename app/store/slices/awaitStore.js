import { createSlice } from '@reduxjs/toolkit';


const awaitWindowStore = createSlice({
    name: 'awaitWindow',
    initialState: {
        open: false,
        title: '', 
        description: ''
        
    },
    reducers: {
        setConfigAwait: (state, action) => {
            return action.payload;
        }
    }
});


export const { setConfigAwait } = awaitWindowStore.actions;

export default awaitWindowStore.reducer;