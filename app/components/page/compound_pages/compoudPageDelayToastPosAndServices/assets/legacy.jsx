import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect, useRef, memo, useCallback } from 'react';

import LayautNovelty from '../../../../layaut/LayautPage';
import TabletLayaut from '../../../../table/table_layaut';
import TableFourCol from '../../../../table/table';

import { pipeObjectTime, parserPipeOneObject, order } from '../../../../../lib/dataParser/dataForNovelty';
import { chunkArr, chunkArray } from '../../../../../lib/dataParser/arr';




export default function Legacy({ bodyState, dishItem }) {



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





    const addRowDelay = useCallback((typeFood, typeDelay) => {
        const row = {
            _id: uuidv4(),
            table: '0',
            imageToShare: null,
            createdAt: TimeOperator.returnTimeIso(),
            nameDish: typeFood,
            timePeriod: {
                tomaOrden: '00:00:00',
                listoTablet: '00:00:00',
                listoCocina: '00:00:00',
                EntregaPLato: '00:00:00',
                timeTotal: null
            }

        };
        const newBody = { ...dataProp.data };

        if (typeDelay === 'delivery') {
            row.imageUrl = [
                { _id: uuidv4(), caption: 'Toma de Orden', url: null, index: 0 },
                { _id: uuidv4(), caption: 'Listo en cocina', url: null, index: 1 },
                { _id: uuidv4(), caption: 'Listo en tablet', url: null, index: 2 },
                { _id: uuidv4(), caption: 'Entrega de plato', url: null, index: 3 }
            ]
            if (!newBody.body?.delayDeliveryDishWhenItIsReadyInKitchen?.delay) {
                newBody.body['delayDeliveryDishWhenItIsReadyInKitchen'].delay = [];
            }
            newBody.body['delayDeliveryDishWhenItIsReadyInKitchen'].delay.push(row);
        }
        else {
            newBody.body[typeFood].delay.push(row);
        }


        updateDataProp(newBody, (data, error) => {
            setBodyState(data);
        });

    }, [bodyState]);





    const deleteDelayInTable = useCallback((id, typeFood) => {
        if (!dataProp) return null;
        const newBody = { ...dataProp.data };
        newBody.body[typeFood].delay = newBody.body[typeFood].delay.filter(delay => delay._id !== id);
        updateDataProp(newBody, (data, error) => {
            console.log(error);
            setBodyState(data);
        });

    }, []);



    console.log(bodyState);






    const getNewUrlImg = useCallback((file, dataParams) => {
        console.log(file);
        console.log(dataParams);

        /*
        sendImg(file)
            .then(response => {
 
                if (dataParams.delay === 'delayDeliveryDishWhenItIsReadyInKitchen') {
                    const newData = { ...dataParams.data };
                    newData.imageUrl[dataParams.index].url = response.data.urlFile;
                    editCell(dataParams.id, newData, 'delayDeliveryDishWhenItIsReadyInKitchen');
                }
                else {
 
                    editCell(dataParams.id, { ...dataParams.data, imageToShare: response.data.urlFile }, dataParams.delay);
                }
            })
            .catch(error => {
                console.log(error);
            })
            */
    }, []);




    const returnImg = (delay, typeFood) => {
        if (delay.length > 3) return null;
        const styleImg = {};
        if (delay.length === 1) {
            styleImg.width = '100%';
            styleImg.height = '330px'
        }
        else if (delay.length === 2) styleImg.height = '300px';
        else if (delay.length === 3) styleImg.height = '250px';

        return (
            <div className='flex justify-center items-center gap-4 w-full'>
                {
                    delay.sort((a, b) => TimeOperator.changueTimeMiliSecond(TimeOperator.calculateTime(b?.timePeriod?.init, b?.timePeriod?.end)) - TimeOperator.changueTimeMiliSecond(TimeOperator.calculateTime(a?.timePeriod?.init, a?.timePeriod?.end))).map((image, index) => (
                        <Image
                            item={index}
                            style={styleImg}
                            setSrc={tranUrlToLocal(image.imageToShare)}
                            getFile={data => getNewUrlImg(data, { delay: typeFood, data: image, id: image._id })}
                            index={index}
                            arrowCordernate={false}
                            caption={delay.length === 1 ? null : `Mesa: ${image.table}`}
                            key={index}
                            boubleClickEvent={() => findNovelty(image._id)}
                        />
                    ))
                }
            </div>
        );
    };


    return null;



    return (
        <>

            {
                config?.propMetricTableInToastPos ?
                    <>
                        <LayautNovelty
                            namePage='Resumen general de métricas'
                            styles={styles}
                        >
                            {
                                entriesNameState.length > 2 && entriesNameState.length < 5 ?

                                    <div className="w-full h-full">
                                        <div className="w-full h-full">
                                            <div className='w-full h-[50%] flex direction-row  justify-around'>
                                                <div className="w-[48%] bg-white rounded-lg shadow-sm border border-gray p-[.5rem]">
                                                    <div className='w-full flex flex-row gap-[.5rem] text-lg font-semibold text-gray-800 border-b border-gray-200 pb-[.5rem] mb-[.5rem]'>
                                                        <img className='w-[25px]' src={icoGrafic} alt='ico-grafuc' />
                                                        <h2 className="w-full">Resumen General</h2>
                                                    </div>


                                                    <div className="flex justify-between py-[.1rem] border-b border-gray-100 monotext">
                                                        <div className='w-[50%]'>
                                                            <p className="w-full text-gray-600">Procesos evaluados</p>
                                                        </div>
                                                        <div className='w-[50%]'>
                                                            <p style={{
                                                                display: 'block',
                                                                textAlign: 'end'
                                                            }} className="font-medium text-gray-900 " >{entriesNameState.length > 1 ? (bodyState['take out'] ? (totalProcess().totalProcess - bodyState['take out'].totalProcess) : totalProcess().totalProcess) : 0}</p>
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
                                                            }} className="w-full font-medium">{entriesNameState.length > 1 ? totalProcess().totalDelayToasd : 0}</p>
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
                                                            }} className="font-medium">{bodyState?.delayDeliveryDishWhenItIsReadyInKitchen?.delay && bodyState?.delayDeliveryDishWhenItIsReadyInKitchen?.delay?.length || 0}</p>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="w-[48%] bg-white rounded-lg shadow-sm border border-gray p-[.5rem]">
                                                    <div className='flex flex-row gap-[.5rem] text-lg font-semibold text-gray-800 border-b border-gray-200 pb-[.5rem] mb-[.5rem]'>
                                                        <img className='w-[25px] h-[25px]' src={icoReloj} alt='ico-grafuc' />
                                                        <h2>Tiempos Promedio</h2>
                                                    </div>

                                                    {
                                                        entriesNameState.map((entry, index) => (
                                                            <div className="flex justify-between py-[.1rem] border-b border-gray-100 monotext" key={entry}>
                                                                <div>
                                                                    <p className="text-gray-600">{entry}</p>
                                                                </div>
                                                                <div>
                                                                    <p
                                                                        className="monotext text-gray-900"
                                                                        contentEditable
                                                                        onBlur={e => {
                                                                            const newBody = { ...dataProp.data };
                                                                            newBody.body[entry].average = e.target.textContent;
                                                                            updateDataProp(newBody, (data, error) => {
                                                                                setBodyState(data);
                                                                            });
                                                                        }}
                                                                    >{bodyState[entry] && bodyState[entry].average}</p>
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
                                                        entriesNameState.map((entry, index) => (
                                                            <div className='flex justify-between py-[.1rem] border-b border-gray-100 monotext' key={entry}>
                                                                <div>
                                                                    <p className='text-gray-600'>{entry}</p>
                                                                </div>
                                                                <div>
                                                                    <p className='font-medium text-gray-900 ' contentEditable onBlur={e => {
                                                                        const newBody = { ...dataProp.data };
                                                                        newBody.body[entry].totalProcess = Number(e.target.textContent);
                                                                        updateDataProp(newBody, (data, error) => {
                                                                            setBodyState(data);
                                                                        });
                                                                    }}
                                                                    >{bodyState[entry] && bodyState[entry].totalProcess}</p>
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
                                                            entriesNameState.map((entry, index) => (
                                                                <div className="flex justify-between py-[.1rem] border-b border-gray-100 monotext" key={entry}>
                                                                    <div>
                                                                        <p className="text-gray-600">{entry}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="font-medium text-green-600">
                                                                            {
                                                                                bodyState[entry] && bodyState[entry].delay.length
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
                                                            <span className="font-medium monotext">{totalProcess().totalDelayToasd}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                    :

                                    <div className='w-full h-full'>
                                        {
                                            console.log(styles)
                                        }
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
                                                    entriesNameState.map(entrie => (
                                                        <tr key={entrie}>
                                                            <td className={styleCellBorder}> {entrie} </td>
                                                            <td className={styleCellBorder}>
                                                                <p
                                                                    contentEditable
                                                                    onBlur={e => {
                                                                        const newBody = { ...dataProp.data };
                                                                        newBody.body[entrie].average = e.target.textContent;
                                                                        updateDataProp(newBody, (data, error) => {
                                                                            setBodyState(data);
                                                                        });
                                                                    }}
                                                                >{bodyState[entrie] && bodyState[entrie].average}</p>
                                                            </td>


                                                            <td className={styleCellBorder}>
                                                                <p contentEditable onBlur={e => {
                                                                    const newBody = { ...dataProp.data };
                                                                    newBody.body[entrie].totalProcess = Number(e.target.textContent);
                                                                    updateDataProp(newBody, (data, error) => {
                                                                        setBodyState(data);
                                                                    });
                                                                }}
                                                                >{bodyState[entrie] && bodyState[entrie].totalProcess}</p>
                                                            </td>


                                                            <td className={styleCellBorder}>{bodyState[entrie] && bodyState[entrie].delay.length}</td>
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
                                                        {totalProcess().totalProcess}
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

                                                    >{totalProcess().totalDelayToasd}</td>
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
                                                    >{bodyState?.delayDeliveryDishWhenItIsReadyInKitchen?.delay && bodyState?.delayDeliveryDishWhenItIsReadyInKitchen?.delay?.length || 0}</td>
                                                </tr>
                                            </tbody>
                                        </TabletLayaut>
                                    </div>
                            }

                        </LayautNovelty>
                    </>
                    :
                    <div className='w-full'>

                    </div>


            }

            {
                Object.entries(bodyState).map(([key, value]) => (
                    entriesNameState.findIndex(foodName => foodName === key) > -1 && value.delay.length > 0 ?
                        <>
                            {
                                chunkArray(order(pipeObjectTime(value.delay)), 10).map(arr => (
                                    arr.length === 0 ?
                                        null
                                        :
                                        <LayautNovelty
                                            namePage={`Demora en preparación de ${key}`}
                                            key={key}
                                            styles={styles}
                                        >
                                            <div
                                                className='w-[95%] h-[95%] p-[1rem] flex flex-col items-center justify-between gap-[1rem]'
                                                onClick={() => pipeObjectTime(value.delay)}

                                            >
                                                <TableFourCol
                                                    header={dataProp?.data?.header ?? []}
                                                    body={arr}
                                                    addRowProp={() => addRowDelay(key)}
                                                    editCellProp={(index, data) => editCell(data._id, data, key)}
                                                    deleteRowProp={(index, delay) => deleteDelayInTable(delay._id, key)}
                                                    styles={styles}
                                                />
                                                {
                                                    returnImg(order(value.delay), key)
                                                }
                                            </div>
                                        </LayautNovelty>
                                ))
                            }


                            {
                                value.delay.length > 3 ?
                                    chunkArr(order(value.delay)).map(arr => (
                                        <LayautNovelty
                                            namePage={`Demora en preparación de ${key}`}
                                            key={key}
                                            styles={styles}
                                            children={{
                                                callbackDelete: () => { },
                                                deleteOnSwipe: true
                                            }}
                                        >
                                            <div className='w-full h-full flex justify-center items-center flex-wrap gap-[.5rem]'>
                                                {
                                                    arr.sort((a, b) => TimeOperator.changueTimeMiliSecond(TimeOperator.calculateTime(b.startTime || b?.timePeriod?.init, b.endTime || b?.timePeriod?.end)) - TimeOperator.changueTimeMiliSecond(TimeOperator.calculateTime(a.startTime || a?.timePeriod?.init, a.endTime || a?.timePeriod?.end))).map((image, index) => (
                                                        <Image
                                                            style={{
                                                                width: '48%',
                                                                height: '48%'
                                                            }}
                                                            setSrc={tranUrlToLocal(image.imageToShare)}
                                                            caption={`Mesa: ${image.table}`}
                                                            getFile={data => getNewUrlImg(data, { delay: key, data: image, id: image._id, index: index })}
                                                            boubleClickEvent={() => findNovelty(image._id)}
                                                        />
                                                    ))
                                                }
                                            </div>
                                        </LayautNovelty>
                                    ))
                                    :
                                    null
                            }
                        </>
                        :
                        null
                ))
            }
            {
                Array.isArray(bodyState?.delayDeliveryDishWhenItIsReadyInKitchen?.delay) && bodyState?.delayDeliveryDishWhenItIsReadyInKitchen?.delay?.length > 0 ?
                    bodyState?.delayDeliveryDishWhenItIsReadyInKitchen && bodyState?.delayDeliveryDishWhenItIsReadyInKitchen?.delay.map((delayDelivery, indexDelay) => (
                        <LayautNovelty
                            onSwipeRight={{
                                callbackDelete: () => {
                                    deleteDelayInTable(delayDelivery._id, 'delayDeliveryDishWhenItIsReadyInKitchen');
                                },
                                deleteOnSwipe: true
                            }}
                            styles={styles}
                            namePage=''
                            key={delayDelivery._id}
                            boubleClickEvent={() => findNovelty(delayDelivery._id)}
                        >
                            <div className='w-full h-full flex flex-wrap item-center justify-center gap-[.5rem]' onClick={() => console.log(delayDelivery)}>
                                <div className='w-full flex justify-center'>
                                    <div className='w-[70%]'>
                                        <Title styles={styles}>

                                            <p style={{ color: styles?.colorTextBox ?? '#000000' }}>Demora en entrega de {delayDelivery.nameDish ?? 'plato'} - mesa:
                                                <input
                                                    className='unstyledInput w-[20px]'
                                                    style={{ width: '30px' }}
                                                    type='text'
                                                    onChange={e => {
                                                        editCell(delayDelivery._id, { table: Number(e.target.value) }, 'delayDeliveryDishWhenItIsReadyInKitchen')
                                                    }}
                                                    value={delayDelivery.table ?? 'N/A'}

                                                />
                                            </p>
                                        </Title>
                                    </div>
                                </div>
                                {
                                    delayDelivery.imageUrl.map((imgObject, indexImage) => (
                                        <Image
                                            key={imgObject._id}
                                            caption={imgObject.caption}
                                            styles={styles}
                                            setSrc={tranUrlToLocal(imgObject.url)}
                                            title={
                                                delayDelivery.timePeriod ? (indexImage === 0 ? delayDelivery.timePeriod.tomaOrden : (indexImage === 1 ? delayDelivery.timePeriod.listoCocina : ((indexImage === 2 ? delayDelivery.timePeriod.listoTablet : delayDelivery.timePeriod.entregaPlato)))) : ''
                                            }
                                            getFile={data => getNewUrlImg(data, { delay: 'delayDeliveryDishWhenItIsReadyInKitchen', data: delayDelivery, id: delayDelivery._id, index: indexImage })}
                                            arrowCordernate={true}
                                            setCoordinates={imgObject?.coordinates ? imgObject.coordinates : null}
                                            saveCordenate={data => {
                                                const newData = { imageUrl: [...delayDelivery.imageUrl] }
                                                newData.imageUrl[indexImage].coordinates = data;
                                                editCell(delayDelivery._id, newData, 'delayDeliveryDishWhenItIsReadyInKitchen');
                                            }}
                                            boubleClickEvent={() => findNovelty(delayDelivery._id)}
                                        />
                                    ))
                                }
                                <div className='w-full flex justify-center'>
                                    <div className='w-[50%]'>
                                        <Title styles={styles}>
                                            <p style={{ color: styles?.colorTextBox ?? '#000000' }}>Duración:
                                                <input
                                                    className='unstyledInput'
                                                    style={{ width: '75px' }}
                                                    type='text'
                                                    onChange={e => {
                                                        editCell(delayDelivery._id, { timePeriod: { ...delayDelivery.timePeriod, timeTotal: e.target.value } }, 'delayDeliveryDishWhenItIsReadyInKitchen');
                                                    }}
                                                    value={`${delayDelivery?.timePeriod?.timeTotal ?? TimeOperator.calculateTime(delayDelivery.timePeriod.listoCocina, delayDelivery.timePeriod.entregaPlato)}`}
                                                />
                                            </p>
                                        </Title>

                                    </div>
                                </div>
                            </div>
                        </LayautNovelty>
                    ))
                    :
                    null
            }
        </>
    );
}