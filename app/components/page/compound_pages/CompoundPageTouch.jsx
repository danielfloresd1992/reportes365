import { useState, useCallback } from 'react';

import { updatePageInDocument, setImgPageInDocument } from '../../../lib/fetching/documents';
import LayautPages from '../compound_pages/layautPages';

//components 
import PageTouchTable from '../compound_pages/PageTouchTable';

import InputPasteEventReusable from '../../inputs/inputPasteEventReusable';
import PageForImage from '../PageForImage';
import HeaderPage from './headerCompound';
import FooterPage from './footerCompound';

export default function CompoundPageTouch({ styles, data, updateDataProp, deletePage, dataId }){

    
    const [ dataListTouchState, setDataListTouchState ] = useState({...data});
    


    const uddateBodyData = useCallback(body => {
        const dataForUpdate = { ...dataListTouchState, data: { ...dataListTouchState.data, ...body } };
        updatePageInDocument(data?._id, dataForUpdate)
            .then(response => {
                setDataListTouchState(dataForUpdate);
            })
            .catch(error => console.log(error));
        
    }, [data, dataListTouchState]);



    const saveImg = useCallback((file, index) => {
        setImgPageInDocument(data._id, {file, index})
        .then(response => {
            setDataListTouchState(response.data.data);
        })
        .catch(error => console.log(error));
    }, [ data, dataListTouchState ]);
    




    return(
        <LayautPages dataId={dataId}>
            <HeaderPage deletePage={() => deletePage(null, data._id)} dataId={dataId}>
                <InputPasteEventReusable  
                    name={data.name_establishment}
                    setData={dataTable => uddateBodyData({ body: dataTable.parser})}
                    value='toques aquí'
                />
                
            </HeaderPage>
                <PageTouchTable styles={styles} setData={uddateBodyData} dataList={dataListTouchState?.data} saveImgProp={saveImg} />
            {
                dataListTouchState?.data?.body?.length > 3 ?
                <PageForImage styles={styles} data={dataListTouchState} setData={uddateBodyData} saveImgProp={saveImg} />
                : 
                null
            }
            <FooterPage />
        </LayautPages>
    );
}