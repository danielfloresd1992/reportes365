
import { useState, useEffect, useRef, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import LayautPages from '../layautPages';
import LayautNovelty from '../../../layaut/LayautPage';
import HeaderPage from '../headerCompound';
import FooterPage from '../footerCompound';
import Title from '../../TitleContent';
import InputTitle from '../../../inputs/inputTitle';
import InputStandart from '../../../inputs/input_standart';
import InputPasteEventReusable from '../../../inputs/inputPasteEventReusable';





import TimeOperator from '../../../../lib/time';




import icoGrafic from '../../../../../public/ico/ico_page_metric/icons8-gráfico-combinado-48.png';
import icoReloj from '../../../../../public/ico/icons8-reloj-50.png';
import icoProcess from '../../../../../public/ico/icons8-proceso-50.png';
import icoAlert from '../../../../../public/ico/ico_page_metric/icons8-alerta-96.png';

import alertIco from '../../../../../public/ico/icons8-alarma-50.png';
import foodIco from '../../../../../public/ico/icons8-comida-64.png';


import Legacy from './assets/legacy';

import Summary from './assets/symary';
import TabletPos from './assets/tablet_pos';
import DeliveyDelay from './assets/DelivryDishDelay';
import Services from './assets/Services';

import { pipeObjectTime, parserPipeOneObject, order } from '../../../../lib/dataParser/dataForNovelty';
import { downloadJSON } from '../../../../lib/debbuger/create_file';





export default memo(function CompoundPageDelayToastPosAndServices({ styles, config, data: dataProp, dish, updateDataProp, deletePage, dataId }) {



    const establishmentStore = useSelector(store => store.establishmentDocument);
    const [dataState, setDataState] = useState(null);

    const [entriesNameState, setEntriesNameState] = useState([]);

    const [ImgesState, setImageState] = useState([]);




    const dishItem = establishmentStore.dishes;



    useEffect(() => {
        setDataState({ ...dataProp.data });
    }, []);



    useEffect(() => {
        if (establishmentStore) {
            if (establishmentStore.dishes.length > 0) {
                setEntriesNameState(establishmentStore.dishes.map(dish => dish.nameDishe))
            }
            else {
                setEntriesNameState([establishmentStore.dishMenu.appetizer, establishmentStore.dishMenu.mainDish, establishmentStore.dishMenu.dessert]);

            }
        }
    }, [establishmentStore]);







    const getNewUrlImg = useCallback((file, dataParams) => {
        console.log(file);
        console.log(dataParams);

        /*
        sendImg(file)
            .then(response => {

                if (dataParams.delay === 'delayDeliveryDishWhenItIsReadyInKitchen') {
                    const newData = { ...dataParams.data };
                    newData.imageUrl[dataParams.index].url = response.data.urlFile;
                    editCell(dataParams.id, newData, 'delayDeliveryDishWhenItIsReadyInKitchen');
                }
                else {

                    editCell(dataParams.id, { ...dataParams.data, imageToShare: response.data.urlFile }, dataParams.delay);
                }
            })
            .catch(error => {
                console.log(error);
            })
            */
    }, []);




    const returnImg = (delay, typeFood) => {

    };




    // ADD LIST ALL
    const addCell = useCallback((data, type) => {
        console.log(type);

        if (typeof callback === 'function') callback();

    }, []);




    // PUT COMPONENT ALL
    const editCell = useCallback((data, type) => {
        const getDelayCategory = getObjectByType(dataState, type);
        const dataForRequest = { ...dataState };
        dataForRequest[getDelayCategory.key] = data;

        updateDataProp(dataForRequest, (data, error) => {
            setDataState(dataForRequest);
        });

    }, [dataState]);





    function getObjectByType(obj, typeValue) {
        const found = Object.entries(obj).find(([key, value]) => {
            return value && typeof value === 'object' && value.type === typeValue;
        });
        if (!found) return null;
        const [key, value] = found;
        return { key, ...value }; // Incluye la clave y el contenido
    };




    if (!establishmentStore || !dataState) return null;






    return (
        <LayautPages dataId={dataId}>
            <HeaderPage deletePage={() => deletePage(null, dataProp._id)} dataId={dataId}>
                <div>
                    <InputStandart
                        type='select'
                        textLabel='Entrega'
                        setValue={(value) => { }}
                        name='type-food'
                        resectSelect={true}
                    >
                        {
                            entriesNameState.length > 0 && entriesNameState.map(food => (
                                <option value={food}>dempora en entrega de {food}</option>
                            ))
                        }
                    </InputStandart>
                </div>

                <div className=''>
                    <InputStandart
                        type='select'
                        textLabel='Preparación'
                        setValue={() => { }}
                        name='type-food'
                        resectSelect={true}
                        value=''
                    >
                        {
                            entriesNameState.length > 0 && entriesNameState.map(food => (
                                <option value={food} key={food}>dempora en preparación de {food}</option>
                            ))
                        }
                    </InputStandart>

                </div>
            </HeaderPage>



            <Legacy
                {...{
                    bodyState: dataState,
                    returnImg,
                    dishItem,
                    styles,
                    establishmentStore
                }}
            />


            <Summary
                {...{
                    summary: dataState.summary,
                    dishItem,
                    styles,
                    config,
                    editCell

                }}
            />


            <TabletPos
                {...{
                    delay_data: dataState.delayToastPost,
                    dishItem,
                    styles,
                    addCell,
                    editCell,
                    returnImg
                }}
            />


            <DeliveyDelay
                {...{
                    delay_data: dataState.delayDeliveryDishWhenItIsReadyInKitchen,
                    dishItem,
                    styles,
                }}
            />


            <Services
                {...{
                    delay_data: dataState.delayServices,
                    dishItem,
                    styles,
                    addCell,
                    editCell,
                }}
            />



            <FooterPage eventClick={() => console.log(dataState)} />
        </LayautPages>
    );
})