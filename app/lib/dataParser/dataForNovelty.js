import TimeOperator from '../time';




export const pipeObjectTime = (data, invert) => {
    if (!data) return null;
    const returnArr = [];

    console.log(data)

    data.forEach(delay => {
        if (invert) {
            if (delay.timePeriod.init) delay.timePeriod.tomaOrden = delay.timePeriod.init;
            if (delay.timePeriod.end) delay.timePeriod.listoTablet = delay.timePeriod.end;
        }
        else {
            if (delay.timePeriod.tomaOrden) delay.timePeriod.init = delay.timePeriod.tomaOrden;
            if (delay.timePeriod.listoTablet) delay.timePeriod.end = delay.timePeriod.listoTablet;
        }

        returnArr.push(delay);
    });
    return returnArr;
};




export const parserPipeOneObject = (data, invert) => {
    const delay = { ...data };
    if (delay.timePeriod && invert) {
        delay.timePeriod.tomaOrden = delay.timePeriod.init;
        delay.timePeriod.listoTablet = delay.timePeriod.end;
    }
    else if (delay.timePeriod) {
        delay.timePeriod.init = delay.timePeriod.tomaOrden;
        delay.timePeriod.end = delay.timesPeriod.listoTablet;
    }
    return delay;
};




export const order = (data) => {
    return pipeObjectTime(data).sort((a, b) => {
        const duracionB = TimeOperator.changueTimeMiliSecond(b.timePeriod.end) - TimeOperator.changueTimeMiliSecond(b.timePeriod.init);
        const duracionA = TimeOperator.changueTimeMiliSecond(a.timePeriod.end) - TimeOperator.changueTimeMiliSecond(a.timePeriod.init);
        return duracionB - duracionA;
    });
};