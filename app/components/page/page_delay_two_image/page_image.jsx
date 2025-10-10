import LayautNovelty from '@/components/layaut/LayautPage';
import Image from '@/components/image_for_page/image';
import tranUrlToLocal from '@/lib/fetching/transUrlLocal';
import useFindArticle from '@/hook/find_to_asidebar';
import { sendImg } from '@/lib/fetching/documents';




export default function PageDelayTwoImage({
    styles,
    titleHead,
    title,
    data,
    captioInit,
    captioEnd,
    editCell
}) {



    const updateImage = async (index, dataImg) => {
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



    const saveCoordinate = (coordinates, index) => {
        const newBoy = { ...data };
        if (!Array.isArray(newBoy?.coordinates)) newBoy.coordinates = [];
        newBoy.coordinates[index] = coordinates;
        editCell(newBoy);
    };



    return (
        <LayautNovelty
            styles={styles}
            heigthAuto={false}
            namePage={''}
            getElementLayaut={(element) => {
                element.current.style.height = '300px';
            }}

        >
            <div className='w-full h-full flex flex-col justify-center items-center gap-12'
                title='Doble click aqui para buscar en el muro de alertas'
                onDoubleClick={() => {
                    // findNovelty(data?.data?.body[0]._id)
                }}
            >
                <div className='w-full flex flex-col items-center absolute top-[110px]'>
                    <p className='text-xl font-bold'>{titleHead}</p>
                    <p className='text-xl font-medium'>{title}</p>
                </div>
                <div className='w-full flex items-center gap-[.5rem]'>
                    <Image
                        h_full={true}
                        full={true}
                        setSrc={Array.isArray(data?.imageUrl) ? tranUrlToLocal(data?.imageUrl[0].url) : null}
                        getFile={(file) => updateImage(0, file)}
                        caption={captioInit}

                        arrowCordernate={true}
                        setCoordinates={Array.isArray(data?.coordinates) ? data?.coordinates[0] : null}
                        saveCordenate={(data) => { saveCoordinate(data, 0) }}
                        index={0}
                    />
                    <Image
                        h_full={true}
                        full={true}
                        setSrc={Array.isArray(data?.imageUrl) ? tranUrlToLocal(data?.imageUrl[1].url) : null}
                        getFile={(file) => updateImage(1, file)}
                        caption={captioEnd}
                        arrowCordernate={true}
                        setCoordinates={Array.isArray(data?.coordinates) ? data?.coordinates[1] : null}
                        saveCordenate={(data) => { saveCoordinate(data, 1) }}
                        index={1}
                    />
                </div>
            </div>
        </LayautNovelty>
    );
}