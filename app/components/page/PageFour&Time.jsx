import { useCallback, useEffect, useState } from 'react';
import Title from '../../components/page/TitleContent';
import ContentImg from '../../components/layaut/ContentImg';
import deleteIco from '../../../public/ico/icons8-borrar-para-siempre-96.png';
import icoImg from '../../../public/RGB-Icono-AMAZONAS 365-Original.png';
import icoJarvis from '../../../public/logo-page-removebg.png';
import Image from '../../components/image_for_page/image';
import { getMenuById } from '../../lib/fetching/menu';
import { updatePageInDocument, setImgPageInDocument } from '../../lib/fetching/documents';

import BoxTextEvent from '../page/boxTextEvent';

import Search from '../../components/search'
import LayautNovelty from '../../components/layaut/LayautPage';




export default function FourAndTime({ menus, data, updateDataProp, styles, injectId, deletePage, dataId, indexPage }) {


    const [menuSeletedState, setMenuSeleted] = useState();



    useEffect(() => {

        if (injectId && !menuSeletedState) uadatePage(injectId);
        else if (data?.data?.idMenu) {
            if (data?.data?.idMenu !== menuSeletedState?._id) uadatePage(data.data.idMenu);
        }

    }, [menuSeletedState, data]);



    const uadatePage = useCallback((injectId) => {
        getMenuById(injectId ?? data?.data?.idMenu)
            .then(response => {
                setMenuSeleted(response.data[0]);
            })
            .catch(error => {
                setErrorState(error);
            });
    }, [data]);




    const seletedMenuForRender = useCallback(id => {
        const body = { ...data, data: { ...data?.data, idMenu: id } };
        updatePageInDocument(data?._id, body)
            .then(response => {
                updateDataProp(response.data.data);
            })
            .catch(error => console.log(error));
    }, [data]);



    const uddateBodyData = useCallback(body => {
        const dataForUpdate = { ...data, data: { ...data.data, ...body } };
        updatePageInDocument(data?._id, dataForUpdate)
            .then(response => {
                //setDataListTouchState(dataForUpdate);
            })
            .catch(error => console.log(error));

    }, [data]);



    const saveImg = useCallback((file, index) => {
        setImgPageInDocument(data._id, { file, index })
            .then(response => {
                updateDataProp(response.data.data);
            })
            .catch(error => console.log(error));
    }, [data]);




    const renderLayautContent = useCallback(() => {
        if (menuSeletedState?.photos?.caption?.length === 2) {
            return (
                <div className='relative flex flex-wrap justify-center items-center content-center gap-[20px] w-full h-full'>
                    <div className='flex flex-row justify-center items-centerSASD p-4 gap-[.5rem] w-full h-full'>
                        <div className='w-[55%] h-full flex flex-col gap-[.5rem] items-center justify-center'>
                            {
                                menuSeletedState?.photos?.caption?.map((item, index, arr) => (
                                    <Image
                                        item={item}
                                        count={arr.length}
                                        full={true}
                                        styles={styles}
                                        layautDouble={true}
                                        setSrc={Array.isArray(data?.data?.img) ? data?.data?.img[index] : null}
                                        getFile={(file) => saveImg(file, index)}
                                        arrowCordernate={true}
                                        setCoordinates={data?.data && Array.isArray(data?.data?.coordinates) ? data?.data?.coordinates[index] : null}
                                        saveCordenate={coordinates => {
                                            if (data?.data) {
                                                if (!Array.isArray(data?.data?.coordinates)) data.data.coordinates = [];
                                                data.data.coordinates[index] = coordinates;
                                                uddateBodyData({ coordinates: data.data.coordinates });

                                            }
                                        }
                                        }
                                        key={index}
                                    />
                                ))
                            }
                        </div>
                        <div className='h-full w-[45%] flex items-center justify-center flex-col items-center gap-[.5rem]'>
                            <Title title={menuSeletedState?.es} styles={styles} />
                            {
                                menuSeletedState.table ?
                                    (
                                        <BoxTextEvent label={'Mesa'} value={data?.data?.table ?? 0} styles={styles} getValue={value => uddateBodyData({ table: value })} />
                                    )
                                    :
                                    (
                                        null
                                    )
                            }
                            {
                                menuSeletedState?.time ?
                                    <BoxTextEvent label={'Duración'} value={data?.data?.timeTotal ?? 0} styles={styles} getValue={value => uddateBodyData({ timeTotal: value })} />
                                    :
                                    <div></div>
                            }
                            {
                                menuSeletedState?.descriptionNoteForReportDocument ? 
                                <div className='w-[50%] shadow-lg bg-yellow-100 p-[1rem]'>
                                    <textarea  className='w-full h-full text-center bg-transparent'>Nota:</textarea>
                                </div>
                                : 
                                null
                            }
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <>
                    <Title title={menuSeletedState?.es} styles={styles} />
                    <div className='relative flex flex-wrap justify-center items-center content-center gap-[20px] w-full h-full'>
                        {
                            menuSeletedState?.photos.caption?.map((item, index, arr) => (
                                <Image
                                    item={item}
                                    count={arr.length}
                                    styles={styles}
                                    layautDouble={false}
                                    full={false}
                                    h_full={false}
                                    setSrc={Array.isArray(data?.data?.img) ? data?.data?.img[index] : null}
                                    getFile={(file) => saveImg(file, index)}
                                    arrowCordernate={true}
                                    setCoordinates={Array.isArray(data?.data?.coordinates) ? data?.data?.coordinates[index] : null}
                                    saveCordenate={coordinates => {
                                        if (data?.data) {
                                            if (data?.data && !Array.isArray(data?.data?.coordinates)) data.data.coordinates = [];
                                            data.data.coordinates[index] = coordinates;
                                            uddateBodyData({ coordinates: data.data.coordinates });
                                        }
                                    }
                                    }
                                    key={index}
                                />
                            ))
                        }
                    </div>
                    {
                        menuSeletedState?.time ?
                            <BoxTextEvent label={'Duración'} value={data?.data?.timeTotal ?? '00:00:00'} styles={styles} getValue={value => uddateBodyData({ timeTotal: value })} />
                            :
                            <div></div>
                    }
                </>
            )
        }
    }, [menuSeletedState, data, styles]);





    return (
        <LayautNovelty numberPage={indexPage} styles={styles} dataId={dataId}>
            {
                menuSeletedState ?
                    renderLayautContent()
                    :
                    null
            }
        </LayautNovelty>
    );
}