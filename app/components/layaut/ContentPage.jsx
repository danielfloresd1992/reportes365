import { useState, useEffect, forwardRef, memo } from 'react';
import Sortable from 'sortablejs';
import { useSelector } from 'react-redux';
//fetching data
import { getManeuAll } from '../../lib/fetching/menu';


// components
import FrontPage from '../../components/page/FrontPage';
import CompoundPageTouch from '../page/compound_pages/CompoundPageTouch';
import FourAndTime from '../../components/page/PageFour&Time';
import ReturnPage from '../../components/page/seletedPage';
import { useContext } from 'react';
import { myUserContext } from '../../context/sessionContext';

import { getImgEstablishmentById } from '../../lib/fetching/establishment';
import { getDocumentById, patchDocumentById } from '../../lib/fetching/documents';
import useAdapterResize from '../../hook/adapter_resize';


import GlassHourLive from '../../components/loadingComponents/glassHourLive';


import ContentPages from '../hocs/parampages_logic_container';



const ContentPage = forwardRef(({ establishmentProp, documentArr, documentArreDataPage, updateDataPage, addPagesForPreviewProp, deletePage, nameDocument }, ref) => {


    const [menuAllState, setMenuAllState] = useState([]);
    const { htmlAdapterRef } = useAdapterResize({ breackWidth: 1530, breackMinWidth: { breackWidth: 1210, limit: 1100 } });





    useEffect(() => {
        if (documentArr) {
            getManeuAll()
                .then(response => setMenuAllState([...response.data]))
                .catch(error => console.log(error));
        }
    }, [documentArr]);



    return (
        <div className='w-[70%] h-full main-content-document'>
            <ContentPages ref={ref} nameDocument={nameDocument} >
                {
                    documentArr ? documentArr.map((value, index) => (
                        <ReturnPage
                            idPage={value}
                            key={value}
                            configProp={establishmentProp?.config_report}
                            menusProps={menuAllState}
                            establishment={establishmentProp}
                            indexPage={index}
                            addPagesForPreviewProp={addPagesForPreviewProp}
                            deletePageProp={deletePage}
                        />
                    ))
                        :
                        GlassHourLive()
                }
            </ContentPages>
        </div>
    );
});



export default memo(ContentPage);