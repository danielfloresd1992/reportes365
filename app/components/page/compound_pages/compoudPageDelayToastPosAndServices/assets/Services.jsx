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

    };



    const updateCell = (id, data) => {

    };



    const deleteCell = (index, data) => {

    };




    return (

        <SectionForDelay
            title='Servicios'
            add={addCell}
            dishItem={dishItem}
        >
            {
                dishItem.map((dish) => {

                    const titleForTable = `Mesas con demora superior a ${TimeOperator.timePeriod(dish?.timeLimit?.day ?? '00:00:00')} para recibir servicio de ${dish.nameDishe}`;
                    const delatTypeOfDish = Array.isArray(delay_data.delay) ? delay_data.delay.filter(delay => delay.nameDish.toLowerCase() === dish.nameDishe.toLowerCase()) : [];
                    console.log(delatTypeOfDish);

                    if (delatTypeOfDish.length > 0) {
                        return (
                            <>
                                {
                                    chunkArray(order(delatTypeOfDish), 10).map((arr) => {

                                        if (arr.length > 0) {
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
                                                            header={['Mesas', 'Toma de orden', `Entrega de ${dishItem.nameDishe}`, 'Demora']}
                                                            body={delay_data.delay}
                                                            addRowProp={() => { }}
                                                            editCellProp={(index, data) => { }}
                                                            deleteRowProp={(index, delay) => { }}
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