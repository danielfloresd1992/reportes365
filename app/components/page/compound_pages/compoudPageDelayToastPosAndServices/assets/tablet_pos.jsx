import { useState, useEffect, useCallback } from 'react';

import TimeOperator from '../../../../../lib/time';
import LayautNovelty from '../../../../layaut/LayautPage';
import TableFourCol from '../../../../table/table';
import { pipeObjectTime, parserPipeOneObject, order } from '../../../../../lib/dataParser/dataForNovelty';



export default function TabletPos({ delay_data, dishItem, styles, returnImg, chunkArr, addCell, editCell, deleteCell, }) {


    const [state, setState] = useState([]);


    useEffect(() => {
        setState(delay_data.delay);
    }, []);









    return (
        <>
            {///////    DELAY IN TABLET TOAST
                dishItem.map((dish) => {

                    const delatTypeOfDish = state.filter(delay => delay.nameDish === dish.nameDishe);

                    if (delatTypeOfDish.length > 0) {

                        console.error(state);


                        return (
                            <>
                                {
                                    chunkArr(order(pipeObjectTime(delatTypeOfDish)), 10).map(arr => (
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
                                                        header={delay_data.header ?? []}
                                                        body={arr}
                                                        addRowProp={() => addCell(dish.nameDishe)}
                                                        editCellProp={(index, data) => editCell(data, delay_data.type)}
                                                        deleteRowProp={(index, delay) => deleteCell(delay._id)}
                                                        styles={styles}
                                                    />
                                                    {
                                                        returnImg(order(delatTypeOfDish), dish.nameDishe)
                                                    }
                                                </div>
                                            </LayautNovelty>
                                    ))
                                }
                                {
                                    delatTypeOfDish.length > 3 ?
                                        chunkArr(order(delatTypeOfDish)).map(arr => (
                                            <LayautNovelty
                                                namePage={`Demora en preparación de ${dish.nameDishe}`}
                                                key={dish.nameDishe}
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
                                                                getFile={data => getNewUrlImg(data, { delay: dish.nameDishe, data: image, id: image._id, index: index })}
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
                        )
                    }
                    
                    return null;
                })
            }
        </>
    )
}