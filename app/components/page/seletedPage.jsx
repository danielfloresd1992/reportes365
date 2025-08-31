import { useCallback, useEffect, useState } from 'react';
import FrontPage from './FrontPage';
import CompoundSumary from './compound_pages/comoundSumary/compoundSumary';
import PageFourTime from './PageFour&Time';
import CompoundPageTouch from './compound_pages/CompoundPageTouch';

import CompoundDelayClear from './compound_pages/delay_clear/compoundDelayClean';
import CompoundPageDelayToastPosAndServices from './compound_pages/compoudPageDelayToastPosAndServices/compoudPageDelayToastPosAndServices';
import CompoundPageNovelty from './compound_pages/compoundPageNovelty/compoundPageNovelty'
import CompoundServices from './compound_pages/services/compound_services';
import { getPageInDocument, updatePageInDocument } from '../../lib/fetching/documents';

import tranUrlToLocal from '../../lib/fetching/transUrlLocal';

import TableTwoImage from './compound_pages/componentMultiProposal/TableTwoImage';






export default function ReturnPage({ idPage, establishment, configProp, menusProps, addPagesForPreviewProp, deletePageProp, indexPage }) {



    const [sectionDataState, setSectionDataState] = useState(null);


    useEffect(() => {
        if (!sectionDataState) {
            getPageInDocument(idPage)
                .then(response => {
                    setSectionDataState(response.data.data);
                    addPagesForPreviewProp({ ...response.data.data });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [sectionDataState]);





    const uddateBodyData = useCallback((body, callback) => {
        const dataForUpdate = { ...sectionDataState, data: { ...sectionDataState.data, ...body } };
        updatePageInDocument(sectionDataState?._id, dataForUpdate)
            .then(response => {
                callback(response.data.data.data.body)
            })
            .catch(error => {
                console.log(error);
                callback(null, error)
            });

    }, [sectionDataState]);






    if (sectionDataState?.type === 'front') return (
        <FrontPage
            data={sectionDataState}
            imageUrl={tranUrlToLocal(configProp?.urlImgFront)}
            config={configProp}
            styles={configProp?.style}
            dataId={idPage}

        />
    )
    if (sectionDataState?.type === 'summary') return (
        <CompoundSumary
            establishment={establishment}
            styles={configProp?.style}
            config={configProp}
            deletePage={deletePageProp}
            data={sectionDataState}
            dataId={idPage}
            indexPage={indexPage}
        />
    )
    if (sectionDataState?.type === 'delay1ra') return (
        <CompoundDelayClear
            data={sectionDataState}
            styles={configProp?.style}
            config={configProp}
            key={sectionDataState._id}
            deletePage={deletePageProp}
            dataId={idPage}
            indexPage={indexPage}
            typeDelay='delay1ra'
        />
    )
    if (sectionDataState?.type === 'delayToastPostAndServise') return (
        <CompoundPageDelayToastPosAndServices
            styles={configProp?.style}
            config={configProp}
            data={sectionDataState}
            updateDataProp={uddateBodyData}
            deletePage={deletePageProp}
            dataId={idPage}
            dish={establishment?.dishes}
        />
    )
    if (sectionDataState?.type === 'touchPageData') return (
        <CompoundPageTouch
            styles={configProp?.style}
            config={configProp}
            data={sectionDataState}
            updateDataProp={data => updateData}
            deletePage={deletePageProp}
            dataId={idPage}
            indexPage={indexPage}
        />
    )
    if (sectionDataState?.type === 'delayClear') return (
        <CompoundDelayClear
            data={sectionDataState}
            styles={configProp?.style}
            config={configProp}
            key={sectionDataState._id}
            deletePage={deletePageProp}
            dataId={idPage}
            indexPage={indexPage}
            typeDelay='clean'
        />
    )

    if (sectionDataState?.type === 'blocked&novelty') return (
        <CompoundPageNovelty
            data={sectionDataState}
            updateDataProp={uddateBodyData}
            styles={configProp?.style}
            menus={menusProps}
            key={sectionDataState._id}
            deletePage={deletePageProp}
            dataId={idPage}
            indexPage={indexPage}
        />
    );


    else return null;
}