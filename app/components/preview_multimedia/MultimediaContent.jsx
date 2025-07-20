import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDataPreviewMultimedia } from '../../store/slices/dataPreView';
import icoExit from '/ico/icons8-eliminar-100.png';
import icoBack from '/ico/icons8-gira-a-la-izquierda-96.png';
import tranUrlToLocal from '../../lib/fetching/transUrlLocal';


export default memo(function PreViewMultimedia() {


    const multimediaStore = useSelector(store => store.dataPreview);
    const dispatch = useDispatch();



    const closeWindow = () => {
        dispatch(setDataPreviewMultimedia(null));
    };


    const rederImagen = (url) => {
        let booleanRender = false;

        if (typeof url === 'string') booleanRender = ['png', 'jpeg'].some(ext => url.toLowerCase().lastIndexOf(ext) > -1)

        if (booleanRender) return <div><img src={tranUrlToLocal(url)} alt='image-preview' /></div>
        return null;
    }



    const renderVideo = (url) => {
        if (typeof url !== 'string') return null;
        if (!['avi', 'mp4'].some(ext => url.toLowerCase().lastIndexOf(ext) > -1)) return null;

        return (
            <div className="video-container">
                <video
                    controls          // Muestra controles de reproducción (play, volumen, etc.)
                    autoPlay={true}  // Desactiva autoplay (opcional)
                    muted={false}     // Sonido activado por defecto
                    width="100%"      // Ajusta el ancho al contenedor
                    style={{ maxWidth: '800px' }} // Máximo ancho opcional
                >
                    <source src={tranUrlToLocal(url)} type="video/mp4" />
                    Tu navegador no soporta el elemento <code>video</code>.
                </video>
            </div>
        )
    };



    const renderMultipleImage = (url) => {
        if (typeof url !== 'object') return null

        return (
            <div className='h-full flex justify-center items-center flex-wrap gap-[1rem] overflow-y-scroll'>
                {
                    url.map(image => (
                        <div className='relative' key={image._id}>
                            <img className='w-[600px] h-[380px]' src={tranUrlToLocal(image.url)} alt='image-novelty' />
                            <div className='absolute bottom-[0] bg-[#16e7267d] p-[.3rem_1rem] border border-gray-100'>
                                <p className='text-white'>{image.caption}</p>
                            </div>

                        </div>

                    ))

                }
            </div>
        );
    }


    if (!multimediaStore) return null;




    return (

        <div className='absolute top-[0]  w-full h-full bg-[#000000a6] flex justify-center items-center p-[1.5rem_0]' style={{ zIndex: 1000 }}>
            <button className='fixed top-[60px] right-[60px] w-[40px] h-[40px] z-[200]' onClick={closeWindow}>
                <img className='w-full h-full' src={icoBack} alt='exitIco-multimedia' />
            </button>
            {
                rederImagen(multimediaStore)
            }
            {
                renderMultipleImage(multimediaStore)
            }
            {
                renderVideo(multimediaStore)
            }
        </div>
    )
});