import { createSlice } from '@reduxjs/toolkit';



const dragBooleanStore = createSlice({
    name: 'dragBoolean',
    initialState: true,
    reducers: {
        setActivateDrag: (state, action) => {
            return action.payload;
        }
    }
});


export const { setActivateDrag } = dragBooleanStore.actions;

export default dragBooleanStore.reducer;