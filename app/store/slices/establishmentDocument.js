import { createSlice } from '@reduxjs/toolkit';



const establishmentDocumentStore = createSlice({
    name: 'establishmentDocument',
    initialState: null,
    reducers: {
        setEstablishmentDocument: (state, action) => {
            return action.payload;
        }
    }
});


export const { setEstablishmentDocument } = establishmentDocumentStore.actions;

export default establishmentDocumentStore.reducer;