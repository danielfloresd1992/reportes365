import { useEffect, useContext, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myUserContext } from '../../context/sessionContext';
import NavBarOption, { changueText } from '../../components/headerComponens/NasBarOption';
import ProtectedRoute from '../../components/ProtectedRoute';
import CompleteLayaut from '../../components/layaut/Content';

import PageService from '../../components/page/pagesFromResume/pageService'
import LayautPages from '../../components/page/compound_pages/layautPages';
import PageMultiProposal from '../../components/page/PageMultiProposal/PageMultiProposal';
import LayautNovelty from '../../components/layaut/LayautPage';
import { getFranchiseWithItsEstablishments } from '../../lib/fetching/establishment';
import GlassHourLive from '../../components/loadingComponents/glassHourLive';
import { getNoveltyForHydration } from '../../lib/fetching/novelty';

import useDataForPages from '../../hook/useDataForPages';
import { processDataNovelty, groupedItemsByCategory } from '../../lib/dataParser/arrNovelty';
import { isExistDocument, getDocumentById } from '../../lib/fetching/documents';
import useAdapterResize from '../../hook/adapter_resize';
import shiftToEs from '../../lib/script/shit_lang';
import TimeOperator from '../../lib/time';
import BgYellowGradient from '../../components/page/BgYellowGradient';

import icoAmazonas from '../../..//public/RBG-Logo-AMAZONAS 365-Original.png';
import bgBar from '../../../public/grafic.png';

//import { BarChart } from '@tremor/react';

import ContentPages from '../../components/hocs/parampages_logic_container';
import TabletLayaut from '../../components/table/table_layaut';

const styleBgLinear = {
    backgroundImage: 'linear-gradient(298deg, rgb(195 207 100), rgb(255, 255, 255))'
};




const styleCircle = {
    position: ' absolute',
    width: '900px',
    height: '900px',
    border: '70px solid #838282',
    borderRadius: '50%',
    left: '-80px',
    bottom: '-160px',
    overflow: 'hidden'
};



const styleTable = {
    borderRadius: '10px',
    borderCollapse: 'separate',
    height: '100%',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    outline: 'rgb(201 201 201) solid 2px',
}


const styleCellHead = {
    backgroundColor: 'rgb(87 129 90)',
    color: '#ffffff'
}


const styleCell = {
    outline: 'rgb(201 201 201) solid 2px',
    textAlign: 'center',
    color: '#4f4f4f'
};


const styleChilCell = {
    textAlign: 'center'
};



