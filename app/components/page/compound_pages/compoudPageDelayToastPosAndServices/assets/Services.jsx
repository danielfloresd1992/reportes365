import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TimeOperator from '../../../../../lib/time';

import { pipeObjectTime, parserPipeOneObject, order } from '../../../../../lib/dataParser/dataForNovelty';
import { chunkArr, chunkArray } from '../../../../../lib/dataParser/arr';


import LayautNovelty from '../../../../layaut/LayautPage';
import TableFourCol from '../../../../table/table';
import SectionForDelay from './section_for_delay/section';






export default function Services({ delay_data, dishItem, styles, editCell }) {



    //    




    const addCell = (typeFood) => {
        console.log(typeFood);
        const row = {
            _id: uuidv4(),
            table: '0',
            imageToShare: null,
            createdAt: TimeOperator.returnTimeIso(),
            nameDish: typeFood,
            timePeriod: {
                init: '00:00:00',
                end: '00:00:00'
            }
        }

        row.imageUrl = [
            { _id: uuidv4(), caption: 'Toma de Orden', url: null, index: 0 },
            { _id: uuidv4(), caption: 'Entrega de servicio', url: null, index: 1 }
        ];

        const newArr = [...delay_data.delay, row];

        editCell({ ...delay_data, delay: newArr }, delay_data.type);

    };



    const updateCell = (id, data) => {

    };



    const deleteCell = (index, data) => {
        const filterDelay = delay_data.delay.filter(item => item._id !== data._id);
        editCell({ ...delay_data, delay: filterDelay }, delay_data.type);
    };



    return (

        <SectionForDelay
            title='Servicios'
            add={addCell}
            dishItem={dishItem}
        >
            {
                dishItem.map((dish) => {



                    const delatTypeOfDish = delay_data.delay.filter(delay => delay.nameDish === dish.nameDishe);



                    if (delatTypeOfDish.length > 0) {

                        const titleForTable = `${delatTypeOfDish.length > 1 ? 'Mesas' : 'Mesa'} con demora superior a ${TimeOperator.timePeriod(dish?.timeLimit?.day ?? '00:00:00')} para recibir servicio de ${dish.nameDishe}`;

                        return (
                            <>
                                {
                                    chunkArray(order(delatTypeOfDish), 10).map((arr) => {

                                        if (arr.length > 0) {

                                            console.log(arr);

                                            return (
                                                <LayautNovelty
                                                    namePage={titleForTable}
                                                    key={dish.nameDishe}
                                                    styles={styles}
                                                >
                                                    <div
                                                        className='w-[95%] h-[95%] p-[1rem] flex flex-col items-center justify-between gap-[1rem]'
                                                    >
                                                        <TableFourCol
                                                            header={['Mesas', 'Toma de orden', `Entrega de ${dish.nameDishe}`, 'Demora']}
                                                            body={arr}
                                                            addRowProp={() => addCell(dish.nameDishe)}
                                                            editCellProp={(index, data) => { }}
                                                            deleteRowProp={(index, delay) => deleteCell(null, delay)}
                                                            styles={styles}
                                                        />

                                                    </div>
                                                </LayautNovelty >
                                            )
                                        }
                                    })
                                }
                            </>
                        );
                    }
                })
            }
        </SectionForDelay >
    )
}