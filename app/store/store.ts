import { configureStore } from '@reduxjs/toolkit';
import document from './slices/document';
import modalStore from './slices/modal';
import openFormStore from './slices/openFormLogin';
import establishmentStore from './slices/establishment';
import dragBooleanStore from './slices/activateDrag';
import establishmentDocumentStore from './slices/establishmentDocument';
import queryAlertDocument from './slices/queryAlertDocument';
import dataPreviewStore from './slices/dataPreView';
import awaitWindowStore from './slices/awaitStore';



const store = configureStore({
    reducer: {
        documentStore: document,
        modalAlert: modalStore,
        booleanFormLogin: openFormStore,
        establishment: establishmentStore,
        idDrag: dragBooleanStore,
        establishmentDocument: establishmentDocumentStore,
        queryAlertDocument: queryAlertDocument,
        dataPreview: dataPreviewStore,
        awaitWindow: awaitWindowStore
    },
});




export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;