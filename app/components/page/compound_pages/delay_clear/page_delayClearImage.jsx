import LayautNovelty from '../../../layaut/LayautPage';
import Image from '../../../image_for_page/image';
import tranUrlToLocal from '../../../../lib/fetching/transUrlLocal';
//../image_for_page/image'  //  ../layaut/LayautPage
import TimeOperator from '../../../../lib/time' //.calculateTime
import useFindArticle from '../../../../hook/find_to_asidebar';


export default function PageForDelayClearImage({ styles, data, setData, saveImgProp, typeDelay }) {


    const { findNovelty } = useFindArticle();
    const titleClears = 'Mesa con mayor demora en ser limpiada';
    const title1Atention = 'Mesa con mayor demora en ser atendida';
    const initTime = typeof data?.data?.body[0].timePeriod === 'string' ? JSON.parse(data?.data?.body[0].timePeriod) : data?.data?.body[0].timePeriod;



    const saveCoordinate = (coordinates, index) => {
        if (!Array.isArray(data?.data?.coordinates)) data.data.coordinates = [];
        data.data.coordinates[index] = coordinates;
        setData({ coordinates: [...data.data.coordinates] });
    };




    return (
        <LayautNovelty
            styles={styles}
            namePage={''}
            editTitle={value => setData({ namePageImg: value })}
            heigthAuto={false}
            getElementLayaut={(element) => {
                element.current.style.height = '300px';
            }}
        >
            <div className='w-full h-full flex flex-col justify-center items-center gap-12'
                title='Doble click aqui para buscar en el muro de alertas'
                onDoubleClick={() => {
                    findNovelty(data?.data?.body[0]._id)
                }}
            >
                <div className='w-full flex flex-col items-center absolute top-[110px]'>
                    <p className='text-xl font-medium'>{data.type === 'delay1ra' ? title1Atention : titleClears}</p>
                    <p className='text-xl font-medium'>{`Mesa ${data?.data?.body[0].table} (Desde: ${initTime?.init} - Hasta: ${initTime?.end}) Duración: ${TimeOperator.calculateTime(initTime?.init, initTime?.end)}`}</p>
                </div>
                <div className='w-full flex items-center gap-[.5rem]'>
                    <Image
                        h_full={true}
                        full={true}
                        caption={typeDelay === 'delay1ra' ? 'Ocupa' : 'Desocupa'}
                        styles={styles}
                        getFile={(file) => saveImgProp(file, 0)}
                        setSrc={Array.isArray(data?.data?.body[0].imageUrl) ? tranUrlToLocal(data?.data?.body[0].imageUrl[0].url) : null}
                        arrowCordernate={true}
                        setCoordinates={Array.isArray(data?.data?.coordinates) ? data?.data?.coordinates[0] : null}
                        saveCordenate={(data) => saveCoordinate(data, 0)}
                        index={0}
                    />
                    <Image
                        h_full={true}
                        full={true}
                        caption={typeDelay === 'delay1ra' ? 'Primera atención' : 'Limpieza'}
                        styles={styles}
                        getFile={(file) => saveImgProp(file, 1)}
                        setSrc={Array.isArray(data?.data?.body[0].imageUrl) ? tranUrlToLocal(data?.data?.body[0].imageUrl[1].url) : null}
                        arrowCordernate={true}
                        setCoordinates={Array.isArray(data?.data?.coordinates) ? data?.data?.coordinates[1] : null}
                        saveCordenate={(data) => saveCoordinate(data, 1)}
                        index={1}
                    />
                </div>
            </div>
        </LayautNovelty>
    );
}