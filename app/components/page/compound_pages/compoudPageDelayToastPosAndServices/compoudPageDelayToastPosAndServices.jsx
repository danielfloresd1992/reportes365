import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect, useRef, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import useFindArticle from '../../../../hook/find_to_asidebar';
import LayautPages from '../layautPages';
import LayautNovelty from '../../../layaut/LayautPage';
import HeaderPage from '../headerCompound';
import FooterPage from '../footerCompound';
import Title from '../../TitleContent';
import InputTitle from '../../../inputs/inputTitle';
import InputStandart from '../../../inputs/input_standart';
import InputPasteEventReusable from '../../../inputs/inputPasteEventReusable';


import TabletLayaut from '../../../table/table_layaut';


import TimeOperator from '../../../../lib/time';

import tranUrlToLocal from '../../../../lib/fetching/transUrlLocal';
import { chunkArray } from '../../../../lib/./dataParser/arr';
import { sendImg } from '../../../../lib/fetching/documents'
import icoGrafic from '../../../../../public/ico/ico_page_metric/icons8-gráfico-combinado-48.png';
import icoReloj from '../../../../../public/ico/icons8-reloj-50.png';
import icoProcess from '../../../../../public/ico/icons8-proceso-50.png';
import icoAlert from '../../../../../public/ico/ico_page_metric/icons8-alerta-96.png';
import Image from '../../../image_for_page/image';
import alertIco from '../../../../../public/ico/icons8-alarma-50.png';
import foodIco from '../../../../../public/ico/icons8-comida-64.png';


import Legacy from './assets/legacy';

import Summary from './assets/symary';
import TabletPos from './assets/tablet_pos';
import DeliveyDelay from './assets/DelivryDishDelay';
import Services from './assets/Services';





