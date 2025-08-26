export function groupedItemsByCategory(dataArr) {
    const groupedItems = dataArr.reduce((acc, item) => {
        const { category } = item.menuRef;
        if (!acc[category]) acc[category] = [];
        acc[category].push(item);
        return acc;
    }, {});
    return groupedItems;
};





export function processDataNovelty({ summaryData, noveltyPageData, delayToastPostAndServise, establishmentStore, dataArr }) {



    const groupedItems = dataArr.reduce((acc, item) => {
        const { category } = item.menuRef;
        if (!acc[category]) acc[category] = [];
        acc[category].push(item);
        return acc;
    }, {});


    const objectAll = [];
    let delay;
    if (groupedItems?.protocol) {
        const alertShift = groupedItems.protocol.filter(alert => alert.title === 'Reunión pre-shift ✅')[0];

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
        delay = { ...groupedItems }.delay.reduce((acc, item) => {
            const { es } = item.menuRef;
            if (!acc[es]) acc[es] = [];
            acc[es].push(item);
            return acc;
        }, {});


        if (delay['Demora de primera atención']) {

            const delayBar = delay['Demora de primera atención'].filter(item => isNaN(Number(item.table)));
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



        if (delay['Demora en preparación de plato'] || delay['Demora en entrega de plato'] || delay['Demora en preparación de Plato fuerte'] || delay['Demora de servicio']) {


            delay['Demora en preparación de plato'] && delay['Demora en preparación de plato'].forEach((object, index) => { //demora de tablet convencional
                delayToastPostAndServise.data.body[object.nameDish].delay.push(object);
            });

            delay['Demora en preparación de Plato fuerte'] && delay['Demora en preparación de Plato fuerte'].forEach((object, index) => { //marcada antes de tiempo
                const object_clone = Object.assign({}, object);
                object_clone.type = 'touch toast';
                delayToastPostAndServise.data.body[object_clone.nameDish].delay.push(object_clone);
            });

            delay['Demora en entrega de plato'] && delay['Demora en entrega de plato'].forEach((object, index) => { // tiempo que excede de listo en cocina a entrga de plato
                delayToastPostAndServise.data.body.delayDeliveryDishWhenItIsReadyInKitchen.delay.push(object);
            });

            if (delay['Demora de servicio']) {
                delayToastPostAndServise.data.body.delayServices.delay = delay['Demora de servicio'];
            }

            objectAll.push(delayToastPostAndServise);
        }



        if (delay['Demora de servicio']) {

            objectAll.push({
                type: 'services',
                name_establishment: establishmentStore?.name,
                data: {
                    body: delay['Demora de servicio'],
                    header: ['Mesas', 'Toma de orden', 'Entrega ', 'Demora']
                }
            });
        }


        if (delay['Demora de limpieza']) {

            const totalDelay = delay['Demora de limpieza'].filter(delayItem => delayItem.title.trim() !== 'Mesa sin ser limpiada aún (aviso)');

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


    }

    Object.keys(groupedItems).forEach((key, index) => {

        if (key !== 'delay') {
            let result;
            result = groupedItems[key].reduce((acc, item) => {
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