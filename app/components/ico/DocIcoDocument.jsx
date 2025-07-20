import icoDoc from '../../../public/ico/icons8-documentos-100.png';
import icoChartPie from '../../../public/ico/chart_pie.png';
import icoAmazonas from '../../../public/RGB-Icono-AMAZONAS 365-Original.png';
import icoMoon from '../../../public/ico/icons8-luna-48.png'//icons8-luna-48.png
import sunIco from '../../../public/ico/icons8-sol-64.png';
import uniqueIco from '../../../public/ico/icons8-diario-80.png';
import deleteIco from '../../../public/ico/icons8-borrar-para-siempre-96.png';
import shiftToEs from '../../lib/script/shit_lang'


import { useDispatch } from 'react-redux';
import { modalConfig } from '../../store/slices/modal';

import { useEffect, useContext, useRef, memo, useCallback } from 'react';
import { myUserContext } from '../../context/sessionContext';
import { resumeDocument } from '../../lib/fetching/documents';
import { useNavigate } from '@remix-run/react';
import socket_jarvis from '../../lib/Socket/api_socked';


export default memo(function DocIcoDocument({ document, deleteProps }) {


    const { dataSessionState, addTask } = useContext(myUserContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const elementDisabletRef = useRef(null);
    const elementTextDisabletRef = useRef(null);





    useEffect(() => {
        let key = true;

        const handdlerDeleteDocument = data => {
            if (key) if (data._id === document._id) {
                elementDisabletRef.current.classList.add('disabled-document');
                elementTextDisabletRef.current.style.display = 'flex';
            }
        };


        socket_jarvis.on('delete-document', handdlerDeleteDocument);

        return () => {
            key = false;
            socket_jarvis.off('delete-document', handdlerDeleteDocument);
        }
    }, []);



    const redirectPath = useCallback((data) => {
        if (data) {
            addTask(data);
            if (document.type === 'resume-shift') navigate('/resume_document');
            if (document.type === 'complete-shift') navigate('/document');
        }
    }, [document]);



    const handdlerOnClick = () => {
        dispatch(modalConfig({
            callback: () => {
                resumeDocument(document._id)
                    .then(response => redirectPath(response.data?.data))
                    .catch(error => console.log(error));
            },
            title: 'Aviso',
            description: `Seguro de reanudar o editar el reporte de ${document.establishmentName} de la fecha: ${document.date} ${shiftToEs(document.shift)}`,
            open: true,
            warning: 'warning'
        }));
    };



    const handdlerClick = (id) => {
        if (id === 'delete') deleteProps(document._id)
        else handdlerOnClick()
    };



    return (
        <div className='relative flex flex-col justify-center items-center gap-[0.6rem]' title={document.editedOrViewedBy.length > 0 ? `Reporte editados por: ${document.editedOrViewedBy.map(user => `${user.nameUser}\n`)}` : ''}>
            <div className='relative w-[150px] flex flex-col items-center justify-around gap-[.5rem] cursor-pointer border border-[#e7e7e7] p-[1rem_0.5rem] ' ref={elementDisabletRef} id='document' onClick={e => handdlerClick(e.target.id)} >
                <img className='absolute h-[25px] w-[25px] rounded-full bg-white top-[5px] left-[5px] shadow-boxShadowMoon' src={document.shift === 'day' ? sunIco : document.shift === 'night' ? icoMoon : uniqueIco} />
                {
                    dataSessionState?.dataSession?.admin ?
                        <button
                            className='absolute top-[8px] right-[5px] z-[3]'
                            onClick={e => handdlerClick(e.target.id)}
                            id='delete'
                        >
                            <img className='w-[20px] pointer-events-none' src={deleteIco} alt='delete-document' />
                        </button>
                        : null
                }


                <div className='relative'>
                    <img className='w-[40px] pointer-events-none' src={document.type === 'complete-shift' ? icoDoc : icoChartPie} alt='ico-document' />
                    <img style={{ filter: 'saturate(1.4)' }} className='w-[50px] absolute bottom-[-15px] right-[-15px]' src={icoAmazonas} alt='ico-amazonas' />
                </div>
                {
                    document.type === 'complete-shift' ?
                        <p className='text-center pointer-events-none leading-none'>{document?.establishmentName}</p>
                        :
                        <p className='text-center pointer-events-none leading-none'>Resumen {document?.franchiseName}</p>
                }
                <p className='text-custom-small font-medium text-customGrayText text-center'>turno: {document.shift === 'day' ? 'Diurno' : document.shift === 'night' ? 'Nocturno' : 'Diario'}</p>
                {/**
                <div className='flex flex-col gap-[.4rem]'>
                    {
                        document.type === 'complete-shift' ?
                            <p className='text-center pointer-events-none leading-none'>{document?.establishmentName}</p>
                            :
                            <p className='text-center pointer-events-none leading-none'>Resumen {document?.franchiseName}</p>
                    }

                  
                </div>
                */}

            </div>
            <div
                className='w-full h-full absolute top-[0] left-[0] flex justify-center items-center'
                style={{ display: 'none' }}
                ref={elementTextDisabletRef}
            >
                <div className='absolute flex justify-center items-center w-full h-full bg-red'>
                    <div className=' w-full no-aviable'></div>
                </div>
            </div>
            <div>

                <p className='text-custom-small font-medium text-customGrayText text-center'>Fecha del reporte: {document.date}</p>
                <p className='text-custom-small font-medium text-customGrayText text-center'>Creado por: <b>{document?.createdDocument?.nameUser}</b></p>
                {
                    console.log(document)
                }
            </div>
        </div>
    )
})