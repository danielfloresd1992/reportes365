import { memo } from 'react';
import { useSelector } from 'react-redux';



export default memo(function AwaitTaskingMemoized({ }) {


    const seletedState = useSelector(store => store.awaitWindow);

    
    if(!seletedState.open) return null;


    return (
        <div className='fixed w-full h-full top-[0] letf-[0] bg-[#000000c7] flex justify-center items-center' style={{
            zIndex: '10000'
        }}>
            <div className='flex flex-col justify-center items-center gap-[3rem]'>
                <div>
                     <p className='loader'></p>
                </div>

                <div className='text-center'>
                    <h1 className='text-white text-2xl'>{seletedState.title}</h1>
                    <p className='text-gray-200'>{seletedState.description}</p>
                </div>
            </div>
        </div>
    )
});