export default function Resume_document() {


    const { dataSessionState } = useContext(myUserContext);
    const document = dataSessionState?.dataSession?.activity?.SMU;
    const [listEstablishmentsState, setListEstablishmentsState] = useState(null);
    const [dataDocumentState, setDataDocumentState] = useState([]);
    const { fronPageData, summaryData, delayToastPostAndServise, noveltyPageData } = useDataForPages();

    const { htmlAdapterRef } = useAdapterResize({ breackWidth: 1530, reload: listEstablishmentsState });
    const keySubmit = useRef(true);


    useEffect(() => {
        dataSessionState?.dataSession?.activity?.SMU?.franchiseName && getFranchiseWithItsEstablishments(dataSessionState?.dataSession?.activity?.SMU?.franchiseName)
            .then(response => {
                console.log(response.data)
                setListEstablishmentsState(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [dataSessionState]);




    useEffect(() => {
        if (dataSessionState && listEstablishmentsState && keySubmit.current) {
            keySubmit.current = false;
            console.log(dataDocumentState.length);

            const PromomiseArrNovelty = [];
            const PromiseArrDocument = [];
            //  const { franchiseName, establishmentName, shift, date, type } = param;
            listEstablishmentsState.establishments.forEach(element => {

                const { date, shift } = dataSessionState.dataSession.activity.SMU;

                PromiseArrDocument.push(isExistDocument({
                    date: date,
                    shift: shift,
                    establishmentName: element.name,
                    type: 'complete-shift'
                }));



                PromomiseArrNovelty.push(getNoveltyForHydration({
                    date: date,
                    shift: shift,
                    nameEstablishment: element.name,
                    populate: 'menuRef',
                    properties: 'imageUrl validationResult menuEditedBy sharedByUser _id'
                }));
            });

            Promise.all(PromiseArrDocument)
                .then(responses => {
                    responses.forEach((response) => {

                        if (response.data?.result?._id) {
                            getDocumentById(response.data.result._id, `pages`)
                                .then(response => {
                                    setDataDocumentState(state => [...state, response.data]);
                                })
                                .catch(error => {
                                    console.log(error)
                                })

                        }
                    });
                })
                .catch(reason => console.log(reason))
                .finally(() => console.log('final promise'));


            Promise.all(PromomiseArrNovelty)
                .then(responses => {
                    responses.forEach(response => {

                        //    console.log(groupedItemsByCategory(response.data))
                    });
                })
                .catch(reason => console.log(reason))
                .finally(() => console.log('final promise'));

        }


    }, [dataSessionState, listEstablishmentsState, dataDocumentState])





    return (
        <ProtectedRoute>
            <CompleteLayaut>
                <div className='relative w-full h-full flex justify-center flex-wrap '>
                    <ContentPages
                        nameDocument={`Resumen del turno: ${shiftToEs(document?.shift)}-${document?.date} de ${document?.franchiseName}.pdf`}
                    >
                        {
                            !listEstablishmentsState ?
                                GlassHourLive()
                                :
                                <>
                                    <PageMultiProposal noIcon={true}>
                                        <div className='w-full h-full flex overflow-hidden' style={styleBgLinear}>
                                            <div className='relative w-[50%] h-[100%] flex flex-col justify-center items-center gap-[1rem] p-[2rem_4rem] zIndex-2'>
                                                <div className='absolute top-[20px] left-[20px]'>
                                                    <img className='w-[300px]' src={icoAmazonas} alt='logo-365' />
                                                </div>

                                                <div className='flex justify-center items-center flex-col'>
                                                    <h1 className='text-[1.6rem] font-semibold text-[#0c4100] text-center leading-[1.2] noto-sans-text'>Resumen del turno</h1>
                                                </div>

                                                <div className='text-[2rem] font-bold text-[#4f4f4f] text-center noto-sans-text'>
                                                    <p>{document.franchiseName}</p>
                                                </div>
                                                <div className='text-[1.5rem] font-medium text-[#4f4f4f] text-center noto-sans-text'>

                                                    <p>Turno: {shiftToEs(document?.shift)}</p>
                                                    <p>Fecha: {TimeOperator.americanDateFormat(document?.date)}</p>
                                                </div>
                                            </div>

                                            <div className='relative w-[50%] h-full flex flex-col justify-between items-center p-[2rem_4rem]'>
                                                <div style={styleCircle}>
                                                    <img className='w-full filter blur-[0px]' draggable={false} src={bgBar} alt='bar-bg' />
                                                </div>
                                            </div>
                                        </div>
                                    </PageMultiProposal>





                                    <PageMultiProposal noIcon={false}>
                                        <BgYellowGradient title='Toques de mesas por gerentes'>
                                            <div className='w-full h-full p-[2rem_0rem_4.8rem_0]'>
                                                <TabletLayaut styles={{ borderCollapse: 'separate', height: '100%', backgroundColor: 'transparent', overflow: 'hidden', ...styleTable }}>
                                                    <tr>
                                                        <th style={{ ...styleCell, ...styleCellHead }}>Locación</th>
                                                        <th style={{ ...styleCell, ...styleCellHead }}>Managers</th>
                                                        <th style={{ ...styleCell, ...styleCellHead }}>Primeros</th>
                                                        <th style={{ ...styleCell, ...styleCellHead }}>Otros</th>
                                                        <th style={{ ...styleCell, ...styleCellHead }}>Total</th>
                                                    </tr>
                                                    {
                                                        dataDocumentState.map(item => (
                                                            <>
                                                                {
                                                                    item.pages[1].data.touch.map((col, index, arr) => (
                                                                        <tr>
                                                                            {
                                                                                index === 0 ?
                                                                                    <td style={{ ...styleCell, fontSize: '1.2rem' }} rowSpan={arr.length}>{item.establishmentName}</td>
                                                                                    : null
                                                                            }
                                                                            <td style={{ ...styleCell, fontWeight: 600 }}>{col.name}</td>
                                                                            <td style={{ ...styleCell, fontWeight: 600 }}>  {col.result.firt.value}</td>
                                                                            <td style={{ ...styleCell, fontWeight: 600 }}> {col.result.second.value}</td>
                                                                            <td style={{ ...styleCell, fontWeight: 600 }}>
                                                                                {
                                                                                    !(isNaN(col.result.firt.value) && isNaN(col.result.second.value)) ? Number(col.result.firt.value) + Number(col.result.second.value) : 'N/A'
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                }
                                                            </>
                                                        ))
                                                    }
                                                </TabletLayaut>
                                            </div>
                                        </BgYellowGradient>
                                    </PageMultiProposal>





                                    <PageService
                                        listEstablishments={listEstablishmentsState}
                                        dataPage={dataDocumentState}
                                    />
                                </>
                        }
                    </ContentPages>
                </div>
            </CompleteLayaut>
        </ProtectedRoute >
    );
}



