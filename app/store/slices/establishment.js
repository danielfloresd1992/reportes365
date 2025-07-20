import { createSlice } from '@reduxjs/toolkit';



const establishmentStore = createSlice({
    name: 'establishments',
    initialState: [],
    reducers: {
        setEstablishment: (state, action) => {
            return action.payload;
        }
    }
});


export const { setEstablishment } = establishmentStore.actions;

export default establishmentStore.reducer;