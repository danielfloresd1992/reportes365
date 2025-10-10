import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TimeOperator from '@/lib/time';

import { pipeObjectTime, parserPipeOneObject, order } from '../../../../../lib/dataParser/dataForNovelty';
import { chunkArr, chunkArray } from '../../../../../lib/dataParser/arr';
import tranUrlToLocal from '@/lib/fetching/transUrlLocal';

import LayautNovelty from '../../../../layaut/LayautPage';
import TableFourCol from '../../../../table/table';
import SectionForDelay from './section_for_delay/section';

import PageTabletDelayTwoImage from '@/components/page/page_delay_two_image/page_table';
import PageDelayTwoImage from '@/components/page/page_delay_two_image/page_image';


import Image from '@/components/image_for_page/image';
///../../components / page / page_delay_two_image / PageDelayTwoImagejsx'


export default function Services({ delay_data, dishItem, styles, editCell, }) {




    const addCell = (typeFood) => {
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



    const updateCell = (data) => {
        const indexDelay = delay_data.delay.findIndex(item => item._id === data._id);
        delay_data.delay[indexDelay] = data;
        editCell({ ...delay_data, delay: delay_data.delay }, delay_data.type);
    };



    const deleteCell = (data) => {
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
                    if (!delay_data?.delay) return null;

                    const delatTypeOfDish = delay_data.delay.filter(delay => delay.nameDish === dish.nameDishe);
                    if (delatTypeOfDish.length === 0) return null;
                    const dataOrder = order(delatTypeOfDish)
                    const titleHeadPage = `Mesa con maryor demora en recibir servicio de ${dish.nameDishe}`;
                    const titlePage = `${dish.requiresTableNumber ? `Mesa: ${dataOrder[0].table} ` : ''}(Desde: ${dataOrder[0].timePeriod.init} - Hasta: ${dataOrder[0].timePeriod.end}) Duración: ${TimeOperator.calculateTime(dataOrder[0].timePeriod.init, dataOrder[0].timePeriod.end)}`;
                    const captioInit = 'Toma de orden';
                    const captioEnd = `Entrega de ${dish.nameDishe}`;



                    const titleForTable = `${delatTypeOfDish.length > 1 ? 'Mesas' : 'Mesa'} con demora superior a ${TimeOperator.timePeriod(dish?.timeLimit?.day ?? '00:00:00')} para recibir servicio de ${dish.nameDishe}`;

                    return (
                        <>
                            <PageTabletDelayTwoImage
                                styles={styles}
                                titleHeadTable={titleForTable}
                                titleHeadImage={titleHeadPage}
                                title={titlePage}
                                arrayData={dataOrder}
                                key={dish.nameDishe}
                                deleteCell={(data) => { deleteCell(data) }}
                                addCell={() => { addCell(dish.nameDishe) }}
                                editCell={(data) => { updateCell(data) }}
                                hiddenTable={!dish.requiresTableNumber}
                                captioInit={captioInit}
                                captioEnd={captioEnd}
                                chunkArraySize={10}
                                limitDelayForNull={2}
                            />


                            {
                                dataOrder.length > 3 || dataOrder.length === 1 ?
                                    <PageDelayTwoImage
                                        styles={styles}
                                        titleHead={dataOrder.length === 1 ? titleForTable : titleHeadPage}
                                        title={titlePage}
                                        data={dataOrder[0]}
                                        editCell={(data) => { updateCell(data) }}
                                        captioInit={captioInit}
                                        captioEnd={captioEnd}
                                    />
                                    :
                                    null
                            }

                        </>
                    );
                })
            }
        </SectionForDelay >
    );
}