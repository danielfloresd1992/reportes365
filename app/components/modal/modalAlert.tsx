import { ReactNode, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store'; // Importamos los tipos de estado y dispatch
import { modalConfig } from '../../store/slices/modal'; // Asegúrate que es "modal" y no "model"






export default function ModalAlert() {


    const modalState = useSelector((state: RootState) => state.modalAlert);
    const dispatch = useDispatch<AppDispatch>();


    const closeModal = (): void => {
        dispatch(modalConfig({
            open: false,
            title: null,
            description: null,
            callback: null,
            type: null
        }));
    };


    const handlerCallback = useCallback(() => {
        if(typeof modalState.callback === 'function') modalState.callback();
        closeModal();
    }, [modalState]);



    if(!modalState.open) return null;

    return (
        <div className='absolute w-full h-full flex top-[0] z-[1000] flex items-center justify-center bg-blackTranparent'>
            <div className='w-[400px] min-h-[200px] bg-white flex flex-col justify-between items-center overflow-hidden rounded-[5px] shadow-for-page'>
                <div className='w-full p-[0.8rem] bg-[#9f9f9f]'>
                    <p className='text-white font-normal text-[1.2rem]'>
                        {modalState.title || "Alert"}
                    </p>
                </div>

                <div className='w-full flex items-center justify-center p-[.8rem]'>
                    <p className='text-center'>{modalState.description || "Content"}</p>
                </div>

                <div className='w-full flex gap-[1rem] justify-end p-[.8rem]'>
                    { modalState.callback !== null ? <button className='button-generic' onClick={handlerCallback}>Aceptar</button> : null}
                    
                    <button
                        className='button-generic'
                        onClick={closeModal}
                    >
                        { modalState.callback !== null ? 'Cancelar' : 'Cerrar' }
                    </button>
                </div>
            </div>
        </div>
    );
}