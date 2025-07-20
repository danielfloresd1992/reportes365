import LayautNovelty from '../layaut/LayautPage';
import Image from '../image_for_page/image';
import tranUrlToLocal from '../../lib/fetching/transUrlLocal';


export default function PageForImage({ styles, data, setData, saveImgProp }){
  

    const images = data?.data?.img;
    const title = data?.data?.namePageImg ?? (data?.data.body?.length < 11 ? 'Toques de' : 'Algunos toques de');


    const saveCoordinate = (coordinates, index) =>  {
        if(!Array.isArray(data?.data?.coordinates)) data.data.coordinates = [];
        data.data.coordinates[index] = coordinates;
        setData({coordinates: [...data.data.coordinates]});
    };



    return(
        <LayautNovelty styles={styles} namePage={title} editTitle={value => setData({ namePageImg: value })}>
            <div className='w-full h-full flex items-center justify-center flex-wrap gap-[.3rem]'>
                <Image 
                    h_full={true} 
                    getFile={(file) =>  saveImgProp(file, 0)}
                    setSrc={Array.isArray(images) ? tranUrlToLocal(images[0]) : null}
                    arrowCordernate={true}
                    setCoordinates={Array.isArray(data?.data?.coordinates) ? data?.data?.coordinates[0] : null}
                    saveCordenate={(data) => saveCoordinate(data, 0)}
                    index={0}
                />
                <Image 
                    h_full={true} 
                    getFile={(file) =>  saveImgProp(file, 1)}
                    setSrc={Array.isArray(images) ? tranUrlToLocal(images[1]) : null}
                    arrowCordernate={true}
                    setCoordinates={Array.isArray(data?.data?.coordinates) ? data?.data?.coordinates[1] : null}
                    saveCordenate={(data) => saveCoordinate(data, 1)}
                    index={1}
                />
                <Image 
                    h_full={true} 
                    getFile={(file) =>  saveImgProp(file, 2)}
                    setSrc={Array.isArray(images) ? tranUrlToLocal(images[2]) : null}
                    arrowCordernate={true}
                    setCoordinates={Array.isArray(data?.data?.coordinates) ? data?.data?.coordinates[2] : null}
                    saveCordenate={(data) => saveCoordinate(data, 2)}
                    index={2}
                />
                <Image 
                    h_full={true} 
                    getFile={(file) =>  saveImgProp(file, 3)}
                    setSrc={Array.isArray(images) ? tranUrlToLocal(images[3]) : null}
                    arrowCordernate={true}
                    setCoordinates={Array.isArray(data?.data?.coordinates) ? data?.data?.coordinates[3] : null}
                    saveCordenate={(data) => saveCoordinate(data, 3)}
                    index={3}
                />
            </div>
        </LayautNovelty>
    );
}