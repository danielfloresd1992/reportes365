import icojarvis from '../../../../public/logo-page-removebg.png';
import icoRemove from '../../../../public/ico/icons8-menos-24.png';
import { useEffect } from 'react';




export default function Box_notification({ msmProps, deleteMsm }) {


    useEffect(() => {

        let disolve = setTimeout(() => {
            deleteMsm(msmProps.id)
            clearTimeout(disolve);
        }, 20000);

        return () => {
            clearTimeout(disolve);
        };
    }, []);


    const handlerOnClick = () => {
        deleteMsm(msmProps.id);
    };


    return (
        <div className='w-[270px] h-[160px] shadow-for-page rounded overflow-hidden' key={msmProps.id}
            style={{
                background: 'rgb(255 255 255 / 0 %)',
                boxShadow: ' 3px 2px 20px #c1c1c1',
                backdropFilter: 'blur(5px)',
                border: '1px solid rgb(255 255 255)',
                backgroundColor: '#ffffff75'
            }}
        >
            <header className='w-full h-[30px] bg-[#838383] flex items-center justify-end p-[0_0.5rem]'>
                <button className='w-[21px] h-[21px]' onClick={handlerOnClick}><img className='w-full h-full' src={icoRemove} alt='ico-remove-card' /></button>
            </header>
            <div className='flex items-center  p-[.5rem] gap-[1rem]'>
                <img className='w-[45px] h-[45px] ' src={icojarvis} alt='lopgo-ico-notifications' />
                <p className='text-custom-small font-bold text-customGrayText break-words text-center'>{msmProps.title}</p>
            </div>
            <div className='p-[.5rem]'>
                <p className='text-custom-small font-medium text-customGrayText break-words text-center'>{msmProps.description}</p>
            </div>
        </div>
    );
}
