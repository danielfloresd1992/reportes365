import { useState, useEffect, useRef, memo } from 'react';
import { getNoveltyForHydration } from '../../../lib/fetching/novelty';
import { setDataPreviewMultimedia } from '../../../store/slices/dataPreView';
import { useDispatch, useSelector } from 'react-redux';
import { modalConfig } from '../../../store/slices/modal';;
import tranUrlToLocal from '../../../lib/fetching/transUrlLocal';
import TimeOperator from '../../../lib/time';
import icoAprovate from '/ico/icons8-aprobado-48.png';
import icoInvalid from '/ico/icons8-x-48invalid.png';
import icoVacia from '/ico/icons8-casilla-de-verificación-desactivada-48.png';
import icoSun from '/ico/icons8-sol-48.png';
import icoMoon from '/ico/icons8-noche-parcialmente-nublada-96.png';
import icoShiftTotal from '/ico/icons8-24-horas-50.png';
import icoPlay from '/ico/icons8-emoji-boton-reproducir-96.png';
import icoWhatsapp from '/ico/icons8-whatsapp-48.png';
import icoImages from '/ico/icons8-galería-de-imágenes-100.png';
import icoDocument from '/ico/icons8-documento-green-48.png';
import icoShare from '/ico/icons8-en-vivo-48.png';
import icoNext from '../../../../public/ico/icons8-forward-24.png';



