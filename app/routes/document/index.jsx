import { useState, useEffect, useMemo, useCallback, useRef, useContext } from 'react';
import { myUserContext } from '../../context/sessionContext';
import { useSelector, useDispatch } from 'react-redux';
import { modalConfig } from '../../store/slices/modal';
import { setConfigAwait } from '../../store/slices/awaitStore';
import useDataForPages from '../../hook/useDataForPages';
import ProtectedRoute from '../../components/ProtectedRoute';
import CompleteLayaut from '../../components/layaut/Content';
import ContentPage from '../../components/layaut/ContentPage';
import ContentPreviewDocument from '../../components/aside/aside_preview_document.js/ContentPreviewDocument';
import { changueText } from '../../components/headerComponens/NasBarOption';
import AsideClonePage from '../../components/aside/aside_clone_page/Aside_Clone_Page';
import { htmlToPng } from '../../lib/file/toPng';
import { jsPDF } from 'jspdf';
import shiftToEs from '../../lib/script/shit_lang';
import { getDocumentById, addPageInDocument, deletePageInDocument, patchDocumentById } from '../../lib/fetching/documents';
import { getNoveltyForHydration } from '../../lib/fetching/novelty';
import { getImgEstablishmentById } from '../../lib/fetching/establishment';

import { setEstablishmentDocument } from '../../store/slices/establishmentDocument';
import { setQueryAlertDocument } from '../../store/slices/queryAlertDocument';


import { processDataNovelty } from '../../lib/dataParser/arrNovelty';




