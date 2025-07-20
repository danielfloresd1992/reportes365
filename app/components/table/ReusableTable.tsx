import { useState, useEffect, ReactNode, useCallback } from 'react';
import TimeOperator from '../../lib/time';


type TableProp = {
    header: [string];
    body: [[string]],
    setData: (data: any) => [[string]],
    rules: [{ seletedCell: number, celInit: number, celEnd: number }],
    orderForTime: { order: 'longertime'/*major*/ | 'lesstime' /*minor*/, seletedCell: number } | undefined,
    title?: string | undefined,
    styles: any
}



export default function ReusableTable({ header, body, setData, rules, orderForTime, title, styles }: TableProp): ReactNode {


    if (!header || !body) return null;
    if (!Array.isArray(body)) return null;


    const [dataState, setDataState] = useState<string[][]>([]);


    useEffect(() => {
        if (orderForTime) {
            const result = body.sort((a: any, b: any): any => a[orderForTime.seletedCell].localeCompare(b[orderForTime.seletedCell]));
            setDataState(result);
        }
        else {
            setDataState(body);
        }
    }, [body]);



    useEffect(() => {
    //    setData(dataState);
    }, [dataState]);


    const styleBoldText = {
        fontWeight: 700
    }

    const editCell = (matriz: string[][], x: number, y: number, new_value: string):string[][] => {
        const newArr: string[][] = [...matriz];
        newArr[x][y] = new_value;
        return newArr;
    };




    const printRulesInCell = useCallback((indexCellIteration: number, rowCellIteration: number, cellValue: string, row: string[]): ReactNode => {
        /*
            if (rules.length < 1 || typeof rules === undefined){ 
                return cellValue
            };
            if (cellValue === 'N/A' || cellValue === '') return cellValue;
        */


        let disabled = false;
        let valueResult = cellValue;
        for (let i = 0; i < rules.length; i++) {
            if (indexCellIteration === rules[i].seletedCell) {
                disabled = true;
                valueResult = TimeOperator.calculateTime(row[rules[i].celInit], row[rules[i].celEnd]) === '...:...:...' ?
                    'N/A'
                    :
                    TimeOperator.calculateTime(row[rules[i].celInit], row[rules[i].celEnd]);
                break;
            }
        }

      


        return (
            <td
                className='border border-solid border-gray-400 text-center'
                key={`cell-${indexCellIteration}`}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const newTable = editCell(dataState, rowCellIteration, indexCellIteration, e.target.textContent ?? '');
                    setDataState(newTable);
                    setData(newTable);
                }}
                title={disabled ? 'celdas no editables' : ''}
                style={styleBoldText}
            >
                {valueResult ?? 'N/A'}
            </td>
        );
    }, [dataState]);


    if(!dataState) return null;


    const haightTable = dataState.length > 6 ? '100%' : '';

  
    return (
        <table className='w-full border-3 border-solid border-gray-600 bg-white m-auto table-fixed'
            style={{
                height: haightTable
            }}
            title={title ?? ''}
        >
            <thead>
                <tr
                    className='bg-customGrayTableHead h-[40px]'
                    style={{
                        height: dataState.length < 10 ? '40px' : '',
                        
                    }}
                >
                    {
                        header.map((ValueCellHeader: string) => (
                            <th
                                className='border border-solid border-gray-400 text-white pt-4 pb-4'
                                key={`header${ValueCellHeader}`}
                                scope="col"
                                style={{ ...styleBoldText, backgroundColor: styles?.bgTextBox ?? '#ddd', color: styles?.colorTextBox ?? '#000', fontWeight: '600' }}
                            >
                                {ValueCellHeader}
                            </th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    Array.isArray(dataState) && dataState.length > 0 ? dataState.map((row: any, indexRow: number) => (

                        <tr
                            className=''
                            key={indexRow}
                            style={{
                                height: dataState.length < 10 ? '40px' : '',
                                ...styleBoldText
                            }}
                        >
                            {
                                header.map((th, indexCell: number) => (
                                    printRulesInCell(indexCell, indexRow, row[indexCell], row)
                                ))
                            }
                        </tr>
                    ))
                        : null
                }
            </tbody>
        </table>
    );
}