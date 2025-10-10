
import LayautNovelty from '@/components/layaut/LayautPage';
import Image from '@/components/image_for_page/image';
import tranUrlToLocal from '@/lib/fetching/transUrlLocal';
import TableFourCol from '@/components/table/table';
import { chunkArray } from '@/lib/dataParser/arr';
import { sendImg } from '@/lib/fetching/documents';



export default function pageTabletDelayTwoImage({
    styles,
    titleHeadTable,
    titleHeadImage,
    title,
    arrayData,
    deleteCell,
    addCell,
    editCell,
    hiddenTable = false,
    captioEnd = 'default',
    captioInit = 'default',
    chunkArraySize = 10,
    limitDelayForNull = 2
}) {




    const textStyle = {
        color: arrayData?.length > 1 && arrayData?.length < 4 ? '#fff' : "#000000",
        textShadow: arrayData.length > 1 && arrayData.length < 4 ?
            `
            -.8px -.8px 0 rgb(0, 0, 0),
            .8px -.8px 0 rgb(29, 24, 24),
            -.8px .8px 0 rgb(0, 0, 0),
            .8px .8px 0 rgb(0, 0, 0)
        `
            :
            `
            -.8px -.8px 0 rgb(255, 255, 255),
            .8px -.8px 0 rgb(255, 255, 255),
            -.8px .8px 0 rgb(255, 255, 255),
            .8px .8px 0 rgb(255, 255, 255)
        `,
        fontWeight: 700
    };



    const updateImage = async (index, dataImg, data) => {
        try {
            const response = await sendImg(dataImg);
            const url = response.data.urlFile
            const newBoy = { ...data };
            newBoy.imageUrl[index].url = url;
            editCell(newBoy);
        }
        catch (error) {
            console.log(error);
        }
    };




    const saveCoordinate = (coordinates, index, data) => {
        const newBoy = { ...data };
        if (!Array.isArray(newBoy?.coordinates)) newBoy.coordinates = [];
        newBoy.coordinates[index] = coordinates;
        editCell(newBoy);
    };



    return chunkArray(arrayData, chunkArraySize).map((arr) => {
        if (arr.length < limitDelayForNull) return null;


        return (
            <LayautNovelty
                namePage={titleHeadTable}
                styles={styles}
                key={arr[0]._id}
            >
                <div
                    className='w-[95%] h-[95%] p-[1rem] flex flex-col items-center justify-between gap-[1rem]'
                >
                    <TableFourCol
                        header={['Mesas', 'Toma de orden', 'Entrega de servicio', 'Demora']}
                        body={arr}
                        addRowProp={() => { addCell() }}
                        editCellProp={(index, data) => editCell(data)}
                        deleteRowProp={(index, delay) => deleteCell(delay)}
                        styles={styles}
                        hiddenTable={hiddenTable}
                    />
                    {
                        arr.length < 4 ?
                            <div className='h-[100%] w-full flex gap-4 flex-col items-center justify-center'
                                title='Doble click aqui para buscar en el muro de alertas'
                                onDoubleClick={() => { }}
                            >
                                <div className='w-full flex flex-col items-center'>

                                    <p className='text-xl font-medium' style={textStyle}>{titleHeadImage}</p>
                                    <p className='text-xl font-medium' style={textStyle}>{title}</p>

                                </div>
                                <div className='w-full flex gap-4 w-full items-center justify-center'>

                                    <Image
                                        h_full={true}
                                        full={true}
                                        caption={captioInit}
                                        setSrc={Array.isArray(arr[0].imageUrl) ? tranUrlToLocal(arr[0].imageUrl[0].url) : null}
                                        styles={styles}
                                        getFile={(data) => { updateImage(0, data, arr[0]) }}
                                        arrowCordernate={true}
                                        setCoordinates={Array.isArray(arr[0].coordinates) ? arr[0].coordinates[0] : null}
                                        saveCordenate={(data) => { saveCoordinate(data, 0, arr[0]) }}
                                        index={0}
                                    />
                                    <Image
                                        h_full={true}
                                        full={true}
                                        caption={captioEnd}
                                        setSrc={Array.isArray(arr[0].imageUrl) ? tranUrlToLocal(arr[0].imageUrl[1].url) : null}
                                        styles={styles}
                                        getFile={(data) => { updateImage(1, data, arr[0]) }}
                                        arrowCordernate={true}
                                        setCoordinates={Array.isArray(arr[0].coordinates) ? arr[0].coordinates[1] : null}
                                        saveCordenate={(data) => { saveCoordinate(data, 1, arr[0]) }}
                                        index={1}
                                    />

                                </div>
                            </div>
                            :
                            null
                    }
                </div>
            </LayautNovelty >
        );
    });
}