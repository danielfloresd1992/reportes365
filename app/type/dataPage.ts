export type timeParams = {
    table: string | null
}

type createTime = {
    createdAt: string | null
}


export type createBy = { createBy: string } | undefined | null;

export type time = { timePeriod: { init: string | null, end: string | null } }


export type TimeToastPost = {
    timePeriod: {
        init: string | null,
        end: string | null,

        tomaOrden: string | null,
        listoTablet: string | null,
        listoCocina: string | null,
        entregaPlato: string | null,
    }
}

export type image = { imageUrl: [{ index: 0, url: null }, { index: 1, url: null }], }

export type imageToastPos = { imageToShare: string }

export type ObjectComplete = time & timeParams & createTime & image & createBy;

export type typeAlertToasdPos = TimeToastPost & timeParams & imageToastPos & createTime & createTime;



export type TableProp = {
    header: [string, string, string, string];
    body: [ObjectComplete | typeAlertToasdPos],
    addRowProp: () => void,
    editCellProp: (index: number, propiety: time | timeParams) => void,
    deleteRowProp: (index: number, delay: typeAlertToasdPos | ObjectComplete) => void,
    orderTable: 'minor' | 'major' | undefined,
    saveOrder: () => void,
    styles: any,
    hiddenTable?: boolean
    alternativeTextArea?: boolean
}


export type NoveltyRefernce = {
    idReference: string,
    data: any
}