export default memo(function ContentPreviewDocument() {


    const [fetchingState, setFetchingState] = useState([]);
    const queryStore = useSelector(store => store.queryAlertDocument);
    const dispatch = useDispatch();
    const styleText = { fontSize: '.75rem', lineHeight: '1.25' };
    const classIco = 'w-[30px] h-[30px]';
    const keySubmit = useRef(true);


    useEffect(() => {
        if (Object.keys(queryStore).length > 0 && fetchingState.length < 1 && keySubmit.current) {
            keySubmit.current = false;
            const cloneObject = { ...queryStore };
            cloneObject.properties = `${queryStore.properties} es title videoUrl imageUrl`;
            getNoveltyForHydration(cloneObject)
                .then(response => {
                    setFetchingState(response.data);
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }, [queryStore]);


    const textParcing = (text) => {
        if (!text) return null;
        const arrText = text.split('\n')
        const resultText = arrText.map(line => {

            if (line.indexOf('*') > -1 && line.indexOf('_') < 0) return <b>{line.replaceAll('*', '')}</b>
            else if (line.indexOf('*') > -1 && line.indexOf('_') > -1) {
                return <b><i>{line.replaceAll('*', '').replaceAll('_', '')}</i></b>
            }
            else return <p>{line}</p>
        });
        return resultText.map(line => (line));
    };



    const returnIcoValidation = (boolean) => {
        if (boolean === true) {
            return (
                <div className={classIco} title={`Alerta aprovada`}>
                    <img className='w-full h-full' src={icoAprovate} alt='ico-aprobado' />
                </div>
            )
        }

        else if (boolean === false) {
            return (
                <div className={classIco} title={`Alerta no aprobada`}>
                    <img className='w-full h-full' src={icoInvalid} alt='ico-aprobado' />
                </div>
            )
        }
        else {
            return (
                <div className={classIco} title={`Alerta fue ignorada`}>
                    <img className='w-full h-full' src={icoVacia} alt='ico-aprobado' />
                </div>
            )
        }
    };



    const returnIcoShift = (shift) => {
        if (shift === 'day') {
            return (
                <div className={classIco} title={`Alerta diurna`}>
                    <img className='w-full h-full' src={icoSun} alt='ico-aprobado' />
                </div>
            )
        }

        else if (shift === 'night') {
            return (
                <div className={classIco} title={`Alerta nocturna`}>
                    <img className='w-full h-full' src={icoMoon} alt='ico-aprobado' />
                </div>
            )
        }
        else {
            return (
                <div className={classIco} title={`Alerta diaria`}>
                    <img className='w-full h-full' src={icoShiftTotal} alt='ico-aprobado' />
                </div>
            )
        }
    };



    const setMultimediaPreview = (data) => {
        dispatch(setDataPreviewMultimedia(data));
    };



    const findPage = (id) => {
        const elementPage = document.getElementById(`find-page-${id}`);
        if (elementPage) {
            elementPage.scrollIntoView({
                block: 'start',
                behavior: 'smooth'
            });
        }
        else {
            dispatch(modalConfig({
                type: 'warning',
                open: true,
                callback: null,
                title: 'Aviso',
                description: 'La alerta selecionada no existe en el reporte de alertas, datos sin hidratar'
            }));
        }
    };



    return (
        <div className='aside-right'>
            <div className='button-aside-right'>
                <img
                    className='w-[20ox] h-[20px]'
                    style={{ transform: 'rotate(180deg)' }}
                    src={icoNext}
                    alt='ico-next'
                />
            </div>
            <div className='w-full h-full p-[.5rem]'>
                <div className='h-[65px]'>
                    <b style={{ fontSize: '.7rem', textAlign: 'center' }}>Reportadas en vivo</b>
                    <p style={{ fontSize: '.7rem' }}>Fecha: <b>{queryStore.date}</b></p>
                    <span style={{ fontSize: '.9rem' }}>Total: <b>{fetchingState.length}</b> reportadas</span>
                    <hr />
                </div>
                <div className='w-full h-[94%] overflow-y-scroll'>
                    {
                        fetchingState.length > 0 ?

                            fetchingState.map(item => (
                                <div className='relative flex flex-col gap-[.2rem] overflow-hidden rounded-md m-[1.5rem_0]' key={item?._id} id={`find-${item._id}`}
                                    onDoubleClick={() => findPage(item?._id)}
                                >
                                    <div className='w-full'>
                                        <img className='w-full' src={tranUrlToLocal(item?.imageToShare)} alt='novelty-alert' />
                                        <hr />
                                    </div>
                                    <div className='w-full p-[.2rem]'>
                                        <div className='w-full flex flex-col' style={styleText}>
                                            {textParcing(item?.menu)}
                                            <hr />
                                        </div>
                                        <div className='w-full' style={styleText}>
                                            <p>Título original:</p>
                                            <b>{item.title}</b>
                                        </div>
                                        <div className='w-full' style={styleText}>
                                            <p>Fecha y hora de envio:</p>
                                            <b>{TimeOperator.conveTime(item?.date)}</b>
                                        </div>
                                        <div className='w-full' style={styleText}>
                                            <p>Enviado por: <b>{item?.sharedByUser?.user?.nameUser}</b></p>
                                        </div>
                                        <div className='w-full' style={styleText}>
                                            <p>Validado por: <b>{item?.validationResult?.validatedByUser?.user?.nameUser}</b></p>
                                        </div>
                                    </div>
                                    <div className='w-full bg-[#ddd] p-[.3rem_.5rem]'>
                                        <div className='w-full p-[.5rem_0rem] flex items-center justify-start gap-[.2rem]'>
                                            {
                                                returnIcoValidation(item?.validationResult?.isApproved)
                                            }
                                            {
                                                item?.validationResult?.isApproved ? returnIcoShift(item?.shift) : null
                                            }
                                            {
                                                item ?
                                                    <div className={classIco} title={`Alerta reportada en vivo`}>
                                                        <img className='w-full h-full' src={icoShare} alt='ico-aprobado' />
                                                    </div>
                                                    :
                                                    null
                                            }
                                            {
                                                item.menuRef.useOnlyForTheReportingDocument ?
                                                    <div className={classIco} title={`Alerta hidrada en el reporte`}>
                                                        <img className='w-full h-full' src={icoDocument} alt='ico-aprobado' />
                                                    </div>
                                                    :
                                                    null
                                            }
                                        </div>
                                        <div className='w-full flex flex-col gap-[.3rem]' style={styleText}>
                                            <p className='text-color'>Multimedia:</p>
                                            <div className='w-full flex items-center justify-start gap-[.2rem]'>
                                                <button type='button' className='w-[23px] h-[23px]' title='Ver imagen del cliente' onClick={() => setMultimediaPreview(item?.imageToShare)}>
                                                    <img className='w-full h-full' src={icoWhatsapp} alt='ico-play' />
                                                </button>
                                                {
                                                    item?.videoUrl ?
                                                        <button type='button' className={classIco} title='Reproducir video' onClick={() => setMultimediaPreview(item?.videoUrl)}>
                                                            <img className='w-full h-full' src={icoPlay} alt='ico-play' />
                                                        </button>
                                                        : null
                                                }
                                                {
                                                    Array.isArray(item?.imageUrl) && item?.imageUrl?.length > 1 ?
                                                        <button type='button' className={classIco} title='Ver todas las imágenes' onClick={() => setMultimediaPreview(item?.imageUrl)}>
                                                            <img className='w-full h-full' src={icoImages} alt='ico-play' />
                                                        </button>
                                                        :
                                                        null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))
                            :
                            null
                    }
                </div>
            </div>
        </div>
    )
});

// <p style={{ fontSize: '.5rem' }}>find-{item._id}</p>