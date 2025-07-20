import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalAlert } from '../../type/typeComponent'



const initialState: ModalAlert = {
    type: null,
    open: false,
    callback: null,
    title: null,
    description: null
};



const modalStore = createSlice({
    name: 'modalAlert',
    initialState: initialState,
    reducers: {
        modalConfig: (state, action: PayloadAction<ModalAlert>) => {
            return action.payload;
        }
    }
});


export const { modalConfig } = modalStore.actions;

export default modalStore.reducer;