import { useState, memo, Fragment } from 'react';
import { useSelector } from 'react-redux';
import LayautNovelty from '../../../../layaut/LayautPage';
import TabletLayaut from '@/components/table/table_layaut';

import icoGrafic from '../../../../../../public/ico/ico_page_metric/icons8-gráfico-combinado-48.png';
import icoReloj from '../../../../../../public/ico/icons8-reloj-50.png';
import icoProcess from '../../../../../../public/ico/icons8-proceso-50.png';
import icoAlert from '../../../../../../public/ico/ico_page_metric/icons8-alerta-96.png';
import Image from '../../../../image_for_page/image';
import alertIco from '../../../../../../public/ico/icons8-alarma-50.png';
import foodIco from '../../../../../../public/ico/icons8-comida-64.png';







export default memo(function Summary({ dataState, dishItem, styles, config, put_delay }) {


    const [bodyState, setBodyState] = useState(null);
    const [entriesNameState, setEntriesNameState] = useState([]);
    const [ImgesState, setImageState] = useState([]);


    const styleCellBorder = 'border border-black text-lg';


    let totalTiketDelay = 0;
    const totalDelayToast = dataState?.delayToastPost?.delay?.length;
    const totalDelayDelivety = dataState?.delayDeliveryDishWhenItIsReadyInKitchen?.delay?.length;


    for (let category in dataState.delayToastPost.categoryMetrics) {
        if (category !== 'take out') {
            totalTiketDelay = totalTiketDelay + dataState.delayToastPost.categoryMetrics[category].totalTickets;
        }
    }




    const totalProcess = () => {
        if (!bodyState) return { totalProcess: 0, totalDelayToasd: 0 };
        let totalProcess = 0;
        let totalDelayToasd = 0;
        entriesNameState.forEach(food => {
            if (bodyState[food]) {
                totalProcess = Number(totalProcess + bodyState[food].totalProcess);
                totalDelayToasd = totalDelayToasd + bodyState[food].delay.length;
            }
        });
        return {
            totalProcess,
            totalDelayToasd
        };
    };


    const putAverage = (value, nameDish) => {
        const newData = { ...dataState.delayToastPost }
        newData.categoryMetrics[nameDish].avgPreparation = value;
        put_delay(newData, dataState.delayToastPost.type);
    };



    const putTiketsTotal = (value, nameDish) => {
        const newData = { ...dataState.delayToastPost }
        newData.categoryMetrics[nameDish].totalTickets = Number(value);
        put_delay(newData, dataState.delayToastPost.type);
    };



    const average = (write = false) => {




        return dishItem.map(dish => {
            const delays = dataState.delayToastPost.categoryMetrics[dish.nameDishe];

            if (dishItem.length > 2 && dishItem.length < 5) {
                return (
                    <div className='w-full flex justify-between' >
                        <div>
                            <p className='monotext text-gray-600 block'>{dish.nameDishe}:</p>
                        </div>
                        <div>
                            <p className='monotext font-medium' contentEditable={write} onBlur={(e) => put(e.target.textContent, dish.nameDishe)}>{delays.avgPreparation}</p>
                        </div>
                    </div>
                )
            }

        });
    };



    const process = (write = false) => {

        const put = (value, nameDish) => {
            const newData = { ...dataState.delayToastPost }
            newData.categoryMetrics[nameDish].totalTickets = Number(value);
            put_delay(newData, dataState.delayToastPost.type);
        };



        return dishItem.map(dish => {
            const delays = dataState.delayToastPost.categoryMetrics[dish.nameDishe];


            if (!(dishItem.length > 2 && dishItem.length < 5)) {
                return (
                    <Fragment key={`tickes-${dish.nameDishe}`}>
                        <td className={styleCellBorder}>{dish.nameDishe} </td>
                        <td className={styleCellBorder}>
                            <p

                                contentEditable={write}
                                onBlur={(e) => put(e.target.textContent)}
                            >{delays.totalTickets}</p>|
                        </td>
                    </Fragment>
                )
            }
            return (
                <div className='w-full flex justify-between' key={`tickes-${dish.nameDishe}`}>

                    <div>
                        <p className='monotext text-gray-600 block'>{dish.nameDishe}:</p>
                    </div>
                    <div>
                        <p className='monotext font-medium min-w-[20px] text-right' contentEditable={write} onBlur={(e) => put(e.target.textContent, dish.nameDishe)}> {delays.totalTickets}</p>
                    </div>
                </div>
            )
        });
    };


    if (!config?.propMetricTableInToastPos) return null;


    /////////////////  TABLE METRIC
    return (
        <LayautNovelty
            namePage='Resumen general de métricas'
            styles={styles}
        >
            {
                dishItem.length > 2 && dishItem.length < 5 ?

                    <div className='w-full h-full'>
                        <div className='w-full h-full'>
                            <div className='w-full h-[50%] flex direction-row  justify-around'>
                                <div className='w-[48%] bg-white rounded-lg shadow-sm border border-gray p-[.5rem]'>
                                    <div className='w-full flex flex-row gap-[.5rem] text-lg font-semibold text-gray-800 border-b border-gray-200 pb-[.5rem] mb-[.5rem]'>
                                        <img className='w-[25px]' src={icoGrafic} alt='ico-grafuc' />
                                        <h2 className='w-full'>Resumen General</h2>
                                    </div>


                                    <div className='flex justify-between py-[.1rem] border-b border-gray-100 monotext'>
                                        <div className='w-[50%]'>
                                            <p className="w-full text-gray-600">Procesos evaluados</p>
                                        </div>
                                        <div className='w-[50%]'>
                                            <p style={{
                                                display: 'block',
                                                textAlign: 'end'
                                            }} className='font-medium text-gray-900' >{totalTiketDelay}</p>
                                        </div>
                                    </div>


                                    <div className='flex justify-between py-[.1rem] border-b border-gray-100 text-green-600 monotext'>
                                        <div className='w-[50%]'>
                                            <p style={{
                                                width: '100%',
                                                display: 'block',
                                                textAlign: 'start'
                                            }} className='w-full'>Demoras preparación:</p>
                                        </div>
                                        <div className='w-[50%]'>
                                            <p style={{
                                                display: 'block',
                                                textAlign: 'end'
                                            }} className='w-full font-medium'>{totalDelayToast}</p>
                                        </div>
                                    </div>

                                    <div className='flex justify-between py-[.1rem] text-green-600 monotext'>
                                        <div className='w-[50%]'>
                                            <p style={{
                                                display: 'block',
                                                textAlign: 'start'
                                            }} className='w-full'>Demoras en entrega:</p>
                                        </div>
                                        <div className='w-[50%]'>
                                            <p style={{
                                                display: 'block',
                                                textAlign: 'end'
                                            }} className='font-medium'>{totalDelayDelivety}</p>
                                        </div>
                                    </div>
                                </div>


                                <div className='w-[48%] bg-white rounded-lg shadow-sm border border-gray p-[.5rem]'>
                                    <div className='flex flex-row gap-[.5rem] text-lg font-semibold text-gray-800 border-b border-gray-200 pb-[.5rem] mb-[.5rem]'>
                                        <img className='w-[25px] h-[25px]' src={icoReloj} alt='ico-grafuc' />
                                        <h2>Tiempos Promedio</h2>
                                    </div>
                                    {
                                        average(true)
                                    }

                                </div>
                            </div>


                            <div className='w-full h-[50%] flex direction-row justify-center justify-around'>
                                <div className='w-[48%] bg-white rounded-lg shadow-sm border border-gray p-[.5rem]'>
                                    <div className='flex flex-row gap-[.5rem] text-lg font-semibold text-gray-800 border-b border-gray-200 pb-[.5rem] mb-[.5rem]'>
                                        <img className='w-[25px] h-[25px]' src={icoProcess} alt='ico-grafuc' />
                                        <h2>Procesos por Categoría</h2>
                                    </div>
                                    <div className='flex flex-col gap-[.2rem] justify-between py-[.1rem] border-b border-gray-100 monotext' key=''>
                                        {process(true)}
                                    </div>
                                </div>


                                <div className='w-[48%] bg-white rounded-lg shadow-sm border border-gray p-[.5rem]'>
                                    <div className='flex flex-row gap-[.5rem] text-lg font-semibold text-gray-800 border-b border-gray-200 pb-[.5rem] mb-[.5rem]'>
                                        <img className='w-[25px] h-[25px]' src={icoAlert} alt='ico-grafuc' />
                                        <h2>Demoras de preparación por categorias</h2>
                                    </div>
                                    <div className='bg-green-50 rounded-md p-3 mb-4'>
                                        {
                                            dishItem.map(dish => {
                                                const delay = dataState.delayToastPost.delay.filter(delay => delay.nameDish === dish.nameDishe);
                                                return (
                                                    <div className='flex justify-between py-[.1rem] border-b border-gray-100 monotext' key={`metric${dish.nameDishe}`}>
                                                        <div>
                                                            <p className='text-gray-600'>{dish.nameDishe}:</p>
                                                        </div>
                                                        <div>
                                                            <p className='font-medium text-green-600'>{delay.length}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })

                                        }
                                    </div>
                                    <div className='flex justify-between py-[.1rem] text-green'>
                                        <div>
                                            <span className='font-medium'>Total superaciones</span>
                                        </div>
                                        <div>
                                            <span className='font-medium monotext'>{totalDelayToast}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                    :

                    <div className='w-full h-full'>

                        <TabletLayaut>
                            <thead>
                                <tr style={{
                                    backgroundColor: styles?.bgTextBox ?? '#ffffff',
                                    color: styles?.colorTextBox ?? '#0000000',

                                }}>
                                    <th className={styleCellBorder} style={{ padding: '.5rem 0rem' }}>
                                        <div className='flex justify-center items-center gap-[.3rem]'>
                                            <img src={foodIco} alt='ico-time' className='w-[20px] h-[20px]' />
                                            <p>Categoría</p>
                                        </div>
                                    </th>

                                    <th className={styleCellBorder}>
                                        <div className='flex justify-center items-center gap-[.3rem]'>
                                            <img src={icoReloj} alt='ico-time' className='w-[20px] h-[20px]' />
                                            <p>Tiempo promedio</p>
                                        </div>
                                    </th>

                                    <th className={styleCellBorder}>
                                        <div className='flex justify-center items-center gap-[.3rem]'>
                                            <img src={icoProcess} alt='ico-time' className='w-[20px] h-[20px]' />
                                            <p>Procesos registrado</p>
                                        </div>
                                    </th>

                                    <th className={styleCellBorder}>
                                        <div className='flex justify-center items-center gap-[.3rem]'>
                                            <img src={alertIco} alt='ico-time' className='w-[20px] h-[20px]' />
                                            <p>Demoras</p>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dishItem.map(dish => {
                                        const summary = dataState.delayToastPost.categoryMetrics[dish.nameDishe];
                                        const delay = dataState.delayToastPost.delay.filter(delay => delay.nameDish === dish.nameDishe);

                                        return (
                                            <Fragment key={dish.nameDishe}>
                                                <tr>
                                                    <td className={styleCellBorder}>{dish.nameDishe} </td>
                                                    <td className={styleCellBorder}>
                                                        <p

                                                            contentEditable
                                                            onBlur={(e) => putAverage(e.target.textContent, [dish.nameDishe])}
                                                        >{summary.avgPreparation}</p>
                                                    </td>

                                                    <td className={styleCellBorder}>
                                                        <p contentEditable onBlur={e => {
                                                            putTiketsTotal(e.target.textContent, dish.nameDishe)
                                                        }}
                                                        >{summary.totalTickets}</p>
                                                    </td>


                                                    <td className={styleCellBorder}>{delay.length}</td>
                                                </tr>
                                            </Fragment>
                                        )
                                    })
                                }
                                <tr>
                                    <td colSpan={3} className={styleCellBorder}
                                        style={{
                                            backgroundColor: '#ddd'
                                        }}
                                    >Total de procesos evaluados </td>

                                    <td className={styleCellBorder}
                                        style={{
                                            fontWeight: '700'
                                        }}
                                    >{totalTiketDelay}</td>
                                </tr>

                                <tr>
                                    <td
                                        colSpan={3}
                                        className={styleCellBorder}
                                        style={{
                                            backgroundColor: '#ddd'
                                        }}
                                    >Total de demoras en preparación </td>
                                    <td
                                        className={styleCellBorder}
                                        style={{
                                            color: totalProcess().totalDelayToasd > 1 ? 'red' : '#000000',
                                            fontWeight: '700'
                                        }}

                                    >{totalDelayToast}</td>
                                </tr>


                                <tr>
                                    <td
                                        colSpan={3}
                                        className={styleCellBorder}
                                        style={{
                                            backgroundColor: '#ddd'
                                        }}
                                    > Total de demoras en entrega de plato </td>
                                    <td className={styleCellBorder}
                                        style={{
                                            fontWeight: '700'
                                        }}
                                    >{totalDelayDelivety}</td>
                                </tr>
                            </tbody>
                        </TabletLayaut>
                    </div>
            }
        </LayautNovelty>
    );
});