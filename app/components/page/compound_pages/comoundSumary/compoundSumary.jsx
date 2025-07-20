import LayautNovelty from "../../../layaut/LayautPage";
import RowTree from './componentForTablet/rowTreeCell';
import { useState, useEffect, useCallback } from 'react';
import { updatePageInDocument, putImagePreShift } from '../../../../lib/fetching/documents';
import Image from '../../../image_for_page/image';
import tranUrlToLocal from '../../../../lib/fetching/transUrlLocal';

import HeaderPage from '../headerCompound';
import FooterPage from '../footerCompound';

import UnstyledInput from '../../../inputs/input_no_style';
import InputPasteEventReusable from '../../../inputs/inputPasteEventReusable';
import ReusableTable from '../../../table/ReusableTable';

import checkOff from '../../../../../public/check/icons8-casilla-de-verificación-desactivada-32.png';
import checkOn from '../../../../../public/check/icons8-casilla-de-verificación-marcada-30.png';

import TimeOperator from '../../../../lib/time';

import { chunkArray } from "../../../../lib/dataParser/arr";



export default function CompoundSumary({ establishment, styles, data, config, deletePage, dataId }) {



    const [dataPageState, setDataPageState] = useState({ ...data });

    const styleCellBorder = `text-center border border-black w-1/3 font-semibold`;
    const styleCellBorderR = 'text-center border-r border-r-solid border-r-black';
    const styleCell = 'text-center w-1/3';
    const primaryCell = {
        width: config?.typePageSumary === 'simplified' ? '80%' : null,
    }


    const styleBoldText = {
        fontWeight: 700
    }


    useEffect(() => {
        if (establishment && data && dataPageState.data.touch.length < 1) {
            if (establishment.managers.length > 0) {
                const dataTouch = establishment.managers.filter(manager => manager.status === 'Activo').map(manager => {
                    return {
                        _id: manager._id,
                        name: `${manager.burden} ${manager.name}`,
                        result: {
                            total: 0,
                            firt: { key: 'Primero toques', value: 0 },
                            second: { key: ' Otros toques', value: 0 }
                        }
                    }
                });

                updateData(dataPageState._id, { touch: dataTouch });
            }
            else {
                const managerArr = renderManagerDefault(establishment.touchs.totalManager, 'Gerente');
                const assistantArr = renderManagerDefault(establishment.touchs.totalAttendee, 'Asistente');
                updateData(dataPageState._id, { touch: [...managerArr, ...assistantArr] });
            }
        }

    }, [establishment, data, dataPageState]);



    const updateData = useCallback((id, data) => {
        const updateData = { ...dataPageState, data: { ...dataPageState.data, ...data } };
        updatePageInDocument(id, updateData)
            .then(response => {
                setDataPageState(updateData, dataPageState);
            })
            .catch(error => {
                console.log(error);
            });
    }, [dataPageState]);



    const renderManagerDefault = (number, burden) => {
        if (number === 0 || number === undefined || number === null) return [];
        const row = [];
        for (let i = 0; i < number; i++) {
            row.push(
                { _id: `${i}${burden}_${Date.now()}`, title: `Toques de ${burden} ${i + 1}`, burden: burden, name: `${i + 1}`, result: { firt: { key: 'Primero toques', value: 21 }, second: { key: ' Otros toques', value: 30 } } }
            );
        }
        return row;
    };



    const updateTableBar = data => {
        if (!data?.bodyForTable) return null;
        const newArr = [];

        data.bodyForTable.forEach(arr => {
            const resultTime = TimeOperator.calculateTime(arr[1], arr[2]);
            newArr.push(resultTime);
        });

        const resultAverage = TimeOperator.calculateAverageTime(newArr);

        const dataForSubmit = {
            totalOfOccupiedTablesBar: {
                ...dataPageState.data.totalOfOccupiedTablesBar,
                bodyForTable: data.bodyForTable,
                result: {
                    ...dataPageState.data.totalOfOccupiedTablesBar.result,
                    firt: {
                        ...dataPageState.data.totalOfOccupiedTablesBar.result.firt,
                        value: data.bodyForTable.length
                    },
                    second: {
                        ...dataPageState.data.totalOfOccupiedTablesBar.result.second,
                        value: resultAverage
                    }
                }
            }
        };
        updateData(dataPageState._id, dataForSubmit);
    };



    if (!dataPageState) return null;


    return (
        <div className='relative flex items-center flex-col gap-[.5rem] shadow-[2px_2px_14px_#000000ab] overflow-hidden rounded-t-[10px]' id={dataId} data-id={dataId}>
            <HeaderPage deletePage={() => deletePage(null, data._id)} dataId={dataId} >
                <div className='flex items-center justify-center gap-[.2rem]' title={!config?.requirePageMeetingPreShift ? 'Esta opción esta desabilitada' : 'Quitar página de reunión pre-shift'}>
                    <InputPasteEventReusable
                        value='Rotaciones de la barra'
                        setData={updateTableBar}
                        name={establishment?.name}
                    />
                    <button
                        className='flex items-center justify-center gap-[.2rem]'
                        onClick={() => {
                            updateData(dataPageState._id, { hiddenPreShift: !dataPageState?.data?.hiddenPreShift });
                        }}
                        disabled={!config?.requirePageMeetingPreShift}
                        type='button'
                    >
                        <img className='w-[20px]' src={!dataPageState.data.hiddenPreShift ? checkOn : checkOff} alt='chekbox image' />
                        Pre-Shift
                    </button>

                </div>
            </HeaderPage>



            <LayautNovelty styles={styles ?? null} namePage={'Resumen del reporte'}>
                <table className='w-full h-full border-2 border-black bg-white' style={{ fontSize: config?.typePageSumary === 'simplified' ? '1.1rem' : '.9rem' }}>
                    <tbody className='100%'>
                        {
                            !(config?.typePageSumary === 'simplified') && !dataPageState.data.hiddenPreShift && config?.requirePageMeetingPreShift ?
                                <RowTree
                                    data={dataPageState.data.preshift}
                                    bordeB={true}
                                    setData={data => updateData(dataPageState._id, { preshift: data })}
                                />
                                :
                                null
                        }
                        <tr className='w-full'>
                            <td style={{ ...styleBoldText, ...primaryCell }} className={styleCellBorder} colSpan={2}>Total de rotaciones de mesas evaluadas</td>
                            <td style={styleBoldText} className={styleCellBorder}>
                                <UnstyledInput
                                    eventChangue={text => updateData(dataPageState._id, { totalOfOccupiedTables: text })}
                                    value={dataPageState.data.totalOfOccupiedTables ?? 'N/A'}
                                />

                            </td>
                        </tr>
                        {
                            !(config?.typePageSumary === 'simplified') ?
                                <>
                                    <tr className='w-full'>
                                        <td style={{ ...styleBoldText, ...primaryCell }} className={styleCellBorder} colSpan={2}>Promedio de espera para primera atención</td>
                                        <td style={styleBoldText} className={styleCellBorder}>
                                            <UnstyledInput
                                                eventChangue={text => updateData(dataPageState._id, { averageTimeToFirstResponse: text })}
                                                value={dataPageState.data.averageTimeToFirstResponse ?? 'N/A'}
                                            />
                                        </td>
                                    </tr>
                                    <tr className='w-full'>
                                        <td style={styleBoldText} className={styleCellBorder} colSpan={2}>Mesas con demora superior a {config?.time1Attention ? TimeOperator.timePeriod(config.time1Attention) : '"sin configurar"'} en ser atendidas</td>
                                        <td style={styleBoldText} className={styleCellBorder}>
                                            <UnstyledInput
                                                eventChangue={text => updateData(dataPageState._id, { totalCountFirstResponse: text })}
                                                value={dataPageState.data.totalCountFirstResponse ?? 'N/A'}
                                            />
                                        </td>
                                    </tr>
                                </>

                                : null

                        }


                        <tr className='w-full'>
                            <td style={styleBoldText} className={`${styleCellBorder} border-bottom`} colSpan={2}>Promedio para recibir plato fuerte una vez tomada la orden </td>
                            <td style={styleBoldText} className={styleCellBorder}>
                                <UnstyledInput
                                    eventChangue={text => updateData(dataPageState._id, { averageTimeToReceiveTheMainCourse: text })}
                                    value={dataPageState.data.averageTimeToReceiveTheMainCourse ?? 'N/A'}
                                />
                            </td>
                        </tr>
                        {
                            !(config?.typePageSumary === 'simplified') ?
                                <>
                                    {
                                        config?.requireBarTable ?
                                            <RowTree
                                                data={dataPageState.data.totalOfOccupiedTablesBar}
                                                bordeB={true}
                                                setData={data => updateData(dataPageState._id, { totalOfOccupiedTablesBar: data })}
                                            />
                                            :
                                            null
                                    }
                                    {
                                        Array.isArray(dataPageState.data.touch) && dataPageState.data.touch.length > 0 ?
                                            dataPageState.data.touch.map((manager, index) => (

                                                config?.typeOfManagerToTableApproachEvaluation === 'single' ?
                                                    <tr className='w-full' key={manager._id}>
                                                        <td style={styleBoldText} className={`${styleCellBorder} border-bottom`} >{manager?.title || `Toques de ${manager.name}`}</td>
                                                        <td style={styleBoldText} className={`${styleCellBorder} border-bottom`} >Cantidad total</td>
                                                        <td style={styleBoldText} className={styleCellBorder}>
                                                            <UnstyledInput
                                                                eventChangue={text => {
                                                                    const indexManager = dataPageState.data.touch.findIndex(menegerFilter => menegerFilter.name === manager.name);
                                                                    const newArrayManager = [...dataPageState.data.touch];
                                                                    newArrayManager[indexManager].result.total = text
                                                                    updateData(dataPageState._id, { touch: newArrayManager })
                                                                }}
                                                                value={manager.result.total}
                                                            />
                                                        </td>
                                                    </tr>
                                                    :
                                                    <RowTree
                                                        key={manager._id}
                                                        data={{ title: `Toques de ${manager.name}`, ...manager }}
                                                        bordeB={true}
                                                        setData={data => {
                                                            const indexManager = dataPageState.data.touch.findIndex(managerFindIndex => managerFindIndex.name === data.name);
                                                            const newArrayManager = [...dataPageState.data.touch];
                                                            newArrayManager[indexManager] = { ...data, name: newArrayManager[indexManager].name };
                                                            const total = Number(newArrayManager[indexManager].result.firt.value) + Number(newArrayManager[indexManager].result.second.value);
                                                            if (!isNaN(total)) newArrayManager[indexManager].result.total = total;
                                                            else newArrayManager[indexManager].result.total = 'N/A';
                                                            updateData(dataPageState._id, { touch: newArrayManager });
                                                        }}
                                                        title={isNaN(manager.result.total) ? null : `toques de ${manager.name}, total: ${manager.result.total} `}
                                                    />
                                            ))
                                            :
                                            null
                                    }

                                    {
                                        dataPageState.data?.waitersApproachTheTable ?
                                            <RowTree
                                                data={dataPageState.data.waitersApproachTheTable}
                                                bordeB={true}
                                                setData={data => updateData(dataPageState._id, { waitersApproachTheTable: data })}
                                                disabled={true}
                                            />
                                            : null
                                    }
                                </>
                                :
                                null
                        }

                        <tr className='w-full'>
                            <td style={styleBoldText} className={styleCellBorder} colSpan={2}>Mesas con demora superior a {config?.timeDelayClean ? TimeOperator.timePeriod(config.timeDelayClean) : 'Sin configurar'} en ser limpiada</td>
                            <td style={styleBoldText} className={styleCellBorder}>
                                <UnstyledInput
                                    eventChangue={text => updateData(dataPageState._id, { totalCountClearTable: text })}
                                    value={dataPageState.data.totalCountClearTable}
                                />
                            </td>
                        </tr>
                        <tr className='w-full'>
                            <td style={styleBoldText} className={styleCellBorder} colSpan={2}>Promedio de tiempo para limpiar mesas después de ser desocupadas</td>
                            <td style={styleBoldText} className={styleCellBorder}>
                                <UnstyledInput
                                    eventChangue={text => updateData(dataPageState._id, { averageTimeToCleartTable: text })}
                                    value={dataPageState.data.averageTimeToCleartTable}
                                />
                            </td>
                        </tr>
                        <tr className='w-full'>
                            <td style={styleBoldText} className={styleCellBorder} colSpan={2}>Uso de celular</td>
                            <td style={styleBoldText} className={styleCellBorder}>
                                <UnstyledInput
                                    eventChangue={text => updateData(dataPageState._id, { usePhone: text })}
                                    value={dataPageState.data.usePhone}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </LayautNovelty>


            {
                !dataPageState?.data.hiddenPreShift && config?.requirePageMeetingPreShift ?
                    <LayautNovelty //
                        styles={styles ?? null}// 
                        namePage={``}
                        title={dataPageState.data?.preshift?.sharedByUser ? `compartido por ${dataPageState.data?.preshift?.sharedByUser?.user?.nameUser}${dataPageState.data?.preshift?.validationResult ? `\nAprobado por ${dataPageState.data?.preshift?.validationResult?.validatedByUser?.user?.nameUser}` : ''}` : ''}>
                        <div className='w-full h-full flex justufy-center items-center'>
                            <div className='w-[50%] h-full flex items-center justify-center'>
                                <div className='h-[90%] flex flex-col items-center justify-start gap-[8rem] h-full'>
                                    <p
                                        className='for-shift text-center'
                                        style={{
                                            ...styleBoldText,
                                            color: '#434343',
                                            fontFamily: 'for-shift',
                                            fontWeight: '800',
                                            fontSize: '2.5rem',
                                            textShadow: '1px 1px 0 #fff,-1px 1px 0 #fff,1px -1px 0 #fff,-1px -1px 0 #fff'
                                        }}
                                    >
                                        Reunión pre-shift
                                    </p>


                                    <p style={styleBoldText} className='bg-[#ddd] p-[0.5rem_2rem] font-[initial] font-medium'>Inicio</p>
                                    <p style={styleBoldText} className='bg-[#ddd] p-[0.5rem_2rem] font-[initial] font-medium'>Fin</p>
                                </div>

                            </div>
                            <div className='w-[50%] h-full flex items-center justify-center flex-col gap-4'>
                                <Image
                                    styles={styles}

                                    setSrc={tranUrlToLocal(dataPageState.data.preshift.result.firt.image)}
                                    getFile={(file) => {

                                        putImagePreShift(dataPageState._id, { index: 1, file: file })
                                            .then(response => console.log(response))
                                            .catch(error => console.log(error));
                                    }}
                                    layautDouble={true}
                                    full={true}
                                />
                                <Image
                                    styles={styles}

                                    getFile={(file) => {
                                        putImagePreShift(dataPageState._id, { index: 2, file: file })
                                            .then(response => console.log(response))
                                            .catch(error => console.log(error));
                                    }}
                                    setSrc={tranUrlToLocal(dataPageState.data.preshift.result.second.image)}
                                    layautDouble={true}
                                    full={true}
                                />
                            </div>
                        </div>
                    </LayautNovelty>
                    :
                    null
            }
            {
                Number(dataPageState?.data?.totalOfOccupiedTablesBar.result.firt.value) && Number(dataPageState?.data?.totalOfOccupiedTablesBar.result.firt.value) > 0 ?
                    chunkArray(dataPageState?.data?.totalOfOccupiedTablesBar?.bodyForTable, 10).map(list => (
                        <LayautNovelty styles={styles ?? null} namePage='Rotaciones en barra'>
                            {
                                console.log()
                            }
                            <ReusableTable
                                header={['Mesa', 'Ocupada', 'Atencion', 'Espera', 'Orden', 'Entrega', 'Demora total']}
                                body={list || []}
                                setData={data => updateTableBar({ bodyForTable: data })}
                                rules={[{ seletedCell: 3, celInit: 1, celEnd: 2 }, { seletedCell: 6, celInit: 4, celEnd: 5 }]}
                                orderForTime={{ order: 'longertime' | 'lesstime', seletedCell: 1 }}
                                title={`Rortaciones en barra: ${dataPageState?.data?.totalOfOccupiedTablesBar?.bodyForTable?.length ?? 0}`}
                                styles={{ ...styles, ...styleBoldText }}
                            />
                        </LayautNovelty>
                    ))

                    :
                    null
            }
            <FooterPage />
        </div>
    );
}