import TimeOperator from '../../../../../lib/time';
import LayautNovelty from '../../../../layaut/LayautPage';
import TableFourCol from '../../../../table/table';



export default function TabletPos({ bodyState }) {



    return (
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
    )
}