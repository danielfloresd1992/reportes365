import icoSave from '../../public/ico/icons8-guardar-50 (1).png';

import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useCallback, useContext, useRef } from 'react';
import { getImgEstablishmentById } from '../lib/fetching/establishment';
import { arrayBufferToBase64 } from '../lib/bufferToBase64';
import { myUserContext } from '../context/sessionContext';
import { modalConfig } from '../store/slices/modal';
import InputStandart from '../components/inputs/input_standart';

import FrontPage from '../components/page/FrontPage';
import PageFourTime from '../components/page/PageFour&Time';

import { readFileToUrl } from '../lib/file/fileToBase64AndFile';


import { setConfigDocument, putConfigDocument, putConfigDocument_onlyImgFront } from '../lib/fetching/documents';

import socket_jarvis from '../lib/Socket/api_socked';
import tranUrlToLocal from '../lib/fetching/transUrlLocal';



const config_default = {
    typePageSumary: 'classic',
    activation: false,
    numberOfReports: 'single-diary',
    time: '00:00',
    americanDateFormatForCoverPage: false,
    time1Attention: '00:00:00',
    timeDelayClean: '00:00:00',
    propMetricTableInToastPos: false,
    style: {
        pageColor: '#ffffff',
        borderColor: '#29c709',
        bg: '#dddddd',
        imageBg: null,
        colorGreadientLogo: '#000000',
        colorTextFront: '#ffffff',
        bgTextBox: '#ffffff',
        colorTextBox: '#000000',
        colorBorderBox: '#ffffff'
    },

    /////////////      NEWS
    requireBarTable: false,
    requirePageMeetingPreShift: false,
    typeOfManagerToTableApproachEvaluation: 'single'
}


