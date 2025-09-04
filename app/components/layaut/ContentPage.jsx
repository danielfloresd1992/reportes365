import { useState, useEffect, forwardRef, memo } from 'react';
//fetching data
import { getManeuAll } from '../../lib/fetching/menu';


// components
import ReturnPage from '../../components/page/seletedPage';
import useAdapterResize from '../../hook/adapter_resize';
import GlassHourLive from '../../components/loadingComponents/glassHourLive';
import ContentPages from '../hocs/parampages_logic_container';




const ContentPage = forwardRef(({ establishmentProp, idDocument, documentArr, updateOrder, addPagesForPreviewProp, deletePage, nameDocument }, ref) => {


    const [menuAllState, setMenuAllState] = useState([]);



    useEffect(() => {
        if (documentArr) {
            getManeuAll()
                .then(response => setMenuAllState([...response.data]))
                .catch(error => console.log(error));
        }
    }, [documentArr]);




    return (
        <div className='w-[70%] h-full main-content-document'>
            <ContentPages ref={ref} nameDocument={nameDocument} {...{ updateOrder, idDocument }}>
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