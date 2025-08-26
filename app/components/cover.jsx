import { getImgEstablishmentById } from '../lib/fetching/establishment';
import { useEffect, useCallback } from 'react';
import { arrayBufferToBase64 } from '../lib/bufferToBase64';
import { useState, memo } from 'react';



export default memo(function Cover({ establishment, seleted }) {


    const [establishmentState, setEstablishmentState] = useState(null);


    useEffect(() => {
        getImgEstablishmentById(establishment._id, 'config_report')
            .then(response => setEstablishmentState(response.data))
            .catch(error => console.log(error));
    }, []);



    const handlerClick = useCallback(() => {
        if (establishmentState?.config_report.activation) seleted(establishmentState);
    }, [establishmentState]);



    return (
        <div className={`relative flex flex-col items-center gap-[.5rem] overflow-hidden${establishmentState?.config_report?.activation ? 'cursor-pointer card' : ' no-aviable'}`} onClick={handlerClick}>
            <div className={`w-[150px] h-[120px] border-[6px] border-solid border-gray-400 bg-white text-black flex items-center justify-center relative${establishmentState?.config_report?.activation ? '' : ' filter grayscale'}`}>
                {
                    establishmentState?.image ?
                        <img className='absolute w-full h-full top-[0] left-[0]' src={establishmentState?.image} alt='logo-local' />
                        :
                        <div className='w-full h-full flex justify-center items-center bg-[#525b61]'>
                            <span className="loader"></span>
                        </div>
                }
            </div>
            <div>
                <p className='text-center font-semibold'>{establishment.name}</p>
                <div>
                    {
                        establishmentState?.config_report ?
                            establishmentState?.config_report.activation ?
                                establishmentState?.config_report.numberOfReports === 'dual-diary' ?
                                    <>
                                        <p className='text-custom-small font-medium text-customGrayText text-center'>Entrega diurno: {establishmentState?.config_report?.time.day}</p>
                                        <p className='text-custom-small font-medium text-customGrayText text-center'>Entrega noctuno: {establishmentState?.config_report?.time.night}</p>
                                    </>
                                    :
                                    <p className='text-custom-small font-medium text-customGrayText text-center'>Entrega: {establishmentState?.config_report?.time}</p>
                                :
                                <p className='text-custom-small font-medium text-customGrayText text-center text-red-500'>No disponible</p>
                            :
                            <p className='text-custom-small font-medium text-customGrayText text-center'>Sin configurar</p>
                    }
                </div>
            </div>
        </div>
    );
});