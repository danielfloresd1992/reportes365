type TimeString = `${number}:${number}:${number}`;


type TimeStandar = { init: TimeString, end: TimeString }


type ObjectTouchTable = {
    table: string,
    timePeriod: { init: TimeString, end: TimeString }
}



type ObjectDelayOcuppies = {
    table: 0,
    timePeriod: TimeStandar,
    imageUrl: [{ index: 0, url: null }, { index: 1, url: null }],
    createdAt: null,
    _id: string
}




type ObjectToastDelay = {
    delay: [],
    header: ['Mesas', 'Toma de orden', 'Listo en tablet', 'Tiempo total'],
}



export type FronPageData = {
    type: string,
    name_establishment: string,
    blocked: boolean,
    unique: boolean,
    data: {
        date: string
        shift: string
    }
}



export type SummaryData = {
    type: string,
    name_establishment: string,
    unique: boolean,
    data: {
        totalOfOccupiedTablesBar: {
            title: string,
            result: {
                firt: {
                    key: string,
                    value: number
                },
                second: {
                    key: string,
                    value: string,
                },
                addRow: {
                    key: string,
                    value: string,
                }
            },
            bodyForTable: any[]
        },

        totalOfOccupiedTables: string,
        averageTimeToFirstResponse: string,
        totalCountFirstResponse: string,
        averageTimeToReceiveTheMainCourse: string,
        averageTimeToCleartTable: string,
        totalCountClearTable: string,
        countTotalUsePhone: string,
        touch: any[],
        waitersApproachTheTable: {
            title: string,
            result: {
                firt: { key: string, value: number },
                second: { key: string, value: string }
            }
        },
        preshift: {
            title: string,
            result: {
                firt: { key: string, value: string, image: null | string },
                second: { key: string, value: string, image: null | string }
            },
            activate: boolean
        }
    },
    blocked: boolean,
    hiddenPreShift: boolean
}




export type TouchPageData = {
    numberPage: number,
    type: String
    name_establishment: string,
    blocked: boolean,
    unique: boolean,
    data: {
        title: '',
        header: ['Mesas', 'Inició', 'Finalizó', 'Duración'],
        body: ObjectTouchTable[]
    }
}



export type NoveltyPageData = {
    type: String,
    name_establishment: string,
    blocked: boolean,
    unique: boolean,
    data: {
        menuRef: null,
        body: []
    }
}




export type DelayOcuppies = {
    type: string,
    name_establishment: string,
    unique: boolean,
    data: {
        header: string[],
        body: ObjectDelayOcuppies[]
    }
};



export type DelayToastPostAndServise = {
    type: 'delayToastPostAndServise',
    name_establishment: string,
    unique: boolean,
    data: {


        //// LEGACE
        header: ['Mesas', 'Toma de orden', 'Listo en tablet', 'Demora en preparación'],
        body: any,



        summary: any,


        delayToastPost: {
            header: ['Mesas', 'Toma de orden', 'Listo en tablet', 'Tiempo total'],
            delay: [],
            type: string
        },


        delayDeliveryDishWhenItIsReadyInKitchen: {
            header: null
            delay: [],
            type: string
        },


        delayServices: {
            header: ['Mesas', 'Toma de orden', 'Entrega ', 'Demora'],
            delay: any[],
            type: string
        }


    }
};