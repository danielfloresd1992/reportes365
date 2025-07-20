import icoPdf from '../../../public/ico/icons8-pdf-100.png';
import icoPdfAlternative from '../../../public/ico/picture_as_pdf_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg';
import icoHome from '../../../public/ico/home_24dp_434343_FILL0_wght400_GRAD0_opsz24.svg';
import exit from '../../../public/ico/icons8-salida-de-emergencia-48.png';
import { useContext } from 'react';
import { exitDocument } from '../../lib/fetching/documents';
import { useNavigate } from '@remix-run/react';
import { useDispatch } from 'react-redux';
import { setEstablishmentDocument } from '../../store/slices/establishmentDocument';
import { myUserContext } from '../../context/sessionContext';
import { setQueryAlertDocument } from '../../store/slices/queryAlertDocument';



export default function NavBarOption({ actionPdf }) {


    const { eliminatedTask } = useContext(myUserContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();




    const handdlerClickExit = () => {
        exitDocument()
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                if (error?.response.status === 404) {

                }
            })
            .finally(() => {
                eliminatedTask()
                dispatch(setEstablishmentDocument(null));
                dispatch(setQueryAlertDocument({}));
                navigate('/lobby');
            });
    };





    return (
        <div className='w-full h-[40px] flex flex-col'>
            <div className='w-full h-full flex justify-between items-center'>


                <div className='h-full w-[56%] flex justify-center items-center gap-[1rem]'>
                    <div className='bg-black w-full h-[70%] flex justify-between items-center p-[0_1rem]' style={{
                        outline: '3px ridge #ddd'
                    }}>
                        <div className='w-[460px]'>
                            <p className='w-[460px] text-white monotext text-sm w-full text-nowrap' id='panel-pantalla-3046'></p>
                        </div>

                        <div>
                            <p className='text-white monotext text-sm w-full text-nowrap'>Total de páginas: <b id='count-page-25'>0</b></p>
                        </div>

                    </div>



                </div>



                <div className='h-full flex gap-[1rem] items-center justify-center p-[0_1rem]'>

                    <div className='flex justify-center items-center flex-col element-opacy'>
                        <button onClick={actionPdf} className='w-[25px] h-[25px]' title='Exportar a pdf'>
                            <img className='w-full h--full' src={icoPdfAlternative} alt='ico-pdf' />
                        </button>
                        <p className='text-[.45rem]'>Pdf</p>
                    </div>

                    <div className='flex justify-center items-center flex-col element-opacy'>
                        <button
                            className='w-[25px] h-[25px] rounded shadow-sm'
                            title='Salir'
                            onClick={handdlerClickExit}
                        >
                            <img className='w-full h-full' src={icoHome} alt='ico-save' />
                        </button>
                        <p className='text-[.45rem]'>Home</p>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}


export const changueText = (text, color) => {
    if (!text) return null;
    if (typeof window === undefined) return null;
    //springgreen red
    const textElementPanel = document.getElementById('panel-pantalla-3046');
    if (!textElementPanel) return null;
    if (typeof color === 'string') textElementPanel.style.color = color;
    textElementPanel.textContent = text;
};