export default memo(function CompoundPageDelayToastPosAndServices({ styles, config, data: dataProp, dish, updateDataProp, deletePage, dataId }) {



    const establishmentStore = useSelector(store => store.establishmentDocument);
    const [bodyState, setBodyState] = useState(null);

    const [entriesNameState, setEntriesNameState] = useState([]);

    const [ImgesState, setImageState] = useState([]);

    const { findNovelty } = useFindArticle();


    const styleCellBorder = 'border border-black text-lg';
    const styleCellBorderR = 'text-center border-r border-r-solid border-r-black';
    const styleCell = 'text-center w-1/3';
    const fontSizes = { fontSize: '1.2rem' };


    const dishItem = establishmentStore.dishes;



    useEffect(() => {
        setBodyState({ ...dataProp.data.body });
    }, [])



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




    const totalProcess = () => {
        if (!bodyState) return { totalProcess: 0, totalDelayToasd: 0 };
        let totalProcess = 0;
        let totalDelayToasd = 0;
        entriesNameState.forEach(food => {
            if (bodyState[food]) {
                totalProcess = Number(totalProcess + bodyState[food].totalProcess);
                totalDelayToasd = totalDelayToasd + bodyState[food].delay.length;
            }
        });
        return {
            totalProcess,
            totalDelayToasd
        };
    };



    const pipeObjectTime = (data, invert) => {
        if (!data) return null;
        const returnArr = [];

        data.forEach(delay => {
            if (invert) {
                delay.timePeriod.tomaOrden = delay.timePeriod.init;
                delay.timePeriod.listoTablet = delay.timePeriod.end;
            }
            else {
                delay.timePeriod.init = delay.timePeriod.tomaOrden;
                delay.timePeriod.end = delay.timePeriod.listoTablet;
            }

            returnArr.push(delay);
        });
        return returnArr;
    };



    const parserPipeOneObject = (data, invert) => {
        if (!data) return null;
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




    const addRowDelay = useCallback((typeFood, typeDelay) => {
        const row = {
            _id: uuidv4(),
            table: '0',
            imageToShare: null,
            createdAt: TimeOperator.returnTimeIso(),
            nameDish: typeFood,
            timePeriod: {
                tomaOrden: '00:00:00',
                listoTablet: '00:00:00',
                listoCocina: '00:00:00',
                EntregaPLato: '00:00:00',
                timeTotal: null
            }

        };
        const newBody = { ...dataProp.data };

        if (typeDelay === 'delivery') {
            row.imageUrl = [
                { _id: uuidv4(), caption: 'Toma de Orden', url: null, index: 0 },
                { _id: uuidv4(), caption: 'Listo en cocina', url: null, index: 1 },
                { _id: uuidv4(), caption: 'Listo en tablet', url: null, index: 2 },
                { _id: uuidv4(), caption: 'Entrega de plato', url: null, index: 3 }
            ]
            if (!newBody.body?.delayDeliveryDishWhenItIsReadyInKitchen?.delay) {
                newBody.body['delayDeliveryDishWhenItIsReadyInKitchen'].delay = [];
            }
            newBody.body['delayDeliveryDishWhenItIsReadyInKitchen'].delay.push(row);
        }
        else {
            newBody.body[typeFood].delay.push(row);
        }


        updateDataProp(newBody, (data, error) => {
            setBodyState(data);
        });

    }, [dataProp, bodyState]);




    const editCellService = useCallback((id, dataUpdate) => {
        const newBody = { ...dataProp.data };
        const findIndex = newBody.body.delayServices.delay.findIndex(delay => delay._id === id);
        console.log(newBody.body.delayServices.delay);
        newBody.body.delayServices.delay[findIndex] = dataUpdate;
        updateDataProp(newBody, (data, error) => {
            setBodyState(data);
        });
    }, [dataProp, bodyState]);












    const deleteDelayInTable = useCallback((id, typeFood) => {
        if (!dataProp) return null;
        const newBody = { ...dataProp.data };
        newBody.body[typeFood].delay = newBody.body[typeFood].delay.filter(delay => delay._id !== id);
        updateDataProp(newBody, (data, error) => {
            console.log(error);
            setBodyState(data);
        });

    }, [dataProp]);




    const getNewUrlImg = useCallback((file, dataParams) => {
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
    }, [dataProp]);




    const returnImg = (delay, typeFood) => {
        if (delay.length > 3) return null;
        const styleImg = {};
        if (delay.length === 1) {
            styleImg.width = '100%';
            styleImg.height = '330px'
        }
        else if (delay.length === 2) styleImg.height = '300px';
        else if (delay.length === 3) styleImg.height = '250px';

        return (
            <div className='flex justify-center items-center gap-4 w-full'>
                {
                    delay.sort((a, b) => TimeOperator.changueTimeMiliSecond(TimeOperator.calculateTime(b?.timePeriod?.init, b?.timePeriod?.end)) - TimeOperator.changueTimeMiliSecond(TimeOperator.calculateTime(a?.timePeriod?.init, a?.timePeriod?.end))).map((image, index) => (
                        <Image
                            item={index}
                            style={styleImg}
                            setSrc={tranUrlToLocal(image.imageToShare)}
                            getFile={data => getNewUrlImg(data, { delay: typeFood, data: image, id: image._id })}
                            index={index}
                            arrowCordernate={false}
                            caption={delay.length === 1 ? null : `Mesa: ${image.table}`}
                            key={index}
                            boubleClickEvent={() => findNovelty(image._id)}
                        />
                    ))
                }
            </div>
        );
    };



    const chunkArr = (arrProps) => {
        const chunkSize = 4;
        const returnArr = [];
        for (let i = 0; i < arrProps.length; i += chunkSize) {
            returnArr.push(arrProps.slice(i, i + chunkSize));
        }
        return returnArr;
    };


    console.log(establishmentStore);


    if (!bodyState) return null;



    const order = (data) => {
        return pipeObjectTime(data).sort((a, b) => {
            const duracionB = TimeOperator.changueTimeMiliSecond(b.timePeriod.end) - TimeOperator.changueTimeMiliSecond(b.timePeriod.init);
            const duracionA = TimeOperator.changueTimeMiliSecond(a.timePeriod.end) - TimeOperator.changueTimeMiliSecond(a.timePeriod.init);
            return duracionB - duracionA;
        });
    };



    if (!establishmentStore) return null;

    console.log(establishmentStore);



    return (
        <LayautPages dataId={dataId}>
            <HeaderPage deletePage={() => deletePage(null, dataProp._id)} dataId={dataId}>
                <div>
                    <InputStandart
                        type='select'
                        textLabel='Entrega'
                        setValue={(value) => addRowDelay(value, 'delivery')}
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
                        setValue={addRowDelay}
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
                    bodyState,
                    order,
                    chunkArr,
                    returnImg,
                    deleteDelayInTable,
                    dishItem,
                    styles,
                    establishmentStore
                }}
            />


            <Summary
                {...{
                    summary: dataProp.data.summary,
                    dishItem,
                    styles,
                    config
                }}
            />


            {
                console.log(dataProp.data
                )
            }

            <TabletPos
                {...{
                    delay_data: dataProp.data.delayToastPost,
                    dishItem,
                    chunkArr,
                    pipeObjectTime,
                    order,
                    returnImg,
                    styles,
                }}
            />



                   //////////  DELAY DELIVERY IN READY KICHEN
            <DeliveyDelay
                {...{
                    delay_data: dataProp.data.delayDeliveryDishWhenItIsReadyInKitchen,
                    dishItem,
                    styles,
                }}

            />

            <Services
                {...{
                    delay_data: dataProp.data.delayServices,
                    dishItem,
                    styles
                }}
            />



            <FooterPage eventClick={() => console.log(bodyState)} />
        </LayautPages>
    );
});