export default function Configuration() {


    const establishments = useSelector(store => store.establishment);
    const [establishmentState, setEstablishmentsState] = useState({});
    const imgFrontRef = useRef(null);


    const [configState, setConfigState] = useState({ ...config_default });


    const { dataSessionState } = useContext(myUserContext);
    const { dataSession } = dataSessionState;
    const dispatch = useDispatch();




    useEffect(() => {
        if (establishmentState._id && !establishmentState.name) {
            getImgEstablishmentById(establishmentState._id, 'config_report')
                .then(response => {
                    const establishments = response.data;
                    console.log(establishments)
                    setEstablishmentsState({ ...establishmentState, ...establishments });
                })
                .catch(error => console.log(error));
        }
    }, [establishmentState]);



    useEffect(() => {
        if (establishmentState.name && !establishmentState.config_report) {
            dispatch(modalConfig({
                title: 'Advertencia',
                description: 'No existe una configuración para el establecimiento selecionado ¿desea crear una por los valores predeterminado?',
                open: true,
                type: 'warning',
                callback: () => {
                    setConfigDocument(establishmentState._id, config_default)
                        .then(response => {
                            console.log(response); // se recive el nuevo ._id para las nuevas configuariones
                            setConfigState({ ...response.data.data });
                            dispatch(modalConfig({
                                title: 'Succesull',
                                description: 'La configuració para este establecimiento fue creada',
                                open: true,
                                type: 'successfull',
                                callback: null

                            }));
                        })
                        .catch(error => {
                            console.error(error)

                        });
                }
            }));
        }
        else if (establishmentState.name) {
            setConfigState(establishmentState.config_report);
        }
    }, [establishmentState]);




    const seletedEstablishment = id => {
        setEstablishmentsState({ _id: id });
    };




    const saveConfig = useCallback(() => {
        if (!dataSession?.admin) {
            dispatch(modalConfig({
                title: 'Error',
                description: 'Sin autorización',
                open: true,
                type: 'error'
            }));
        }
        else {
            dispatch(modalConfig({
                title: 'Aviso',
                description: 'Seguro de modificar la configuración actual',
                open: true,
                type: 'warning',
                callback: () => {
                    putConfigDocument(establishmentState?.config_report?._id ?? configState._id, configState)
                        .then(() => {
                            handlerResponsePutConfig(establishmentState);
                        })
                        .catch(error => console.log(error));
                    if (imgFrontRef.current) saveUpdateNewImg();
                }
            }));
        }
    }, [establishmentState, configState, dataSessionState]);



    const saveUpdateNewImg = useCallback(() => {
        putConfigDocument_onlyImgFront(configState._id, { urlImgFront: imgFrontRef.current })
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }, [establishmentState, configState]);



    const handlerResponsePutConfig = useCallback((establishmentState) => {
        socket_jarvis.emit('jarvis365reporte-alert-emit', { title: `Configuración de ${establishmentState.name} 🔧`, description: `${dataSessionState.dataSession.name} ha cambiado la configuración.`, user: dataSessionState.dataSession });
    }, [establishmentState, configState, dataSessionState]);



    return (
        <div className='w-full h-full flex items-start justify-center p-[1rem]'>
            <div className='w-full p-[1rem] flex flex-col gap-[2rem]'>
                <div className='w-full'>
                    <h2 className='text-center font-medium p-[1rem]'>Menú de Configuración</h2>
                    <hr />
                </div>

                <p className='text-center'>Reporte del establecimeinto</p>

                <div className='w-full flex items-center gap-[1rem]'>
                    <div>
                        <figure>
                            <img className='w-[100px] h-[74px]' src={establishmentState?.img ? arrayBufferToBase64(establishmentState?.img.data.data, 'image/png') : '/default-image-icon-missing-picture-page-vector-40546530.jpg'} alt='logo-default-establecimeinto' />
                        </figure>
                    </div>
                    <div>
                        {
                            establishmentState.name ?
                                <p className='text-gray-cusmon'>{establishmentState.name}</p> : <div className='h-[10px] w-[100px] bg-[#ddd]'></div>
                        }
                    </div>
                </div>


                <div className='w-full flex justify-between items-center pt-8 pb-8'>
                    <p>Guardar configuración</p>
                    <button disabled={!establishmentState.name} clasName='w-[70px] h-[44px] border-3 border-[#979797] rounded-[5px] flex justify-center items-center bg-[#575757]'>
                        <img
                            className='w-[30px] pointer-never'
                            onClick={saveConfig}
                            type='button'
                            src={icoSave}
                            alt='ico_ave'
                        />
                    </button>
                </div>

                <div className='flex flex-col gap-[2rem]'>
                    <div className='w-full flex gap-[1rem] items-center justify-center'>
                        <InputStandart
                            type='select'
                            textLabel={'Selecione un establecimiento'}
                            setValue={seletedEstablishment}
                            id={'select_establishment'}
                        >
                            {
                                establishments.map(establishment => (
                                    <option value={establishment._id} key={establishment._id}>{establishment.name}</option>
                                ))
                            }
                        </InputStandart>
                    </div>


                    {/*                    configuración del reporte                  */}


                    <div className='w-full flex gap-[1rem] items-center justify-center'>
                        <InputStandart
                            type='toogle'
                            disabled={!establishmentState.name}
                            textLabel={'Activación en reporte'}
                            valueProp={configState?.activation}
                            setValue={value => setConfigState({ ...configState, activation: value })}
                            id={'select_establishment'}
                        />
                    </div>


                    <div className='w-full flex'>
                        <InputStandart
                            type='select'
                            textLabel='Reporte por dia'
                            valueProp={configState?.numberOfReports}
                            setValue={value => {
                                let time;
                                if (value === 'single-diary') time = '00:00'
                                else if (value === 'dual-diary') {
                                    time = {
                                        day: '00:00',
                                        night: '00:00'
                                    };
                                }
                                setConfigState({
                                    ...configState,
                                    numberOfReports: value,
                                    time: time
                                })
                            }}
                            id={'type-report'}
                            equired={true}
                            disabled={!establishmentState.name}
                        >
                            <option value='single-diary' title='un reporte por dia'>Diario</option>
                            <option value='dual-diary' title='reporte tarde y noche'>Dual</option>
                        </InputStandart>
                    </div>

                    {
                        configState?.numberOfReports === 'single-diary' ?
                            <div className='w-full flex'>
                                <InputStandart
                                    type='time'
                                    textLabel='Hora de entrega'
                                    valueProp={configState?.time}
                                    setValue={value => {
                                        setConfigState({
                                            ...configState,
                                            time: value
                                        })
                                    }}
                                    id={'type-report'}
                                    disabled={!establishmentState.name}
                                    equired={true}
                                />
                            </div>
                            :
                            <div className='w-full flex flex-wrap gap-[1rem]'>
                                <InputStandart
                                    type='time'
                                    textLabel='Hora diurno'
                                    valueProp={configState?.time?.day}
                                    setValue={value => setConfigState({ ...configState, time: { ...configState?.time, day: value } })}
                                    id={'type-report'}
                                    disabled={!establishmentState.name}
                                    equired={true}
                                >
                                    <option value='single-diary' title='un reporte por dia'>Diario</option>
                                    <option value='dual-diary' title='reporte tarde y noche'>Dual</option>
                                </InputStandart>

                                <InputStandart
                                    type='time'
                                    textLabel='Hora nocturno'
                                    valueProp={configState.time.night}
                                    setValue={value => setConfigState({ ...configState, time: { ...configState?.time, night: value } })}
                                    id={'type-report'}
                                    disabled={!establishmentState.name}
                                    equired={true}
                                >
                                    <option value='single-diary' title='un reporte por dia'>Diario</option>
                                    <option value='dual-diary' title='reporte tarde y noche'>Dual</option>
                                </InputStandart>
                            </div>
                    }

                    <div className='w-full flex gap-[1rem] items-center justify-center'>
                        <InputStandart
                            type='toogle'
                            disabled={!establishmentState.name}
                            textLabel={'Formato de fecha americano en portada'}
                            valueProp={configState?.americanDateFormatForCoverPage}
                            setValue={value => setConfigState({ ...configState, americanDateFormatForCoverPage: value })}
                            id={'select_establishment'}
                        />
                    </div>




                    <div className='w-full flex gap-[1rem] items-center justify-center'>
                        <InputStandart
                            type='select'
                            disabled={!establishmentState.name}
                            textLabel={'Formato de resumen clásico'}
                            valueProp={configState?.typePageSumary}
                            setValue={value => setConfigState({ ...configState, typePageSumary: value })}
                            id={'select_type_sumary'}
                        >
                            <option value='classic'>Completo</option>
                            <option value='simplified'>Simple</option>
                        </InputStandart>
                    </div>




                    <div className='w-full flex gap-[1rem] items-center justify-center'>
                        <InputStandart
                            type='toogle'
                            disabled={!establishmentState.name}
                            textLabel={'Evaluación de procesos en bar o barra'}
                            valueProp={configState?.requireBarTable}
                            setValue={value => setConfigState({ ...configState, requireBarTable: value })}
                            id={'select_establishment'}
                        />
                    </div>

                    <div className='w-full flex gap-[1rem] items-center justify-center'>
                        <InputStandart
                            type='toogle'
                            disabled={!establishmentState.name}
                            textLabel={'tabla de metrica en propesos en toast pos'}
                            valueProp={configState?.propMetricTableInToastPos}
                            setValue={value => setConfigState({ ...configState, propMetricTableInToastPos: value })}
                            id={'tabla de metrica en propesos en toast pos'}
                        />
                    </div>

                    <div className='w-full flex gap-[1rem] items-center justify-center'>
                        <InputStandart
                            type='toogle'
                            disabled={!establishmentState.name}
                            textLabel={'Datos de la reunión Pre-Shift'}
                            valueProp={configState?.requirePageMeetingPreShift}
                            setValue={value => setConfigState({ ...configState, requirePageMeetingPreShift: value })}
                            id={'select_establishment'}
                        />
                    </div>

                    <div className='w-full flex gap-[1rem] items-center justify-center'>
                        <InputStandart
                            type='select'
                            textLabel='Tipo de evaluación de toques'
                            valueProp={configState.typeOfManagerToTableApproachEvaluation}
                            setValue={value => setConfigState({ ...configState, typeOfManagerToTableApproachEvaluation: value })}
                            id={'type-report'}
                            disabled={!establishmentState.name}
                        >
                            <option value='single'>Simple</option>
                            <option value='complete'>Completo</option>
                        </InputStandart>
                    </div>


                    <div className='w-full flex gap-[1rem] items-center justify-center'>
                        <InputStandart
                            type='text'
                            textLabel='Tiempo en demora de 1 atención a la mesa'
                            valueProp={configState.time1Attention}
                            pattern="^(([0-1]\d)|(2[0-3]))(:[0-5]\d){2}$"
                            setValue={value => setConfigState({ ...configState, time1Attention: value })}
                            id='1attention'
                        />
                    </div>

                    <div className='w-full flex gap-[1rem] items-center justify-center'>
                        <InputStandart
                            type='text'
                            textLabel='Tiempo en demora de limpieza de mesa'
                            valueProp={configState.timeDelayClean}
                            pattern="^(([0-1]\d)|(2[0-3]))(:[0-5]\d){2}$"
                            setValue={value => setConfigState({ ...configState, timeDelayClean: value })}
                            id='cleanTable'
                        />
                    </div>

                </div>



                {/*                    configuración de estilos                   */}



                <p className='text-center'>Estilo del reporte</p>


                <div className='f-full flex flex-col gap-[2rem]'>
                    <div className='w-full flex flex-col items center justify-center gap-[2rem]' >
                        <div className='w-full flex flex-col flex-wrap gap-[1rem]'>
                            <div style={{ zoom: '.4' }}>
                                <FrontPage data={{ name_establishment: establishmentState?.name }} styles={configState.style} imageUrl={configState?.style?.imageBg ?? tranUrlToLocal(configState?.urlImgFront) ?? null} />
                            </div>
                            <div style={{ zoom: '.4' }}>
                                <PageFourTime
                                    dataPage={{
                                        id: 'chak1a',
                                        title: '',
                                        numberPage: 1,
                                        type: 'blocked&novelty',

                                    }}
                                    styles={configState.style}
                                    injectId='640f7c747d44282c3f625d63'
                                />
                            </div>
                        </div>
                    </div>

                    <div className='w-full p-[1rem] flex gap-[1rem] flex-col'>
                        <div className='w-full flex justify-between flex-wrap gap-[2rem]'>
                            <InputStandart
                                type='color'
                                textLabel={`color de página: ${configState.style.pageColor}`}
                                valueProp={configState.style.pageColor}
                                setValue={value => {
                                    setConfigState({ ...configState, style: { ...configState.style, pageColor: value } })
                                }
                                }
                                name={'type-background-color-page'}
                                disabled={!establishmentState.name}
                            />
                            <InputStandart
                                type='color'
                                name='color-graduen'
                                textLabel={`Gradient de logo: ${configState.style.pageColor}`}
                                valueProp={configState.style.pageColor}
                                setValue={value => {
                                    setConfigState({
                                        ...configState,
                                        style: {
                                            ...configState.style,
                                            colorGreadientLogo: value
                                        }
                                    })
                                }
                                }

                                disabled={!establishmentState.name}
                            />
                            <InputStandart
                                type='color'
                                textLabel={`color del texto portada: ${configState.style.colorTextFront}`}
                                valueProp={configState.style.colorTextFront}
                                setValue={value => {
                                    setConfigState({ ...configState, style: { ...configState.style, colorTextFront: value } })
                                }
                                }
                                name={'type-text-color-front'}
                                disabled={!establishmentState.name}
                            />

                            <InputStandart
                                type='color'
                                textLabel={`color del borde en hoja ${configState.style.borderColor}`}
                                valueProp={configState.style.borderColor}
                                setValue={value => {
                                    setConfigState({ ...configState, style: { ...configState.style, borderColor: value } })
                                }
                                }
                                name={'type-border-color'}
                                disabled={!establishmentState.name}
                            />

                            <InputStandart
                                type='color'
                                textLabel={`color de la hoja: ${configState.style.bg}`}
                                valueProp={configState.style.bg}
                                setValue={value => {
                                    setConfigState({ ...configState, style: { ...configState.style, bg: value } })
                                }
                                }
                                name={'type-background-color'}
                                disabled={!establishmentState.name}
                            />
                            <InputStandart
                                type='color'
                                textLabel={`color de fondo caja de texto: ${configState.style.bgTextBox}`}
                                valueProp={configState.style.bgTextBox}
                                setValue={value => {
                                    setConfigState({ ...configState, style: { ...configState.style, bgTextBox: value } })
                                }
                                }
                                name={'type-backgroundBoxText-color'}
                                disabled={!establishmentState.name}
                            />
                            <InputStandart
                                type='color'
                                textLabel={`color de texto en caja de texto: ${configState.style.colorTextBox}`}
                                valueProp={configState.style.colorTextBox}
                                setValue={value => {
                                    setConfigState({ ...configState, style: { ...configState.style, colorTextBox: value } })
                                }
                                }
                                name={'type-backgroundBoxText-color'}
                                disabled={!establishmentState.name}
                            />

                            <InputStandart
                                type='color'
                                textLabel={`color de border en caja de texto: ${configState.style.colorBorderBox}`}
                                valueProp={configState.style.colorBorderBox}
                                setValue={value => {
                                    setConfigState({ ...configState, style: { ...configState.style, colorBorderBox: value } })
                                }
                                }
                                name={'type-backgroundBoxborde-color'}
                                disabled={!establishmentState.name}
                            />

                            <InputStandart
                                type='file'
                                textLabel='Imagen de fondo'
                                name='file-img'
                                valueProp={null}
                                setValue={file => {
                                    readFileToUrl(file)
                                        .then(result => {
                                            imgFrontRef.current = file;
                                            setConfigState({ ...configState, style: { ...configState.style, imageBg: result.data64 } })
                                        })
                                        .catch(error => console.log(error));
                                }
                                }
                                disabled={!establishmentState.name}
                            />


                        </div>
                    </div>
                </div>


                <p className='text-center'>Configuración del Resument de turno</p>
                <div className='w-full p-[1rem] flex gap-[1rem] flex-col'>
                    <h1>Próxima mente...</h1>
                </div>


            </div>
        </div>
    );
}