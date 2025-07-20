import { useState, useEffect, useRef, useContext, useCallback, memo } from 'react';
import { addPageInDocument } from '../../../lib/fetching/documents';
import imageSumary from '../../../../public/page_front/sumaryClassic.png'
import { myUserContext } from '../../../context/sessionContext';
import Sortable from 'sortablejs';
import icoUnique from '../../../../public/ico/icons8-u-48.png'

import icoAside from '../../../../public/ico/page-general-64.png';
import icoNext from '../../../../public/ico/icons8-forward-24.png';
import imagePreviewNovelty from '/page_front/Captura_noveltyPage.png';
import tableTouchPage from '../../../../public/page_front/table_touch_page.png';
import imageDelayToast from '../../../../public/page_front/servisesToast.png';
import imageDelay from '../../../../public/page_front/delay.png'
import useDataForPages from '../../../hook/useDataForPages';
import TimeOperator from '../../../lib/time';


import { ObjectComplete } from '../../../type/dataPage';
import icoMove from '../../../../public/ico/icons8-arrastrar-lista-hacia-arriba-64.png'



export default memo(function AsideClonePage({ pages, pagesIds, addData, coundDocument, updateDataPage }: any) {


    const { fronPageData, noveltyPageData, summaryData, touchPageData, delay1attention, delayClean, delayToastPostAndServise } = useDataForPages();
    const [viewSectionState, setViewSectionState] = useState(true);

    const [pagesState, setPagesSatete] = useState([]);

    const { dataSessionState }: any = useContext(myUserContext);
    const dragElement = useRef(null);


    /*
    useEffect(() => {
        if (pages
        */


    useEffect(() => {
        if (dragElement.current && pages) {

            const sortable = Sortable.create(dragElement.current, {
                animation: 150,
                easing: 'cubic-bezier(1, 0, 0, 1)',
                swapThreshold: 1,
                ghostClass: 'sortable-ghost',
                onUpdate: (e) => {
                    const id = e.item.id;
                    scrollSection(id);
                },
                onEnd: (e) => {
                    const newOrder = sortable.toArray();
                    updateDataPage(newOrder, true);
                },
                forceFallback: true,

            });


            return () => sortable.destroy();
        }
    }, [viewSectionState, pages, pagesState]);


    const handdlerCliciNovelty = useCallback(() => {
        addData(null, noveltyPageData);
    }, [coundDocument]);


    const changeSection = (valueBoolean: boolean) => {
        setViewSectionState(valueBoolean);
    };



    const scrollSection = (id: string) => {
        const getId = id.split('#');
        const elementPage = document.getElementById(getId[1]);
        console.log(elementPage)
        if (elementPage) {
            const timeOut = setTimeout(() => {
                elementPage.scrollIntoView({
                    block: 'start',
                    behavior: 'smooth'
                });
                clearTimeout(timeOut);
            }, 1000);
        }
    };



    const returnNameSection = (type: string, defaultString: string) => {
        let nameSection: string = '';
        switch (type) {
            case 'front': nameSection = 'Portada'
                break;
            case 'summary': nameSection = 'Resumen estandar'
                break
            case 'delayToastPostAndServise': nameSection = 'Métricas y demoras T'
                break
            case 'touchPageData': nameSection = 'Toques de gerente'
                break
            case 'delay1ra': nameSection = 'Demora Primera atención'
                break
            case 'delayClear': nameSection = 'Demora de limpieza'
                break
            default: nameSection = defaultString;
                break;
        }

        return nameSection;
    };





    return (
        <div className='aside-left' >
            <div className='h-full w-full'>
                <div className='h-[100%] w-[100%] flex flex-col justify-start items-center'>

                    <div className='w-[100%] p-[.5rem]'>
                        <div className='w-[100%] flex justify-between'>
                            <p style={{ fontSize: '.8rem', color: '#000', fontWeight: (viewSectionState ? 700 : 400), cursor: 'pointer' }} onClick={() => changeSection(true)}>Páginas</p>
                            <p style={{ fontSize: '.8rem', color: '#000', fontWeight: (!viewSectionState ? 700 : 400), cursor: 'pointer' }} onClick={() => changeSection(false)}>Vista previa</p>
                        </div>
                        <hr />
                    </div>

                    {
                        viewSectionState ?
                            <div className='w-full h-full flex items-center flex-col gap-[1.5rem] scroll-y pt-4 pb-4'>

                                <div
                                    className='w-[80%] cursor-pointer flex items-center justify-center gap-[.5rem] zoom-in relative pointer'
                                    onClick={() => addData(null, summaryData)}
                                    title='resumen clasico'
                                >
                                    {
                                        summaryData.unique ?
                                            <img src={icoUnique} alt='unique-ico' className='w-[25px] absolute top-[25px] left-[5px]' />
                                            :
                                            null

                                    }
                                    <img src={imageSumary} alt='image-preview-novelty' />
                                    <p className='text-white  text-sm font-bold absolute' style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>Resumen</p>
                                </div>



                                <div
                                    className='w-[80%] cursor-pointer flex items-center justify-center gap-[.5rem] zoom-in relative pointer'
                                    onClick={() => {
                                        addData(null, delayToastPostAndServise);
                                    }}
                                >
                                    {
                                        delayToastPostAndServise.unique ?
                                            <img src={icoUnique} alt='unique-ico' className='w-[25px] absolute top-[25px]  left-[5px]' />
                                            :
                                            null

                                    }
                                    <img className='min-h-[100px]' src={imageDelayToast} alt='Toast Pos' />
                                    <p className='text-white  text-sm font-bold absolute' style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>Toast Pos</p>
                                </div>


                                <div
                                    className='w-[80%] cursor-pointer flex items-center justify-center gap-[.5rem] zoom-in relative pointer'
                                    onClick={() => {
                                        addData(null, touchPageData);
                                    }}
                                >
                                    {
                                        touchPageData.unique ?
                                            <img src={icoUnique} alt='unique-ico' className='w-[25px] absolute top-[25px]  left-[5px]' />
                                            :
                                            null

                                    }
                                    <img className='min-h-[100px]' src={tableTouchPage} alt='image-preview-novelty shadow-for-page' />
                                    <p className='text-white  text-sm font-bold absolute' style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>Toques</p>
                                </div>


                                <div
                                    className='w-[80%] cursor-pointer flex items-center justify-center gap-[.5rem] zoom-in relative pointer'
                                    onClick={handdlerCliciNovelty}
                                >
                                    {
                                        noveltyPageData.unique ?
                                            <img src={icoUnique} alt='unique-ico' className='w-[25px] absolute top-[25px]  left-[5px]' />
                                            :
                                            null

                                    }
                                    <img className='min-h-[100px]' src={imagePreviewNovelty} alt='image-preview-novelty shadow-for-page' />
                                    <p className='text-white  text-sm font-bold absolute' style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>Novedad</p>
                                </div>


                                <div
                                    className='w-[80%] cursor-pointer flex items-center justify-center gap-[.5rem] zoom-in relative pointer'
                                    onClick={() => {
                                        const data = { ...delay1attention };
                                        data.data.body.forEach((item: any): void => {
                                            item.createdAt = TimeOperator.returnTimeIso();
                                            item.createBy = `${dataSessionState.dataSession.name} ${dataSessionState.dataSession.surName}`;
                                        });
                                        addData(null, data);
                                    }}
                                >
                                    {
                                        delay1attention.unique ?
                                            <img src={icoUnique} alt='unique-ico' className='w-[25px] absolute top-[25px]  left-[5px]' />
                                            :
                                            null

                                    }
                                    <img className='min-h-[100px]' src={imageDelay} alt='image-preview-novelty shadow-for-page' />
                                    <p className='text-white  text-sm font-bold absolute' style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>1ra atención</p>
                                </div>



                                <div
                                    className='w-[80%] cursor-pointer flex items-center justify-center gap-[.5rem] zoom-in relative pointer'
                                    onClick={() => {
                                        const data = { ...delayClean };
                                        data.data.body.forEach((item: any): void => {
                                            item.createdAt = TimeOperator.returnTimeIso();
                                            item.createBy = `${dataSessionState.dataSession.name} ${dataSessionState.dataSession.surName}`;
                                        });
                                        addData(null, data);
                                    }}
                                >
                                    {
                                        delayClean.unique ?
                                            <img src={icoUnique} alt='unique-ico' className='w-[25px] absolute top-[25px]  left-[5px]' />
                                            :
                                            null

                                    }
                                    <img className='min-h-[100px]' src={imageDelay} alt='image-preview-novelty shadow-for-page' />
                                    <p className='text-white  text-sm font-bold absolute' style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>Limpieza</p>
                                </div>


                            </div>
                            :
                            <div className='w-full h-full flex items-center flex-col gap-[1.5rem] scroll-y pt-4 pb-4 p-[1rem_0]'>
                                <div className='w-full h-full ' ref={dragElement}>
                                    {
                                        pages.length > 0 && pagesIds.length > 0 && pagesIds.map((page: any, index: number) => {
                                            const pagePrint = pages.filter((pageOfPages: any, index: number) => pageOfPages._id === page)[0];

                                            if (pagePrint) {
                                                return (
                                                    <div
                                                        className='page-preview rounded-md'
                                                        key={page}
                                                        data-id={page}
                                                        id={`#${page}`}
                                                    >
                                                        <div className='absolute w-full h-[20px] bg-[#e5ebe9] top-[0]'>
                                                            <img className='w-[12px]' src={icoMove} alt='ico-move' />
                                                        </div>
                                                        <div className='w-full min-h-[100px] flex flex-col justify-center items-center p-[0_1rem]'>
                                                            <span className='text-sm text-center'> {returnNameSection(pagePrint?.type, pagePrint?.data?.menuRef?.es)}</span>
                                                        </div>
                                                    </div>
                                                )
                                            }

                                            else (
                                                null
                                            )

                                        })
                                    }
                                </div>
                            </div>
                    }

                </div>
            </div>
            <div className='button-aside-left'>
                <img className='w-[20ox] h-[20px]' src={icoNext} alt='ico-next' />
            </div>
        </div>
    );
});