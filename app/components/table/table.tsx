import { useState, ReactNode, useEffect, memo } from 'react';
import TimeOperator from '../../lib/time';
import { timeParams, time, ObjectComplete, TableProp, typeAlertToasdPos } from '../../type/dataPage';
import useFindArticle from '../../hook/find_to_asidebar';



const TableFourCol = ({ header, body, addRowProp, deleteRowProp, editCellProp, orderTable, saveOrder, styles }: TableProp): ReactNode => {

    if (!header || !body || !Array.isArray(body)) return null;


    const [dataState, setDataState] = useState<[ObjectComplete | typeAlertToasdPos] | []>([])
    const [styleRow, setStyleRow] = useState({ position: 'relative', height: dataState.length > 4 ? (dataState.length > 10 ? 'none' : '40px') : null });
    const { findNovelty } = useFindArticle();

    if (!body) return null;


    useEffect(() => {
        let result;

        if (orderTable === 'minor') {
            result = body.sort((a: any, b: any): any => {
                const duracionB = TimeOperator.changueTimeMiliSecond(b.timePeriod.end) - TimeOperator.changueTimeMiliSecond(b.timePeriod.init);
                const duracionA = TimeOperator.changueTimeMiliSecond(a.timePeriod.end) - TimeOperator.changueTimeMiliSecond(a.timePeriod.init);
                return duracionB - duracionA;
            });
        }
        else if (orderTable === 'major') {
            result = body.sort((b: any, a: any): any => {
                const duracionB = TimeOperator.changueTimeMiliSecond(b.timePeriod.end) - TimeOperator.changueTimeMiliSecond(b.timePeriod.init);
                const duracionA = TimeOperator.changueTimeMiliSecond(a.timePeriod.end) - TimeOperator.changueTimeMiliSecond(a.timePeriod.init);
                return duracionB - duracionA;
            });
        }
        else {
            result = body;
        }
        if (typeof saveOrder === 'function') saveOrder(result);
        setDataState(result);
    }, [body]);



    let styleTableState = dataState.length > 4 ? '100%' : 'none';



    return (
        <div className='w-full h-full relative'>
            <table className='w-full h-full border-3 border-solid border-gray-600 bg-white m-auto table-fixed'
                style={{ height: styleTableState, backgroundColor: '', color: '' }}>
                <thead>
                    <tr className='bg-customGrayTableHead' style={{ position: 'relative', height: '50px' }}>
                        {header.map((item: string, index: number) => (
                            <th key={`data-h${index}`} style={{ backgroundColor: styles?.bgTextBox ?? '#ddd', color: styles?.colorTextBox ?? '#000' }} className='border border-solid border-gray-400 text-white'>{item}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {dataState.map((row: any, index: number) => (
                        row?.timePeriod ?
                            <tr
                                key={`data-0${index}`}
                                style={{ ...styleRow, ...{ fontWeight: 700 } }}
                                className={row.sharedByUser ? (row?.validationResult?.isApproved === true
                                    ? 'hover-row'
                                    : (row?.validationResult?.isApproved === false
                                        ? 'hover-row invalid-row'
                                        : 'hover-row ignore-row'))
                                    : 'hover-row'}
                                title={row?.sharedByUser
                                    ? `Captado por: ${row.sharedByUser.user.nameUser}\nHora de envio: ${TimeOperator.conveTime(row.createdAt)}${row?.validationResult
                                        ? `\nRevisado y enviado por ${row.validationResult?.validatedByUser?.user?.nameUser}\nHora de envio: ${TimeOperator.conveTime(row.validationResult.updatedAt)}`
                                        : ''}`
                                    : ''}
                                onDoubleClick={() => findNovelty(row._id)}
                            >
                                <td
                                    contentEditable
                                    suppressContentEditableWarning
                                    className='border border-solid border-gray-400 w-full text-center'
                                    dangerouslySetInnerHTML={{ __html: row?.table || '' }}
                                    onBlur={e => {
                                        e.target.blur();
                                        editCellProp(index, { ...dataState[index], table: e.currentTarget.innerHTML });
                                    }}
                                />

                                <td
                                    contentEditable
                                    suppressContentEditableWarning
                                    className='border border-solid border-gray-400 w-full text-center'
                                    dangerouslySetInnerHTML={{ __html: row?.startTime || row?.timePeriod?.init || '' }}
                                    onBlur={e => {
                                        e.target.blur();
                                        editCellProp(index, {
                                            ...dataState[index],
                                            timePeriod: {
                                                ...dataState[index].timePeriod,
                                                init: e.currentTarget.innerHTML
                                            }
                                        })
                                    }}
                                />

                                <td
                                    contentEditable
                                    suppressContentEditableWarning
                                    className='border border-solid border-gray-400 w-full text-center'
                                    dangerouslySetInnerHTML={{ __html: row?.timePeriod?.end || '' }}
                                    onBlur={e => {
                                        e.target.blur();
                                        editCellProp(index, {
                                            ...dataState[index],
                                            timePeriod: {
                                                ...dataState[index].timePeriod,
                                                end: e.currentTarget.innerHTML
                                            }
                                        })
                                    }}

                                />

                                <td className='border border-solid border-gray-400 w-full text-center relative'>
                                    {row?.duration ?? TimeOperator.calculateTime(
                                        row.startTime || row?.timePeriod?.init,
                                        row.endTime || row?.timePeriod?.end
                                    )}
                                    <button
                                        type='button'
                                        onClick={() => deleteRowProp(index, dataState[index])}
                                        className='absolute right-[10px] hover-visivility'
                                        title='eliminar fila'
                                    >
                                        ❌
                                    </button>

                                </td>
                            </tr>
                            :
                            null
                    ))}
                </tbody>
            </table>
            <button
                className='absolute bottom-[10px] right-[-30px] hover-visivility'
                type='button'
                title='agregar fila'
                onClick={addRowProp}
            >
                ➕
            </button>
        </div>
    );
};



export default memo(TableFourCol);