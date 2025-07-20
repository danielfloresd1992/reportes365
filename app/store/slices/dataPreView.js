import { createSlice } from '@reduxjs/toolkit';



const dataPreviewStore = createSlice({
    name: 'dragBoolean',
    initialState: null,
    reducers: {
        setDataPreviewMultimedia: (state, action) => {
            return action.payload;
        }
    }
});


export const { setDataPreviewMultimedia } = dataPreviewStore.actions;

export default dataPreviewStore.reducer;