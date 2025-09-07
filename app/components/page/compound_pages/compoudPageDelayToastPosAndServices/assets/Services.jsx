import { useState, useCallback, useEffect } from 'react';
import TimeOperator from '../../../../../lib/time';
import LayautNovelty from '../../../../layaut/LayautPage';
import TableFourCol from '../../../../table/table';





export default function Services({ delay_data, dishItem, styles, addCell, editCell, deleteCell, }) {



    const titleForTable = `Mesas con demora superior a ${TimeOperator.timePeriod(dishItem?.timeLimit?.day ?? '00:00:00')} para recibir servicio de ${dishItem.nameDishe}`;
    const [dataState, setDataState] = useState(null);



    useEffect(() => {
        setDataState(delay_data);
    }, [delay_data]);




    const deleteServiceInTable = useCallback((id) => {
        if (!dataState) return null;
        const newBody = { ...dataState.delay };
        newBody.delay = newBody.delay.filter(delay => delay._id !== id);
        updateDataProp(newBody, (data, error) => {

            setDataState(data);
        });
    }, [delay_data]);



    return null;


    return (

        <LayautNovelty
            namePage={titleForTable}
            key={dishItem.nameDishe}
            styles={styles}
        >
            <div
                className='w-[95%] h-[95%] p-[1rem] flex flex-col items-center justify-between gap-[1rem]'


            >
                <TableFourCol
                    header={['Mesas', 'Toma de orden', `Entrega de ${dishItem.nameDishe}`, 'Demora']}
                    body={dataState.delay}
                    addRowProp={() => {/*addRowDelay(key)*/ }}
                    editCellProp={(index, data) => { editCellService(data._id, data) }}
                    deleteRowProp={(index, delay) => { deleteServiceInTable(delay._id) }}
                    styles={styles}
                />

            </div>
        </LayautNovelty>
    )
}