export default function Document() {


    const [documentDataResponse, setDataResponse] = useState(null);
    const [pagesForPreviewState, setPagesForPreviewState] = useState([]);
    const [hydratatedBooleanState, setHydratateState] = useState(true);
    const { dataSessionState } = useContext(myUserContext);
    const documentDataCookie = dataSessionState?.dataSession?.activity;
    const establishmentStore = useSelector(store => store.establishmentDocument);
    const { fronPageData, summaryData, delayToastPostAndServise, noveltyPageData } = useDataForPages();
    const refElement = useRef();
    const keyRef = useRef(true);

    const dispatch = useDispatch();




    useEffect(() => {

        if (!establishmentStore && documentDataCookie) {
            getImgEstablishmentById(documentDataCookie?.SMU?.establishmentId, 'config_report managers dishes')
                .then(response => {
                    dispatch(setEstablishmentDocument(response.data));
                })
                .catch(error => {
                    console.log(error);
                });
            getDocumentById(documentDataCookie?.idDocument)
                .then(response => {

                    setDocumentProps(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }


        if (documentDataResponse && establishmentStore && documentDataCookie && documentDataResponse.pages.length === 0 && keyRef.current) {
            keyRef.current = false;



            hydrateDocumentWithJarvis(null, async (dataArr, errorCall) => {
                try {

                    if (errorCall) throw 'Error al cargar las alertas en el documento';

                    const { arr } = processDataNovelty({ summaryData, noveltyPageData, delayToastPostAndServise, establishmentStore, dataArr });
                    arr.unshift(fronPageData);
                    const PromiseArr = [];

                    arr.forEach(page => {
                        PromiseArr.push(addPageInDocument(documentDataResponse._id, page));
                    });

                    const responses = await Promise.all(PromiseArr)

                    const idArr = responses.map(r => r.data.data._id);
                    const toSaveArrOrder = [...documentDataResponse.pages, ...idArr];

                    // Paso 5: Actualizar estado
                    setDataResponse({
                        ...documentDataResponse,
                        pages: toSaveArrOrder
                    });

                    updatePage(toSaveArrOrder);
                    changueText('Documento hidratado por Jarvis 🤖', 'springgreen');

                }
                catch (error) {
                    console.error(error);
                    changueText('Documento en modo manual', 'red');
                    const responseFront = await addPageInDocument(documentDataResponse._id, fronPageData);
                    const responseSummary = await addPageInDocument(documentDataResponse._id, summaryData);
                    const responses = await Promise.all([responseFront, responseSummary]);
                    const idArr = responses.map(r => r.data.data._id);
                    const toSaveArrOrder = [...documentDataResponse.pages, ...idArr];

                    setDataResponse({
                        ...documentDataResponse,
                        pages: toSaveArrOrder
                    });

                    dispatch(modalConfig({
                        open: true,
                        title: 'Error crítico',
                        description: 'Ha ocurrido un error inesperado al cargar las alertas en vivo, se han cargado las páginas de inicio para el modo manual',
                        callback: null,
                        type: 'error',
                    }))
                }
            });
        }
    }, [documentDataResponse, dataSessionState, , establishmentStore, keyRef]);






    const hydrateDocumentWithJarvis = useCallback((data, callback) => {
        if (hydratatedBooleanState) {
            const arrDate = documentDataResponse.date.split('-');
            const dateFormatted = `${arrDate[1]}-${arrDate[2]}-${arrDate[0]}`;
            getNoveltyForHydration({
                nameEstablishment: documentDataResponse.establishmentName,
                date: dateFormatted,
                shift: documentDataResponse.shift === 'unique' ? 'all' : documentDataResponse.shift,
                populate: 'menuRef',
                properties: 'imageToShare imageUrl validationResult menuEditedBy sharedByUser _id'
            })
                .then(response => {
                    const filteredWithoutMenu = response.data.filter(item => { if (item.menuRef) return item });
                    if (documentDataResponse.jarvisNewsHydration === false) {
                        const filteredForDocuments = filteredWithoutMenu.filter(items => items.menuRef.useOnlyForTheReportingDocument === true);
                        callback(filteredForDocuments);
                    }
                })
                .catch(error => {
                    console.log(error);
                    callback(null, error);
                });
        }
    }, [documentDataResponse, establishmentStore]);






    useEffect(() => {
        if (documentDataResponse) {
            const arrDate = documentDataResponse.date.split('-');
            const dateFormatted = `${arrDate[1]}-${arrDate[2]}-${arrDate[0]}`;
            dispatch(setQueryAlertDocument({
                nameEstablishment: documentDataResponse.establishmentName,
                date: dateFormatted,
                shift: 'all',
                populate: 'menuRef',
                properties: 'imageToShare imageUrl validationResult menuEditedBy sharedByUser _id'
            }));
        }
    }, [documentDataResponse])



    const setDocumentProps = useCallback((dataFromRequest) => {
        setDataResponse(dataFromRequest);
    }, [documentDataResponse]);





    const addPageProp = useCallback((document, body, callback) => {
        addPageInDocument(documentDataResponse._id, body)
            .then(response => {
                const result = { ...documentDataResponse, pages: [...documentDataResponse.pages, response.data.data._id] };
                if (typeof callback === 'function') callback(result);
                setDataResponse(result);
                changueText(`Add Section ✅`, 'springgreen', true);
            })
            .catch(error => {
                let descriptionError;
                if (error?.response?.status === 400) {
                    descriptionError = 'Esta página ya existe';
                    changueText(`Error add Section ⛔`, 'red');
                }
                else {
                    descriptionError = 'Error en la api de Jarvis365';
                    changueText(`Error API ❗`, 'red');
                }
                console.log(error);
                dispatch(modalConfig({
                    type: 'error',
                    title: 'Error',
                    description: descriptionError,
                    open: true,
                }));
            });
    }, [documentDataResponse]);





    const updatePage = useCallback((dataArr, reder) => {
        patchDocumentById(documentDataResponse._id, { pages: dataArr })
            .then(response => {
                if (reder) setDataResponse({ ...documentDataResponse, pages: dataArr });
            })
            .catch(error => console.log(error));
    }, [documentDataResponse]);




    const deletePage = useCallback((idDocument, idPage) => {
        deletePageInDocument(documentDataResponse._id, idPage)
            .then(response => {
                const fillPage = documentDataResponse.pages.filter(id => id !== idPage);
                setDataResponse({ ...documentDataResponse, pages: fillPage });
                changueText(`Deleted Section ✅`, 'springgreen');
            })
            .catch(error => {
                console.log(error);
                changueText(`Error on delete Section ❗`, 'springgreen', true);
            });
    }, [documentDataResponse]);






    const addPagesForPreview = useCallback((page) => {

        setPagesForPreviewState((stateCurrent) => {

            const index = stateCurrent.findIndex(pageParams => pageParams?._id === page?._id);
            if (index < 0) return [...stateCurrent, page];
            else return stateCurrent;

        });
    }, [documentDataResponse, pagesForPreviewState]);






    return (
        <ProtectedRoute>
            <CompleteLayaut>
                <div className='relative w-full h-full flex justify-center flex-wrap'>
                    <AsideClonePage
                        addData={addPageProp}
                        pagesIds={documentDataResponse?.pages}
                        pages={pagesForPreviewState}
                        coundDocument={documentDataResponse?.pages?.length}
                        updateDataPage={updatePage}
                    />

                    <ContentPage
                        documentArr={documentDataResponse?.pages}
                        establishmentProp={establishmentStore}
                        setDocumentProps={setDocumentProps}
                        updateDataPage={updatePage}
                        addPagesForPreviewProp={addPagesForPreview}
                        deletePage={deletePage}
                        ref={refElement}
                        nameDocument={`${documentDataResponse?.establishmentName} ${shiftToEs(documentDataResponse?.shift)} ${documentDataResponse?.date}.pdf`}
                    />

                    <ContentPreviewDocument />

                </div>
            </CompleteLayaut>
        </ProtectedRoute>
    );
}