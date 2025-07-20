import Image from '../../image_for_page/image';
import LayautNovelty from '../../layaut/LayautPage';
import TableFourCol from '../../table/table';
import tranUrlToLocal from '../../../lib/fetching/transUrlLocal';


export default function PageTouchTable({ styles, dataList, setData, saveImgProp }) {



    const returnImg = () => {
        if (dataList?.body?.length > 3) return null;
        const iterate = Array.from({ length: dataList?.body?.length }, (_, i) => i);
        const styleImg = {};

        if (dataList?.body?.length === 1) {
            styleImg.width = '100%';
            styleImg.height = '350px'
        }
        else if (dataList?.body?.length === 2) styleImg.height = '300px';
        else if (dataList?.body?.length === 3) styleImg.height = '250px';


        return (
            <div className='flex justify-center items-center gap-4 w-full'>
                {
                    iterate.map((number, index, arr) => (
                        <Image
                            item={index}
                            count={arr.length}
                            full={true}
                            style={styleImg}
                            setSrc={Array.isArray(dataList?.img) ? tranUrlToLocal(dataList?.img[number]) : null}
                            getFile={(file) => saveImgProp(file, index)}
                            index={index}
                            arrowCordernate={true}
                            setCoordinates={Array.isArray(dataList.coordinates) ? dataList.coordinates[index] : null}
                            saveCordenate={data => {
                                if (!Array.isArray(dataList.coordinates)) dataList.coordinates = [];
                                dataList.coordinates[index] = data;
                                setData({ coordinates: dataList.coordinates });
                            }
                            }
                            key={index}
                        />
                    ))
                }
            </div>
        );
    };



    const title = dataList?.namePageTable ?? (dataList?.body?.length < 11 ? 'Toques de' : 'Algunos toques de');



    const editCell = (index, propiety) => {
        const newBody = [...dataList.body];
        newBody[index] = { ...newBody[index], ...propiety }
        setData({ body: newBody });
    };


    const addRow = () => {
        const body = dataList.body;
        body.push({ table: 0, timePeriod: { init: '00:00:00', end: '00:00:00' }, imageUrl: [{ index: 0, url: null }, { index: 1, url: null }] });
        setData({ body: body });
    };


    const removeRow = (index) => {
        const newBody = [...dataList.body];
        newBody.splice(index, 1);
        setData({ body: newBody });
    };



    return (
        <LayautNovelty styles={styles} namePage={title} editTitle={value => setData({ namePageTable: value })}>
            <div className='w-[95%] h-[95%] p-[1rem] flex flex-col items-center justify-between gap-[1rem]' tltle={`Cantidad de toques ${dataList?.body?.length}`}>
                <TableFourCol header={dataList.header} body={dataList.body} editCellProp={editCell} addRowProp={addRow} deleteRowProp={removeRow} styles={styles} />
                {
                    returnImg()
                }
            </div>
        </LayautNovelty>
    );
} 