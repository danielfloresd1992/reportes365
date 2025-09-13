import { v4 as uuidv4 } from 'uuid';
import { useContext } from 'react';
import { myUserContext } from '../context/sessionContext';
import { useSelector } from 'react-redux';

import { FronPageData, SummaryData, TouchPageData, NoveltyPageData, DelayOcuppies, DelayToastPostAndServise } from '../type/TYPES_DataForPages';



export default function useDataForPages() {


    const establishmentStore: any = useSelector((store: any) => store.establishmentDocument);
    const sessionContext = useContext(myUserContext);

    const { dataSessionState }: any = sessionContext;
    const documentDataCookie = dataSessionState?.dataSession?.activity;


    function generate_random(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }



    const fronPageData: FronPageData = {
        type: 'front',
        name_establishment: establishmentStore?.name,
        blocked: true,
        unique: true,
        data: {
            date: documentDataCookie?.SMU.date,
            shift: documentDataCookie?.SMU.shift
        }
    };



    const summaryData: SummaryData = {
        type: 'summary',
        name_establishment: establishmentStore?.name,
        unique: true,
        data: {
            totalOfOccupiedTablesBar: {
                title: 'Rotaciones en el Área de Barra',
                result: {
                    firt: {
                        key: 'Rotaciones evaluadas',
                        value: 0
                    },
                    second: {
                        key: 'Promedio de tiempo para ser atendidas',
                        value: 'N/A'
                    },
                    addRow: {
                        key: 'Mesas con demora para ser atendidas',
                        value: 'N/A'
                    }
                },
                bodyForTable: [

                ]
            },

            totalOfOccupiedTables: '',
            averageTimeToFirstResponse: '00:00:00',
            totalCountFirstResponse: '0 Mesas',
            averageTimeToReceiveTheMainCourse: '00:00:00',
            averageTimeToCleartTable: '00:00:00',
            totalCountClearTable: '0 Mesas',
            countTotalUsePhone: '',
            touch: [],
            waitersApproachTheTable: {
                title: 'Promedios de toque de mesa por los mesoneros',
                result: {
                    firt: { key: 'Cantidad', value: generate_random(6, 9) },
                    second: { key: 'Tiempo', value: `00:00:${generate_random(20, 35)}` }
                }
            },
            preshift: {
                title: 'Reunión Pre-Shift',
                result: {
                    firt: { key: 'Inicio', value: '00:00:00', image: null },
                    second: { key: 'Duración', value: '00:00:00', image: null }
                },
                activate: true
            }
        },
        blocked: false,
        hiddenPreShift: false
    };






    const touchPageData: TouchPageData = {
        numberPage: 0,
        type: 'touchPageData',
        name_establishment: establishmentStore?.name,
        blocked: true,
        unique: false,
        data: {
            title: '',
            header: ['Mesas', 'Inició', 'Finalizó', 'Duración'],
            body: [
                {
                    table: '0',
                    timePeriod: { init: '00:00:00', end: '00:00:00' },
                },
                {
                    table: '0',
                    timePeriod: { init: '00:00:00', end: '00:00:00' },
                },
                {
                    table: '0',
                    timePeriod: { init: '00:00:00', end: '00:00:00' },
                },
                {
                    table: '0',
                    timePeriod: { init: '00:00:00', end: '00:00:00' },
                },
                {
                    table: '0',
                    timePeriod: { init: '00:00:00', end: '00:00:00' },
                },
                {
                    table: '0',
                    timePeriod: { init: '00:00:00', end: '00:00:00' },
                },
                {
                    table: '0',
                    timePeriod: { init: '00:00:00', end: '00:00:00' },
                },
                {
                    table: '0',
                    timePeriod: { init: '00:00:00', end: '00:00:00' },
                },
                {
                    table: '0',
                    timePeriod: { init: '00:00:00', end: '00:00:00' },
                },
                {
                    table: '0',
                    timePeriod: { init: '00:00:00', end: '00:00:00' },
                }
            ]
        }
    };



    const noveltyPageData: NoveltyPageData = {
        type: 'blocked&novelty',
        name_establishment: establishmentStore?.name,
        blocked: true,
        unique: false,
        data: {
            menuRef: null,
            body: []
        }
    };



    const delay1attention: DelayOcuppies = {
        type: 'delay1ra',
        name_establishment: establishmentStore?.name,
        unique: true,
        data: {
            header: ['Mesas', 'Ocupa', 'Primera atención', 'Total'],
            body: [
                {
                    table: 0,
                    timePeriod: { init: '00:00:00', end: '00:00:00' },
                    imageUrl: [{ index: 0, url: null }, { index: 1, url: null }],
                    createdAt: null,
                    _id: uuidv4()
                },
                {
                    table: 0,
                    timePeriod: { init: '00:00:00', end: '00:00:00' },
                    imageUrl: [{ index: 0, url: null }, { index: 1, url: null }],
                    createdAt: null,
                    _id: uuidv4()
                }
            ]
        }
    };



    const delayClean: DelayOcuppies = {
        type: 'delayClear',
        name_establishment: establishmentStore?.name,
        unique: true,
        data: {
            header: ['Mesas', 'Desocupa', 'Limpieza', 'Total'],
            body: [
                {
                    table: 0,
                    timePeriod: { init: '00:00:00', end: '00:00:00' },
                    imageUrl: [{ index: 0, url: null }, { index: 1, url: null }],
                    createdAt: null,
                    _id: uuidv4()
                },
                {
                    table: 0,
                    timePeriod: { init: '00:00:00', end: '00:00:00' },
                    imageUrl: [{ index: 0, url: null }, { index: 1, url: null }],
                    createdAt: null,
                    _id: uuidv4()
                }
            ]
        }
    };



    const delayToastPostAndServise: DelayToastPostAndServise = {
        type: 'delayToastPostAndServise',
        name_establishment: establishmentStore?.name,
        unique: true,
        data: {

            // LEGACE
            header: ['Mesas', 'Toma de orden', 'Listo en tablet', 'Demora en preparación'],


            body: {

            },
            // ///////


            summary: {
                type: 'summary'
            },


            delayToastPost: {
                header: ['Mesas', 'Toma de orden', 'Listo en tablet', 'Tiempo total'],
                delay: [],
                type: 'toast_pos'
            },


            delayDeliveryDishWhenItIsReadyInKitchen: {
                header: null,
                delay: [],
                type: 'delivery'
            },


            delayServices: {
                header: ['Mesas', 'Toma de orden', 'Entrega ', 'Demora'],
                delay: [],
                type: 'services'
            }
        }
    };



    /////////////////////////////////////////  LEGACE  ///////////////////////////////////////////////////////////////////
    if (establishmentStore) {
        if (establishmentStore.dishes.length > 0) {
            establishmentStore.dishes.forEach((dish: any) => {
                delayToastPostAndServise.data.body[dish.nameDishe] = {
                    delay: [],
                    average: '00:00:00',
                    totalProcess: 0
                }
            });
        }
        else {

            if (establishmentStore) delayToastPostAndServise.data.body[establishmentStore.dishMenu.appetizer] = {
                delay: [],
                average: '00:00:00',
                totalProcess: 0
            };
            if (establishmentStore) delayToastPostAndServise.data.body[establishmentStore.dishMenu.mainDish] = {
                delay: [],
                average: '00:00:00',
                totalProcess: 0
            };
            if (establishmentStore) delayToastPostAndServise.data.body[establishmentStore.dishMenu.dessert] = {
                delay: [],
                average: '00:00:00',
                totalProcess: 0
            };
        }



        delayToastPostAndServise.data.body.delayDeliveryDishWhenItIsReadyInKitchen = {
            delay: [],
            average: '00:00:00'
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }



    return {
        dataDocument: documentDataCookie,
        fronPageData,
        noveltyPageData,
        summaryData,
        touchPageData,
        delay1attention,
        delayClean,
        delayToastPostAndServise
    }
}  