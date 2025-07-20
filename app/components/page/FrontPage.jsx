import ContentImg from '../../components/layaut/ContentImg';
import icoAmazonas365 from '../../../public/RBG-Logo-AMAZONAS 365-Original.png';
import icoJarvis from '../../../public/logo-page-removebg.png';
import frontDefault from '../../../public/premium_photo-1681487769650-a0c3fbaed85a.jpg';
import tranUrlToLocal from '../../lib/fetching/transUrlLocal';
import shiftToEs from '../../lib/script/shit_lang';
import TimeOperator from '../../lib/time';


export default function FrontPage({ data, styles, imageUrl, idDragImage, dataId, config }) {



    const handlerOnDragEnter = e => {
        if (!idDragImage) return null;
        e.preventDefault();
    };

    const handlerOnDragLeave = e => {
        if (!idDragImage) return null;
        e.preventDefault();
    };

    const handlerOnDragOver = e => {
        if (!idDragImage) return null;
        e.preventDefault();
    };

    const handlerOnDrop = e => {
        if (!idDragImage) return null;
    };




    return (
        <div
            draggable={false}
            onDragEnter={handlerOnDragEnter}
            onDragLeave={handlerOnDragLeave}
            onDragOver={handlerOnDragOver}
            onDrop={handlerOnDrop}
            data-id={dataId}
            id={'page-page'}
            className='style-content-page w-adapter locked'
            style={{
                backgroundColor: styles?.pageColor
            }}
        >
            <ContentImg styles={styles}>
                <div className='w-full h-full flex justify-center items-center'>
                    <div className='w-full h-full bg-white relative overflow-hidden'>
                        <div className='absolute top-[0] w-full h-[146.65px] z-[2]'
                            style={{
                                backgroundImage: `linear-gradient(180deg, ${styles?.colorGreadientLogo ?? '#000000'},  transparent)`
                            }}
                        >

                        </div>

                        <img className='absolute top-0 w-full h-full' src={imageUrl ? imageUrl : frontDefault} alt='image-front-style' style={{ objectFit: 'cover' }} />

                        <div className='w-full flex justify-between items-center px-[1.5rem] py-[2rem] z-[3] relative'>
                            <div className='flex flex-col items-center justify-center gap-[1rem]'>
                                <p className='text-white font-sans text-3xl font-semibold' style={{ color: styles?.colorTextFront ? styles?.colorTextFront : '#ffffff' }}>Reporte de novedades</p>
                                <p className='text-white font-sans text-2xl font-semibold' style={{ color: styles?.colorTextFront ? styles?.colorTextFront : '#ffffff' }}>{TimeOperator.americanDateFormat(data.data?.date, config?.americanDateFormatForCoverPage)}</p>
                            </div>

                            <div className='flex flex-col items-center'>
                                <span className='text-white font-sans text-3xl font-semibold' style={{ color: styles?.colorTextFront ? styles?.colorTextFront : '#ffffff' }}>{data.name_establishment}</span>
                                <p className='text-white font-sans text-2xl font-semibold' style={{ color: styles?.colorTextFront ? styles?.colorTextFront : '#ffffff' }}>{shiftToEs(data?.data?.shift ?? null)}</p>
                            </div>
                        </div>

                        <div className='w-full flex justify-between items-center px-[2rem] py-[1rem] absolute bottom-[-50px]'
                            style={{
                                backgroundImage: `linear-gradient(180deg,  transparent, ${styles?.colorGreadientLogo ?? '#000000'})`
                            }}
                        >
                            <img className='w-[400px] relative right-[80px]' src={icoAmazonas365} alt='ico-amazaons' style={{ filter: 'saturate(3)' }} />
                            <img className='w-[50px] h-[50px] p-[0 5rem]' src={icoJarvis} alt='ico-jarvis' style={{ filter: 'invert(1)' }} />
                        </div>
                    </div>
                </div>
            </ContentImg>
        </div>
    )
}