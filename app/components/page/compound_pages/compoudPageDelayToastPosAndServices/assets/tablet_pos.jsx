import { useCallback } from 'react';

import { v4 as uuidv4 } from 'uuid';
import TimeOperator from '../../../../../lib/time';
import { chunkArr, chunkArray } from '../../../../../lib/dataParser/arr';
import tranUrlToLocal from '../../../../../lib/fetching/transUrlLocal';

import LayautNovelty from '../../../../layaut/LayautPage';
import TableFourCol from '../../../../table/table';
import { pipeObjectTime, parserPipeOneObject, order } from '../../../../../lib/dataParser/dataForNovelty';

import SectionForDelay from './section_for_delay/section';
import Image from '../../../../image_for_page/image';
import ReturnImages from './image_to_single_image';
import { sendImg } from '../../../../../lib/fetching/documents';



export default function TabletPos({ state, dishItem, styles, editCell }) {




    const addCell = useCallback((typeFood) => {
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
        const newArr = [...state.delay, row];
        editCell({ ...state, delay: newArr }, state.type);

    }, [state]);





    const updateCell = (index, data) => {
        const parseData = parserPipeOneObject(data, true);
        const indexDelay = state.delay.findIndex(item => item._id === data._id);
        const newArrDelau = [...state.delay];
        newArrDelau[indexDelay] = parseData;
        editCell({ ...state, delay: newArrDelau }, state.type);
    };




    const deleteCell = (index, data) => {
        const filterDelay = state.delay.filter(item => item._id !== data._id);
        editCell({ ...state, delay: filterDelay }, state.type);
    };




    const getNewUrlImg = useCallback((file, delay) => {
        sendImg(file)
            .then(response => {
                const newData = { ...delay };
                newData.imageToShare = response.data.urlFile;
                updateCell(null, newData);
            })
            .catch(error => {
                console.log(error);
            });
    }, [state]);






    return (

        <SectionForDelay
            title='Toast POS'
            add={addCell}
            dishItem={dishItem}
        >
            {
                dishItem.map((dish) => {
                    if (!state?.delay) return null;
                    const delatTypeOfDish = Array.isArray(state.delay) ? state.delay.filter(delay => delay.nameDish === dish.nameDishe) : [];

                    if (delatTypeOfDish.length > 0) {

                        return (
                            <>
                                {
                                    chunkArray(order(pipeObjectTime(delatTypeOfDish)), 10).map((arr) => (
                                        arr.length === 0 ?
                                            null
                                            :
                                            <LayautNovelty
                                                namePage={`Demora en preparación de ${dish.nameDishe}`}
                                                key={dish.nameDishe}
                                                styles={styles}
                                            >
                                                <div
                                                    className='w-[95%] h-[95%] p-[1rem] flex flex-col items-center justify-between gap-[1rem]'
                                                    onClick={() => pipeObjectTime(delatTypeOfDish)}
                                                >
                                                    <TableFourCol
                                                        header={state.header ?? []}
                                                        body={arr}
                                                        addRowProp={() => addCell(dish.nameDishe, state.delay)}
                                                        editCellProp={updateCell}
                                                        deleteRowProp={(index, delay) => deleteCell(index, delay)}
                                                        styles={styles}
                                                    />

                                                    <ReturnImages
                                                        {...{ delay: arr, typeFood: dish.nameDishe, getNewUrlImg }}
                                                    />

                                                </div>
                                            </LayautNovelty>
                                    ))
                                }
                                {
                                    delatTypeOfDish.length > 3 ?
                                        chunkArr(order(delatTypeOfDish)).map((arr, index) => (
                                            <LayautNovelty
                                                namePage={`Demora en preparación de ${dish.nameDishe}`}
                                                key={`${uuidv4()}-image`}
                                                styles={styles}
                                                children={{
                                                    callbackDelete: null,
                                                    deleteOnSwipe: false
                                                }}
                                            >
                                                <div className='w-full h-full flex justify-center items-center flex-wrap gap-[.5rem]'>
                                                    {
                                                        arr.sort((a, b) => TimeOperator.changueTimeMiliSecond(TimeOperator.calculateTime(b.startTime || b?.timePeriod?.init, b.endTime || b?.timePeriod?.end)) - TimeOperator.changueTimeMiliSecond(TimeOperator.calculateTime(a.startTime || a?.timePeriod?.init, a.endTime || a?.timePeriod?.end))).map((delay, index) => (
                                                            <Image
                                                                style={{
                                                                    width: '48%',
                                                                    height: '48%'
                                                                }}
                                                                setSrc={tranUrlToLocal(delay.imageToShare)}
                                                                caption={`Mesa: ${delay.table}`}
                                                                getFile={data => getNewUrlImg(data, delay)}
                                                                boubleClickEvent={() => findNovelty(delay._id)}
                                                                key={delay._id}
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
                        )
                    }
                    return null;
                })
            }
        </SectionForDelay>
    );
};