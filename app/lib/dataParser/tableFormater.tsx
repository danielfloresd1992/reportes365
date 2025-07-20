
import { timeParams, time, ObjectComplete, TableProp } from '../../type/dataPage';
import TimeOperator from '../time';



export const matrisToObject = (table: any[][], establishmentName: string) => {
    const arrToReturn: ObjectComplete[] = [];

    table.forEach(element => {
        const object: ObjectComplete = {} as ObjectComplete;
        if (element.length < 4) {
            for (let i = 0; i < 4; i++) {
                if (!element[i]) element[i] = ''
            }
        }
        object.table = element[0]
        object.timePeriod = {
            init: element[1],
            end: element[2]
        }
        object.createdAt = TimeOperator.returnTimeIso();
        object.createBy = establishmentName;
        arrToReturn.push(object);
    });

    return arrToReturn;
}