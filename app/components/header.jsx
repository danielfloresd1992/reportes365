import { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { myUserContext } from '../context/sessionContext';
import logoIco from '../../public/logo-page-removebg.png';
import loseIco from '../../public/ico/icons8-log-out-48.png';
import { getEstablishmentAll } from '../lib/fetching/establishment';
import { setEstablishment } from '../store/slices/establishment';
import socket_jarvis from '../lib/Socket/api_socked';
import { modalConfig } from '../store/slices/modal';



export default function Header(){

    const { dataSessionState, closeSession } =  useContext(myUserContext);
    const dispatch = useDispatch();


    useEffect(() => {
        if(dataSessionState.stateSession === 'authenticated'){
            getEstablishmentAll()
            .then(response => dispatch(setEstablishment(response.data)))
            .catch(error => console.log(error));

            
            socket_jarvis.on('connect_error', error => {
                Object.keys(error);
                dispatch(modalConfig({ type: 'error', open: true, title: 'Error de coneción', description: 'Error en socked 455' }))
            });
        }
    }, [dataSessionState]);



    if(dataSessionState.stateSession === 'authenticated'){
        return(
            <header className='w-full fixed top-0  p-2 px-4 flex items-center justify-between bg-[rgb(171,171,171)] z-[20]' >
                <img id='count' draggable={false} className='w-[30px] filter brightness-11' src={ logoIco } alt='ico-logo' style={{  filter: 'brightness(10)' }} />
                <div className='h-full flex items-center gap-[1rem]'>
                    <p className='elemetNumber text-white'>{dataSessionState?.dataSession?.name} {dataSessionState?.dataSession?.surName}</p>
                    <button className='w-[20px] h-[20px]' title='Cerrar sesión' onClick={closeSession}>
                        <img src={ loseIco } className='w-full h-full' alt='close-ico' />
                    </button>
                </div>
            </header>
        )
    }
    else{
        null
    }
}