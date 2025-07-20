import { useCallback, useEffect, useState } from 'react';
import Title from '../../TitleContent';
import NoteDescription from '../../../inputs/Note_Description';
import HeaderPage from '../headerCompound';
import FooterPage from '../footerCompound';
import addIco from '../../../../../public/ico/icons8-añadir-50.png';
import Image from '../../../image_for_page/image';   //../../components/image_for_page/image
import { getMenuById } from '../../../../lib/fetching/menu';
import { updatePageInDocument, setImgPageInDocument, sendImg } from '../../../../lib/fetching/documents';
import tranUrlToLocal from '../../../../lib/fetching/transUrlLocal';
import BoxTextEvent from '../../../page/boxTextEvent';
import Search from '../../../../components/search'
import LayautNovelty from '../../../../components/layaut/LayautPage';
import LayautPages from '../layautPages';
import TimeOperator from '../../../../lib/time';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { modalConfig } from '../../../../store/slices/modal';
import useFindArticle from '../../../../hook/find_to_asidebar';




export default function CompoundPageNovelty({ menus, data, updateDataProp, styles, injectId, deletePage, dataId, indexPage }) {


    const [menuSeletedState, setMenuSeleted] = useState();
    const [bodyDataState, setBodyDataState] = useState();
    const { findNovelty } = useFindArticle();
    const dispatch = useDispatch();


    useEffect(() => {
        setBodyDataState(data?.data);
    }, [data]);


    useEffect(() => {
        if (injectId && !menuSeletedState) uadatePage(injectId);
        else if (data?.data?.idMenu) {
            if (data?.data?.idMenu !== menuSeletedState?._id) uadatePage(data.data.idMenu);

        }
        else if (data?.data?.menuRef?._id) {
            uadatePage(data.data.menuRef._id);
        }

    }, [menuSeletedState, data]);






    const uadatePage = useCallback((injectId) => {
        if (data.data.menuRef) {
            setMenuSeleted(data.data.menuRef);
        }
        else {
            getMenuById(injectId ?? data?.data?.idMenu)
                .then(response => {
                    const dataResponse = response.data[0];
                    const newNovelty = {
                        title: dataResponse.es,
                        _id: uuidv4(),
                        imageUrl: [],
                        coordinates: []
                    };
                    const newData = { menuRef: dataResponse, body: [newNovelty] };
                    updateDataProp(newData, (data, error) => {
                        if (!error) console.log(error);
                        setBodyDataState(newData);
                    });

                    setMenuSeleted(dataResponse);
                })
                .catch(error => {
                    setErrorState(error);
                });
        }
    }, [data]);




    const seletedMenuForRender = useCallback(id => {

        const menuSeleted = menus.filter(menu => menu._id === id)
        if (menuSeleted.length > 0) {
            //const newData = {...data: }
            uadatePage(menuSeleted[0]._id);
        }
    }, [data, menuSeletedState]);




    const saveImg = useCallback(async (file, id, indexImg, caption) => {
        try {

            const noveltIndex = bodyDataState.body.findIndex(item => item._id === id);
            const newNovelty = { ...bodyDataState.body[noveltIndex] };


            if (!newNovelty.imageUrl[indexImg]) newNovelty.imageUrl[indexImg] = { url: null, caption: caption ?? null };


            console.log(newNovelty.imageUrl[indexImg]);



            if (typeof file === 'string') {
                newNovelty.imageUrl[indexImg].url = file;
            }
            else if (file === undefined) {

            }
            else {
                const imageUrl = await sendImg(file);
                newNovelty.imageUrl[indexImg].url = imageUrl.data.urlFile;
            }


            if (newNovelty.imageUrl[indexImg].caption !== caption) newNovelty.imageUrl[indexImg].caption = caption;


            const newData = { ...bodyDataState };
            newData.body[noveltIndex] = newNovelty;

            /*
            updateDataProp(newData, (data, error) => {
                if (!error) setBodyDataState(newData);
            });
        */
        }
        catch (error) {
            console.log(error);
        }
    }, [data, bodyDataState]);





    const updateBody = useCallback((id, body) => {
        const noveltIndex = bodyDataState.body.findIndex(item => item._id === id);
        const newNovelty = { ...bodyDataState.body[noveltIndex], ...body };
        const newData = { ...bodyDataState };
        newData.body[noveltIndex] = newNovelty;

        updateDataProp(newData, (data, error) => {
            if (!error) setBodyDataState(newData);
        });
    }, [data, bodyDataState]);





    const addNovelty = useCallback(() => {
        const newNovelty = {
            title: menuSeletedState.es,
            _id: uuidv4(),
            imageUrl: [],
            coordinates: [],
            jarvisNewsHydration: false
        };

        const newData = { ...bodyDataState, body: [...bodyDataState.body, newNovelty] };

        updateDataProp(newData, (data, error) => {
            if (!error) console.log(error);
            setBodyDataState(newData);
        });

    }, [data, bodyDataState, menuSeletedState]);




    const deleteNovelty = useCallback((id) => {
        const bodyFilter = bodyDataState.body.filter(item => item._id !== id);
        const newData = { ...bodyDataState, body: bodyFilter };
        updateDataProp(newData, (data, error) => {
            if (!error) setBodyDataState(newData);
        });
    }, [data, bodyDataState]);





    return (
        <LayautPages dataId={dataId}>
            <HeaderPage deletePage={() => deletePage(null, data._id)} dataId={dataId} >
                <Search arrProp={menus} config={{ key: ['es', '_id'] }} seleted={seletedMenuForRender} />

                <button type='button' disabled={!menuSeletedState} onClick={addNovelty}>
                    <img className='w-[20px] pointer' src={addIco} alt='ico-add-page-novelty' />
                </button>
            </HeaderPage>

            {
                bodyDataState?.body && bodyDataState.body.map((data, indexNovelty) => (

                    menuSeletedState?.photos?.caption?.length === 2 ?    // 2 image

                        <LayautNovelty
                            key={data._id}
                            title={data.menu}
                            styles={styles}
                            onSwipeRight={{
                                callbackDelete: () => {
                                    deleteNovelty(data._id, indexNovelty);
                                },
                                deleteOnSwipe: true
                            }}
                            boubleClickEvent={() => findNovelty(data._id)}
                            idNovelty={data._id}
                        >
                            <div className='relative flex flex-wrap justify-center items-center content-center gap-[20px] w-full h-full'
                                onDoubleClick={() => {
                                    updateBody(data._id, { hiddenDescription: !data.hiddenDescription })
                                }}
                            >
                                <div className='flex flex-row justify-center items-centerSASD p-4 gap-[.5rem] w-full h-full'>
                                    <div className='w-[55%] h-full flex flex-col gap-[.5rem] items-center justify-center'>
                                        {
                                            menuSeletedState?.photos?.caption?.map((item, index, arr) => (
                                                <>
                                                    {
                                                        data.jarvisNewsHydration === true && data?.imageUrl[index] === undefined ?
                                                            null
                                                            :
                                                            <Image
                                                                item={item}
                                                                count={arr.length}
                                                                caption={menuSeletedState?.photos?.caption.length > 1 ? (data?.imageUrl[index] ? data?.imageUrl[index].caption : menuSeletedState?.photos?.caption[index].es) : null}
                                                                full={true}
                                                                styles={styles}
                                                                layautDouble={true}
                                                                setSrc={Array.isArray(data?.imageUrl) && data?.imageUrl[index] !== undefined && data?.imageUrl.length > 0 ? (data?.imageUrl[index] && data?.imageUrl[index].url ? tranUrlToLocal(data?.imageUrl[index].url) : null) : null}
                                                                getFile={(file) => saveImg(file, data._id, index, !data?.imageUrl[index] ? menuSeletedState?.photos?.caption[index].es : null)}
                                                                arrowCordernate={true}
                                                                setCoordinates={data?.coordinates && Array.isArray(data?.coordinates) ? data?.coordinates[index] : null}
                                                                saveCordenate={coordinates => {
                                                                    const newData = {};
                                                                    if (!data.coordinates) newData.coordinates = [];
                                                                    else newData.coordinates = [...data.coordinates];
                                                                    newData.coordinates[index] = coordinates;
                                                                    updateBody(data._id, newData);
                                                                }
                                                                }
                                                                key={index}
                                                                updateCaption={(text) => {
                                                                    saveImg(data?.imageUrl[index] && data?.imageUrl[index].url, data._id, index, text);
                                                                }}
                                                            />
                                                    }
                                                </>
                                            ))
                                        }
                                    </div>

                                    <div className='h-full w-[45%] flex items-center justify-center flex-col items-center gap-[.5rem]'>
                                        <Title title={data?.title} styles={styles} getValue={(text) => updateBody(data._id, { title: text })} />
                                        {
                                            menuSeletedState?.time ?
                                                <BoxTextEvent
                                                    label={'Duración'}
                                                    value={data?.timeTotal ?? data?.timePeriod ? TimeOperator.calculateTime(data.timePeriod.init, data.timePeriod.end) : '00:00:00'}
                                                    styles={styles}
                                                    getValue={value => updateBody(data._id, { timeTotal: value })}
                                                />
                                                :
                                                <div></div>
                                        }
                                        {
                                            menuSeletedState?.descriptionNoteForReportDocument ?
                                                <NoteDescription
                                                    text={data.description ?? 'Nota:'}
                                                    getValue={text => updateBody(data._id, { description: text })}
                                                    eventClick={() => {
                                                        updateBody(data._id, { hiddenDescription: true })
                                                    }}
                                                    hidden={data?.hiddenDescription}
                                                    styles={styles}
                                                />
                                                :
                                                null
                                        }
                                    </div>
                                </div>
                            </div>
                        </LayautNovelty>
                        :
                        <LayautNovelty
                            key={data._id}
                            title={data.menu}
                            styles={styles}
                            onSwipeRight={{
                                callbackDelete: () => {
                                    deleteNovelty(data._id, indexNovelty);
                                },
                                deleteOnSwipe: true
                            }}
                            boubleClickEvent={() => findNovelty(data._id)}
                            idNovelty={data._id}
                        >
                            <Title title={data?.title} styles={styles} getValue={(text) => updateBody(data._id, { title: text })} />
                            <div className='relative flex flex-wrap justify-center items-center content-center gap-[20px] w-full h-full'
                                onDoubleClick={() => {
                                    updateBody(data._id, { hiddenDescription: !data.hiddenDescription })
                                }}
                            >
                                {
                                    menuSeletedState?.photos?.caption?.map((item, index, arr) => (
                                        data.jarvisNewsHydration === true && data?.imageUrl[index] === undefined ?
                                            null
                                            :
                                            <Image
                                                item={item}
                                                count={arr.length}
                                                h_full={false}
                                                caption={menuSeletedState?.photos?.caption.length > 1 ? (data?.imageUrl[index] ? data?.imageUrl[index].caption : menuSeletedState?.photos?.caption[index].es) : null}
                                                styles={styles}
                                                setSrc={Array.isArray(data?.imageUrl) && data?.imageUrl[index] !== undefined && data?.imageUrl.length > 0 ? (data?.imageUrl[index] && data?.imageUrl[index].url ? tranUrlToLocal(data?.imageUrl[index].url) : null) : null}
                                                getFile={(file) => {
                                                    console.log(data?.imageUrl[index]);
                                                    console.log(menuSeletedState?.photos?.caption[index].es);
                                                    const dataNew = !data?.imageUrl[index] ? menuSeletedState?.photos?.caption[index].es : data?.imageUrl[index].caption;
                                                    alert(dataNew)
                                                    saveImg(file, data._id, index, dataNew)
                                                }}
                                                arrowCordernate={true}
                                                setCoordinates={data.coordinates && Array.isArray(data?.coordinates) ? data?.coordinates[index] : null}
                                                saveCordenate={coordinates => {
                                                    const newData = {};
                                                    if (!data.coordinates) newData.coordinates = [];
                                                    else newData.coordinates = [...data.coordinates];
                                                    newData.coordinates[index] = coordinates;
                                                    updateBody(data._id, newData);
                                                }
                                                }
                                                key={index}

                                                updateCaption={(text) => {
                                                    saveImg(data?.imageUrl[index] && data?.imageUrl[index].url, data._id, index, text);
                                                }}
                                            />
                                    ))
                                }

                            </div>

                            <div className='flex flex-row gap-[1rem]'>
                                {

                                    menuSeletedState?.time ?
                                        <BoxTextEvent
                                            label={'Duración'}
                                            value={data?.timeTotal
                                                ?? (
                                                    data?.timePeriod
                                                        ? TimeOperator.calculateTime(data.timePeriod.init, data.timePeriod.end)
                                                        : '00:00:00'
                                                )}
                                            styles={styles}
                                            getValue={value =>
                                                updateBody(data._id, { timeTotal: value })
                                            }
                                        />
                                        :
                                        null
                                }
                                {
                                    menuSeletedState?.descriptionNoteForReportDocument ?
                                        <NoteDescription
                                            text={data.description ?? 'Nota:'}
                                            getValue={text => updateBody(data._id, { description: text })}
                                            styles={styles}
                                            input={true}
                                            eventClick={() => {
                                                updateBody(data._id, { hiddenDescription: true })
                                            }}
                                            hidden={data?.hiddenDescription}
                                        />

                                        :
                                        null
                                }
                            </div>
                        </LayautNovelty>
                ))
            }
            <FooterPage
                eventClick={() => console.log(data)}
            />
        </LayautPages>
    );
}