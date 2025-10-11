
import { useState, useEffect, useRef, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import LayautPages from '../layautPages';

import HeaderPage from '../headerCompound';
import FooterPage from '../footerCompound';


import InputStandart from '../../../inputs/input_standart';
import Legacy from './assets/legacy';
import Summary from './assets/symary';
import TabletPos from './assets/tablet_pos';
import DeliveyDelay from './assets/DelivryDishDelay';
import Services from './assets/Services';


import SelectDelay from './assets/section_for_delay/select_delay';





export default memo(function CompoundPageDelayToastPosAndServices({ styles, config, data: dataProp, dish, updateDataProp, deletePage, dataId }) {



    const establishmentStore = useSelector(store => store.establishmentDocument);
    const [dataState, setDataState] = useState(null);

    const [entriesNameState, setEntriesNameState] = useState([]);


    const legacyRef = useRef(null);
    const toastRef = useRef(null);
    const deliveryRef = useRef(null);
    const servicesRef = useRef(null);


    const dishItem = establishmentStore?.dishes ?? [];



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





    // PUT COMPONENT ALL
    const put_delay = useCallback((data, type) => {
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
                <div className='w-full flex flex-col'>
                    <div className='w-full flex justify-center items-center flex-col gap-[.5rem]'>
                        <b className='text-center'>Legacy</b>

                    </div>
                </div>
            </HeaderPage>


            {dataState.body &&
                <Legacy
                    {...{
                        dataProp: dataState,
                        dishItem,
                        styles,
                        entriesNameState,
                        config,
                        dataId,
                        updateDataProp
                    }}
                    ref={legacyRef}
                />
            }


            <Summary
                {...{
                    dataState,
                    dishItem,
                    styles,
                    config,
                    editCell: put_delay
                }}
            />


            <TabletPos
                state={dataState.delayToastPost}
                {...{
                    establishmentStore,
                    dishItem,
                    styles,
                    editCell: put_delay
                }}

            />


            <DeliveyDelay
                {...{
                    delay_data: dataState.delayDeliveryDishWhenItIsReadyInKitchen,
                    dishItem,
                    styles,
                    editCell: put_delay
                }}
            />


            <Services
                {...{
                    delay_data: dataState.delayServices,
                    dishItem,
                    styles,
                    editCell: put_delay,
                    hiddenTable: dish.requiresTableNumber || false
                }}
                ref={servicesRef}
            />



            <FooterPage eventClick={() => console.log(dataState)} />
        </LayautPages>
    );
})