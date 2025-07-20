import { memo } from 'react';
import icoBar from '../../../public/chart.png';


export default memo(function IcoResumeShift({ nameFranchise, seleted }) {



    const handdlerOnClick = () => {
        seleted(nameFranchise);
    };



    return (
        <div className='relative flex flex-col items-center gap-[.5rem] cursor-pointer' onClick={handdlerOnClick}>
            <div className='w-[150px] h-[120px] border-[6px] border-solid border-gray-400 bg-white text-black flex items-center justify-center'>
                <img className='w-[50px] h-[50px]' src={icoBar} alt='logo-local' />
            </div>

            <div>
                <p className='text-center font-semibold'>Resumen del turno</p>
                <p className='text-custom-small font-medium text-customGrayText text-center'>{nameFranchise}</p>
            </div>
        </div>
    );
}); 