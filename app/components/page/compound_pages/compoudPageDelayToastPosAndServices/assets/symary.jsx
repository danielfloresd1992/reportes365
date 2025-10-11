import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LayautNovelty from '../../../../layaut/LayautPage';


import icoGrafic from '../../../../../../public/ico/ico_page_metric/icons8-gráfico-combinado-48.png';
import icoReloj from '../../../../../../public/ico/icons8-reloj-50.png';
import icoProcess from '../../../../../../public/ico/icons8-proceso-50.png';
import icoAlert from '../../../../../../public/ico/ico_page_metric/icons8-alerta-96.png';
import Image from '../../../../image_for_page/image';
import alertIco from '../../../../../../public/ico/icons8-alarma-50.png';
import foodIco from '../../../../../../public/ico/icons8-comida-64.png';







export default function Summary({ dataState, dishItem, styles, config, editCell }) {


    const establishmentStore = useSelector(store => store.establishmentDocument);
    const [bodyState, setBodyState] = useState(null);
    const [entriesNameState, setEntriesNameState] = useState([]);
    const [ImgesState, setImageState] = useState([]);


    const styleCellBorder = 'border border-black text-lg';
    const styleCellBorderR = 'text-center border-r border-r-solid border-r-black';
    const styleCell = 'text-center w-1/3';
    const fontSizes = { fontSize: '1.2rem' };




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




    const pipeObjectTime = (data, invert) => {
        if (!data) return null;
        const returnArr = [];

        data.forEach(delay => {
            if (invert) {
                delay.timePeriod.tomaOrden = delay.timePeriod.init;
                delay.timePeriod.listoTablet = delay.timePeriod.end;
            }
            else {
                delay.timePeriod.init = delay.timePeriod.tomaOrden;
                delay.timePeriod.end = delay.timePeriod.listoTablet;
            }

            returnArr.push(delay);
        });
        return returnArr;
    };




    const parserPipeOneObject = (data, invert) => {
        if (!data) return null;
        const delay = { ...data };
        if (delay.timePeriod && invert) {
            delay.timePeriod.tomaOrden = delay.timePeriod.init;
            delay.timePeriod.listoTablet = delay.timePeriod.end;
        }
        else if (delay.timePeriod) {
            delay.timePeriod.init = delay.timePeriod.tomaOrden;
            delay.timePeriod.end = delay.timesPeriod.listoTablet;
        }
        return delay;
    };





    console.log(config);
    if (!config?.propMetricTableInToastPos) return null;


    /////////////////  TABLE METRIC
    return (
        <LayautNovelty
            namePage='Resumen general de métricas'
            styles={styles}
        >
            {
                dishItem.length > 2 && dishItem.length < 5 ?

                    <div className="w-full h-full">
                        <div className="w-full h-full">
                            <div className='w-full h-[50%] flex direction-row  justify-around'>
                                <div className="w-[48%] bg-white rounded-lg shadow-sm border border-gray p-[.5rem]">
                                    <div className='w-full flex flex-row gap-[.5rem] text-lg font-semibold text-gray-800 border-b border-gray-200 pb-[.5rem] mb-[.5rem]'>
                                        <img className='w-[25px]' src={icoGrafic} alt='ico-grafuc' />
                                        <h2 className="w-full">Resumen General</h2>
                                    </div>


                                    <div className="flex justify-between py-[.1rem] border-b border-gray-100 monotext">
                                        <div className='w-[50%]'>totalProces
                                            <p className="w-full text-gray-600">Procesos evaluados</p>
                                        </div>
                                        <div className='w-[50%]'>
                                            <p style={{
                                                display: 'block',
                                                textAlign: 'end'
                                            }} className="font-medium text-gray-900 " >{/*dishItem.length > 1 ? (bodyState['take out'] ? (totalProcess().totalProcess - bodyState['take out'].totalProcess) : totalProcess().totalProcess) : 0*/}</p>
                                        </div>
                                    </div>


                                    <div className="flex justify-between py-[.1rem] border-b border-gray-100 text-green-600 monotext">
                                        <div className='w-[50%]'>
                                            <p style={{
                                                width: '100%',
                                                display: 'block',
                                                textAlign: 'start'
                                            }} className='w-full'>Demoras preparación</p>
                                        </div>
                                        <div className='w-[50%]'>
                                            <p style={{
                                                display: 'block',
                                                textAlign: 'end'
                                            }} className="w-full font-medium"></p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between py-[.1rem] text-green-600 monotext">
                                        <div className='w-[50%]'>
                                            <p style={{
                                                display: 'block',
                                                textAlign: 'start'
                                            }} className='w-full'>Demoras en entrega</p>
                                        </div>
                                        <div className='w-[50%]'>
                                            <p style={{
                                                display: 'block',
                                                textAlign: 'end'
                                            }} className="font-medium"></p>
                                        </div>
                                    </div>
                                </div>


                                <div className="w-[48%] bg-white rounded-lg shadow-sm border border-gray p-[.5rem]">
                                    <div className='flex flex-row gap-[.5rem] text-lg font-semibold text-gray-800 border-b border-gray-200 pb-[.5rem] mb-[.5rem]'>
                                        <img className='w-[25px] h-[25px]' src={icoReloj} alt='ico-grafuc' />
                                        <h2>Tiempos Promedio</h2>
                                    </div>

                                    {
                                        dishItem.map((dish) => (
                                            <div className="flex justify-between py-[.1rem] border-b border-gray-100 monotext" key=''>
                                                <div>
                                                    <p className="text-gray-600"></p>
                                                </div>
                                                <div>
                                                    <p
                                                        className="monotext text-gray-900"
                                                        contentEditable
                                                        onBlur={e => {
                                                            const newBody = { ...dataProp.data };
                                                            newBody.body[entry].average = e.target.textContent;
                                                            updateDataProp(newBody, (data, error) => {

                                                            });
                                                        }}
                                                    ></p>
                                                </div>

                                            </div>
                                        ))
                                    }
                                </div>
                            </div>


                            <div className='w-full h-[50%] flex direction-row justify-center justify-around'>
                                <div className="w-[48%] bg-white rounded-lg shadow-sm border border-gray p-[.5rem]">
                                    <div className='flex flex-row gap-[.5rem] text-lg font-semibold text-gray-800 border-b border-gray-200 pb-[.5rem] mb-[.5rem]'>
                                        <img className='w-[25px] h-[25px]' src={icoProcess} alt='ico-grafuc' />
                                        <h2>Procesos por Categoría</h2>
                                    </div>

                                    {
                                        dishItem.map((dish) => (
                                            <div className='flex justify-between py-[.1rem] border-b border-gray-100 monotext' key=''>
                                                <div>
                                                    <p className='text-gray-600'></p>
                                                </div>
                                                <div>
                                                    <p className='font-medium text-gray-900 ' contentEditable onBlur={e => {
                                                        const newBody = { ...dataProp.data };
                                                        newBody.body[entry].totalProcess = Number(e.target.textContent);
                                                        updateDataProp(newBody, (data, error) => {

                                                        });
                                                    }}
                                                    ></p>
                                                </div>

                                            </div>
                                        ))
                                    }
                                </div>


                                <div className="w-[48%] bg-white rounded-lg shadow-sm border border-gray p-[.5rem]">
                                    <div className='flex flex-row gap-[.5rem] text-lg font-semibold text-gray-800 border-b border-gray-200 pb-[.5rem] mb-[.5rem]'>
                                        <img className='w-[25px] h-[25px]' src={icoAlert} alt='ico-grafuc' />
                                        <h2>Demoras por categorias</h2>
                                    </div>
                                    <div className="bg-green-50 rounded-md p-3 mb-4">
                                        {
                                            dishItem.map(dish => (
                                                <div className="flex justify-between py-[.1rem] border-b border-gray-100 monotext" key=''>
                                                    <div>
                                                        <p className="text-gray-600"></p>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-green-600">
                                                            {

                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="flex justify-between py-[.1rem] text-green ">
                                        <div>
                                            <span className="font-medium">Total superaciones</span>
                                        </div>
                                        <div>
                                            <span className="font-medium monotext"></span>
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
                                    dishItem.map(dish => (
                                        <tr key={dish.nameDish}>
                                            <td className={styleCellBorder}> </td>
                                            <td className={styleCellBorder}>
                                                <p
                                                    contentEditable
                                                    onBlur={e => {
                                                        const newBody = { ...dataProp.data };
                                                        newBody.body[dish].average = e.target.textContent;
                                                        updateDataProp(newBody, (data, error) => {
                                                            setBodyState(data);
                                                        });
                                                    }}
                                                ></p>
                                            </td>


                                            <td className={styleCellBorder}>
                                                <p contentEditable onBlur={e => {
                                                    const newBody = { ...dataProp.data };
                                                    newBody.body[dish].totalProcess = Number(e.target.textContent);
                                                    updateDataProp(newBody, (data, error) => {
                                                        setBodyState(data);
                                                    });
                                                }}
                                                ></p>
                                            </td>


                                            <td className={styleCellBorder}></td>
                                        </tr>
                                    ))
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
                                    >

                                    </td>
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

                                    ></td>
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
                                    ></td>
                                </tr>
                            </tbody>
                        </TabletLayaut>
                    </div>
            }
        </LayautNovelty>
    );
}