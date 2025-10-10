import { useState, useCallback, useContext } from 'react';
import { myUserContext } from '../../../../context/sessionContext';
import { useDispatch } from 'react-redux';

import { modalConfig } from '../../../../store/slices/modal';
import { updatePageInDocument, sendImg } from '../../../../lib/fetching/documents';

import { changueText } from '../../../headerComponens/NasBarOption';
import PageDelayClearTable from './page_delayClear_table';
import PageForDelayClearImage from './page_delayClearImage';
import LayautPages from '../layautPages';
import HeaderPage from '../headerCompound';
import FooterPage from '../footerCompound';

import InputPasteEventReusable from '../../../inputs/inputPasteEventReusable';


import TimeOperator from '../../../../lib/time';
import useDataForPages from '../../../../hook/useDataForPages';




export default function CompoundPageDelayClear({ styles, data, updateDataProp, config, deletePage, dataId, typeDelay }) {


    const [dataListDelay, setDataListDelayState] = useState({ ...data });
    const dispatch = useDispatch();
    const { delay1attention } = useDataForPages();
    const { dataSessionState } = useContext(myUserContext);



    const uddateBodyData = useCallback((body, offPanel) => {
        const dataForUpdate = { ...dataListDelay, data: { ...dataListDelay.data, ...body } };
        updatePageInDocument(data?._id, dataForUpdate)
            .then(response => {
                setDataListDelayState(dataForUpdate);
                if (!offPanel) changueText(`Saved object: ${Object.entries(body)[0][0]} ✅`, 'springgreen');
            })
            .catch(error => {
                console.log(error)
                changueText(`Error saved text: ${Object.entries(body)[0][0]} ❌`, 'red');
            });

    }, [data, dataListDelay]);




    const saveImg = useCallback(async (dataImg) => {
        try {
            const response = await sendImg(dataImg.file);
            const newBody = [...dataListDelay.data.body];
            if (typeof newBody[dataImg.indexBody].imageUrl[dataImg.indexImg] === 'string') newBody[dataImg.indexBody].imageUrl[dataImg.indexImg] = { index: dataImg.indexImg }
            newBody[dataImg.indexBody].imageUrl[dataImg.indexImg].url = response.data.urlFile;
            uddateBodyData({ body: newBody }, true);
            changueText(`Saved image: ${dataImg.file.name}`, 'springgreen');
        }
        catch (error) {
            console.log(error);
            changueText(`Error saved image: ${dataImg.file.name}`, 'red');
        }
    }, [data, dataListDelay]);




    const addRow = () => {
        const newRow = delay1attention.data.body[0];
        newRow.createdAt = TimeOperator.returnTimeIso();
        newRow.createBy = `${dataSessionState.dataSession.name} ${dataSessionState.dataSession.surName}`;
        const newBody = [...dataListDelay?.data.body, newRow];
        uddateBodyData({ body: newBody }, true);
        changueText(`Add file ✅`, 'springgreen');
    };




    return (
        <LayautPages dataId={dataId}>
            <HeaderPage
                deletePage={() => {
                    deletePage(null, data._id)
                }}
                dataId={dataId}
            >
                <button
                    className=''
                    type='button'
                    title='agregar fila'
                    onClick={addRow}
                >➕  aregar una fila</button>
                <InputPasteEventReusable
                    value='Tabla de demoras'
                    name={''}
                    setData={dataTable => {
                        dispatch(modalConfig({
                            callback: () => uddateBodyData({ body: dataTable.parser }),
                            title: 'Advertencia',
                            description: 'Esta opción vacia la data ya existente, ¿Seguro de hacerlo?',
                            type: 'alert',
                            open: true
                        }))
                    }}
                />
            </HeaderPage>


            <PageDelayClearTable styles={styles} setData={uddateBodyData} dataList={dataListDelay?.data} saveImgProp={saveImg} typeDelay={typeDelay} config={config} />
            {
                dataListDelay.data.body.length > 3 ?
                    <PageForDelayClearImage
                        styles={styles}
                        data={dataListDelay}
                        setData={uddateBodyData}
                        saveImgProp={saveImg}
                        config={config}
                        typeDelay={typeDelay}
                    />
                    :
                    null
            }
            <FooterPage />
        </LayautPages>
    );
}