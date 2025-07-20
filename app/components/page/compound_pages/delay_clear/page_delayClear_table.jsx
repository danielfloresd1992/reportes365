import { useContext, useEffect, useMemo, useState, useRef } from 'react';
import Image from '../../../image_for_page/image';
import LayautNovelty from '../../../layaut/LayautPage';
import TableFourCol from '../../../table/table';
import TimeOperator from '../../../../lib/time';
import PageForDelayClearImage from '../delay_clear/page_delayClearImage';
import tranUrlToLocal from '../../../../lib/fetching/transUrlLocal';
import useDataForPages from '../../../../hook/useDataForPages';
import { myUserContext } from '../../../../context/sessionContext';
import { chunkArray } from '../../../../lib/dataParser/arr';
import useFindArticle from '../../../../hook/find_to_asidebar';



export default function PageDelayClearTable({ styles, dataList, setData, saveImgProp, typeDelay, config }) {


    if (!dataList?.body) return null;


    const { delay1attention } = useDataForPages();
    const { dataSessionState } = useContext(myUserContext);
    const refElement = useRef(null);
    const [styleStateText, setStyleState] = useState({});
    const [styleBoxHeightState, setStyleBoxHeightState] = useState();
    const { findNovelty } = useFindArticle();

    const textStyle = {
        color: dataList?.body?.length > 1 && dataList?.body?.length < 4 ? '#fff' : "#000000",
        textShadow: dataList?.body?.length > 1 && dataList?.body?.length < 4 ?
            `
        -.8px -.8px 0 rgb(0, 0, 0),
         .8px -.8px 0 rgb(29, 24, 24),
        -.8px .8px 0 rgb(0, 0, 0),
         .8px .8px 0 rgb(0, 0, 0)
        `
            :
            `
          -.8px -.8px 0 rgb(255, 255, 255),
           .8px -.8px 0 rgb(255, 255, 255),
          -.8px .8px 0 rgb(255, 255, 255),
           .8px .8px 0 rgb(255, 255, 255)
        `,
        fontWeight: 700
    };



    useEffect(() => {
        setStyleState({
            position: dataList?.body?.length === 1 ? 'absolute' : 'unset',
            top: dataList?.body?.length === 1 ? '110px' : 'revert-layer'
        });
        setStyleBoxHeightState(dataList?.body?.length === 1 ? '300px' : 'revert-layer')
    }, [dataList]);



    const titleClean = dataList?.namePageTable ?? (dataList?.body?.length > 1 ?
        `Mesas con demoras superior ${TimeOperator.timePeriod(config?.timeDelayClean ?? '00:00:00')} en ser limpiadas`
        :
        `Mesa con demoras superior a ${TimeOperator.timePeriod(config?.timeDelayClean ?? '00:00:00')} en ser limpiada`);


    const title1Atention = dataList?.namePageTable ?? (dataList?.body?.length > 1 ?
        `Mesas con demoras superior a ${TimeOperator.timePeriod(config?.time1Attention ?? '00:00:00')} en ser atendidas`
        :
        `Mesa con demoras superior a ${TimeOperator.timePeriod(config?.time1Attention ?? '00:00:00')} en ser atendida`);


    const objectDelay = dataList?.body[0];
    const initTime = typeof objectDelay?.timePeriod === 'string' ? JSON.parse(objectDelay?.timePeriod) : objectDelay?.timePeriod;



    const data = dataList?.body[0] && dataList.body[0].timePeriod ?
        dataList.body.sort((a, b) => {
            const timeA = typeof a.timePeriod === 'string' ?
                TimeOperator.calculateTime(JSON.parse(a.timePeriod).init, JSON.parse(a.timePeriod).end).split(':').reduce((acc, time) => (60 * acc) + +time)
                :
                TimeOperator.calculateTime(a.timePeriod.init, a.timePeriod.end).split(':').reduce((acc, time) => (60 * acc) + +time)
            const timeB = typeof b.timePeriod === 'string' ?
                TimeOperator.calculateTime(JSON.parse(b.timePeriod).init, JSON.parse(b.timePeriod).end).split(':').reduce((acc, time) => (60 * acc) + +time)
                :
                TimeOperator.calculateTime(b.timePeriod.init, b.timePeriod.end).split(':').reduce((acc, time) => (60 * acc) + +time)
            return timeB - timeA;
        })
        :
        null;




    const saveCoordinate = (coordinates, index) => {
        if (!Array.isArray(dataList?.coordinates)) dataList.coordinates = [];
        dataList.coordinates[index] = coordinates;
        setData({ coordinates: [...dataList.coordinates] });
    };




    const editCell = (index, propiety) => {
        const newBody = [...dataList.body];
        newBody[index] = { ...newBody[index], ...propiety }
        setData({ body: newBody });
    };


    const addRow = () => {
        const newRow = delay1attention.data.body[0];
        newRow.createdAt = TimeOperator.returnTimeIso();
        newRow.createBy = `${dataSessionState.dataSession.name} ${dataSessionState.dataSession.surName}`;
        const newBody = [...dataList.body, newRow];
        setData({ body: newBody });
    };


    const removeRow = (index) => {
        const newBody = [...dataList.body];
        newBody.splice(index, 1);
        setData({ body: newBody });
    };


    if (refElement.current) refElement.current.style.height = styleBoxHeightState;
    if (dataList.body < 1) return null;


    return chunkArray(data, 10).map((arr) => (
        arr.length < 1 ?
            null
            :
            <LayautNovelty styles={styles} namePage={dataList?.body?.length === 1 ? '' : (typeDelay === 'clean' ? titleClean : title1Atention)} editTitle={value => setData({ namePageTable: value })}
                getElementLayaut={(element) => {
                    refElement.current = element.current;
                }}
            >
                <div className='w-[95%] h-[95%] p-[1rem] flex flex-col items-center justify-between gap-[1rem]'>
                    {
                        dataList?.body?.length === 1 ?
                            null
                            :
                            <TableFourCol header={dataList?.header} body={arr} editCellProp={editCell} addRowProp={addRow} deleteRowProp={removeRow} styles={styles} />
                    }
                    {
                        dataList?.body?.length < 4 ?
                            <div className='h-[100%] w-full flex gap-4 flex-col items-center justify-center'
                                title='Doble click aqui para buscar en el muro de alertas'
                                onDoubleClick={() => { findNovelty(dataList?.body[0]._id) }}
                            >
                                <div className='w-full flex flex-col items-center'
                                    style={styleStateText}
                                >
                                    {
                                        <>
                                            {
                                                dataList?.body?.length === 1 ?
                                                    <p className='text-xl font-medium' style={textStyle}>{typeDelay === 'clean' ? titleClean : title1Atention}</p>
                                                    :
                                                    <p className='text-xl font-medium' style={textStyle}>{typeDelay === 'clean' ? 'Mesa con mayor demora en ser limpiada' : 'Mesa con mayor demora en ser atendida'}</p>
                                            }
                                            <p className='text-xl font-medium' style={textStyle}>{`Mesa ${dataList?.body[0].table} (Desde: ${initTime?.init} - Hasta: ${initTime?.end}) Duración: ${TimeOperator.calculateTime(initTime?.init, initTime?.end)}`}</p>
                                        </>
                                    }
                                </div>
                                <div className='w-full flex gap-4 w-full items-center justify-center'>

                                    <Image
                                        h_full={true}
                                        full={true}
                                        caption={typeDelay === 'clean' ? 'Desocupa' : 'Ocupa'}
                                        setSrc={Array.isArray(dataList?.body[0].imageUrl) ? tranUrlToLocal(dataList?.body[0].imageUrl[0].url) : null}
                                        styles={styles}
                                        arrowCordernate={true}
                                        setCoordinates={Array.isArray(dataList?.coordinates) ? dataList?.coordinates[0] : null}
                                        getFile={(data) => saveImgProp({ file: data, indexBody: 0, indexImg: 0 })}
                                        saveCordenate={(data) => saveCoordinate(data, 0)}
                                        index={0}
                                    />
                                    <Image
                                        h_full={true}
                                        full={true}
                                        caption={typeDelay === 'clean' ? 'Limpieza' : 'Primera atención'}
                                        setSrc={Array.isArray(dataList?.body[0].imageUrl) ? tranUrlToLocal(dataList?.body[0].imageUrl[1].url) : null}
                                        styles={styles}
                                        arrowCordernate={true}
                                        setCoordinates={Array.isArray(dataList?.coordinates) ? dataList?.coordinates[1] : null}
                                        getFile={(data) => saveImgProp({ file: data, indexBody: 0, indexImg: 1 })}
                                        saveCordenate={(data) => saveCoordinate(data, 1)}
                                        index={1}
                                    />
                                </div>
                            </div>
                            :
                            null
                    }
                </div>
            </LayautNovelty>
    ))
}