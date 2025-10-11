import { NoveltyRefernce } from '../../type/dataPage';


export function groupedItemsByCategory(dataArr: any) {
    const groupedItems = dataArr.reduce((acc: any, item: any) => {
        const { category } = item.menuRef;
        if (!acc[category]) acc[category] = [];
        acc[category].push(item);
        return acc;
    }, {});
    return groupedItems;
};





export function processDataNovelty({ summaryData, noveltyPageData, delayToastPostAndServise, establishmentStore, dataArr }: any) {



    const groupedItems = dataArr.reduce((acc: any, item: any) => {
        const { category } = item.menuRef;
        if (!acc[category]) acc[category] = [];
        acc[category].push(item);
        return acc;
    }, {});


    console.warn('groupedItems', groupedItems);

    const objectAll = [];
    let delay;
    if (groupedItems?.protocol) {
        const alertShift = groupedItems.protocol.filter((alert: any) => alert.title === 'Reunión pre-shift ✅')[0];

        if (alertShift) {
            summaryData.data.preshift.result.firt.value = alertShift?.timePeriod?.init ?? '00:00:00';
            summaryData.data.preshift.result.firt.image = alertShift.imageUrl[0].url;

            summaryData.data.preshift.result.second.value = alertShift?.timePeriod?.end ?? '00:00:00';
            summaryData.data.preshift.result.second.image = alertShift.imageUrl[1].url;
            summaryData.data.preshift.validationResult = alertShift.validationResult;
            summaryData.data.preshift.sharedByUser = alertShift.sharedByUser;
        }
    }


    if (typeof groupedItems?.delay === 'object' && groupedItems.delay.length > 0) {
        delay = { ...groupedItems }.delay.reduce((acc: any, item: any) => {
            const { es } = item.menuRef;
            if (!acc[es]) acc[es] = [];
            acc[es].push(item);
            return acc;
        }, {});


        if (delay['Demora de primera atención']) {

            const delayBar = delay['Demora de primera atención'].filter((item: any) => isNaN(Number(item.table)));
            if (establishmentStore?.config_report?.requireBarTable) {
                summaryData.data.totalCountFirstResponse = delay['Demora de primera atención'].length === 1 ? `${delay['Demora de primera atención'].length - delayBar.length} Mesa` : `${delay['Demora de primera atención'].length - delayBar.length} Mesas`;
                summaryData.data.totalOfOccupiedTablesBar.result.addRow.value = delayBar.length === 1 ? `${delayBar.length} mesa` : `${delayBar.length} mesas`;
            }
            else {
                summaryData.data.totalCountFirstResponse = delay['Demora de primera atención'].length === 1 ? `${delay['Demora de primera atención'].length} Mesa` : `${delay['Demora de primera atención'].length} Mesas`;
            }

            objectAll.push({
                type: 'delay1ra',
                name_establishment: establishmentStore?.name,
                data: {
                    body: delay['Demora de primera atención'],
                    header: ['Mesas', 'Ocupa', 'Primera atención', 'Total']
                }
            });
        }




        /////////////////  DEMORAS DE TABLETS CON TODAS SUS VARIANTES
        if (delay['Demora en preparación de plato'] || delay['Demora en entrega de plato'] || delay['Demora en preparación de Plato fuerte'] || delay['Demora de servicio']) {

            //demora de tablet convencional
            delay['Demora en preparación de plato'] && delay['Demora en preparación de plato'].forEach((novelty: any, index: number) => {
                const objectReference: NoveltyRefernce = {
                    idReference: novelty._id,
                    data: null
                };
                delayToastPostAndServise.data.delayToastPost.delay.push(novelty);
            });

            //marcada antes de tiempo
            delay['Demora en preparación de Plato fuerte'] && delay['Demora en preparación de Plato fuerte'].forEach((novelty: any, index: number) => {
                const objectReference: NoveltyRefernce = {
                    idReference: novelty._id,
                    data: null
                };
                delayToastPostAndServise.data.delayToastPost.delay.push(novelty);
                //delayToastPostAndServise.data.delayToastPost.delay.push(objectReference);
            });

            delay['Demora en entrega de plato'] && delay['Demora en entrega de plato'].forEach((novelty: any, index: number) => {// tiempo que excede de listo en cocina a entrga de plato
                const objectReference: NoveltyRefernce = {
                    idReference: novelty._id,
                    data: null
                };
                delayToastPostAndServise.data.delayDeliveryDishWhenItIsReadyInKitchen.delay.push(novelty);
            });

            delay['Demora de servicio'] && delay['Demora de servicio'].forEach((novelty: any, index: number) => {
                const objectReference: NoveltyRefernce = {
                    idReference: novelty._id,
                    data: null
                };
                delayToastPostAndServise.data.delayServices.delay.push(novelty);
            });
            objectAll.push(delayToastPostAndServise);
        }




        if (delay['Demora de limpieza']) {

            const totalDelay = delay['Demora de limpieza'].filter((delayItem: any) => delayItem.title.trim() !== 'Mesa sin ser limpiada aún (aviso)');

            if (totalDelay.length > 0) {
                summaryData.data.totalCountClearTable = totalDelay === 1 ? `${totalDelay.length} Mesa` : `${totalDelay.length} Mesas`;

                objectAll.push({
                    type: 'delayClear',
                    name_establishment: establishmentStore?.name,
                    data: {
                        body: totalDelay,
                        header: ['Mesas', 'Desocupa', 'limpieza', 'Total']
                    }
                });
            }
        }


        Object.keys(groupedItems).forEach((key, index) => {

            if (key !== 'delay') {
                let result;
                result = groupedItems[key].reduce((acc: any, item: any) => {
                    const { es } = item.menuRef;
                    item.jarvisNewsHydration = true;
                    if (!acc[es]) acc[es] = [];
                    acc[es].push(item);
                    return acc;
                }, {});

                Object.keys(result).forEach((keyInter) => {
                    let newDaTForPageNovelty = {
                        ...noveltyPageData,
                        data: {
                            ...noveltyPageData.data,
                            body: [...result[keyInter]],
                            menuRef: { ...result[keyInter][0].menuRef },

                        }
                    };
                    objectAll.push(newDaTForPageNovelty);
                });
            }
        });


        const arr = {
            arr: [summaryData, ...objectAll],
            group: groupedItems,
            delay: delay
        }
        return arr
    }
}