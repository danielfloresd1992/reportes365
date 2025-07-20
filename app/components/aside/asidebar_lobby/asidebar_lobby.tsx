import ico_option from '../../../../public/ico/icons8-opciones-32 (1).png';
import ico_home from '../../../../public/ico/icons8-casa-50.png';
import ico_folder from '../../../../public/ico/icons8-carpeta-50.png';
import lapiz from '../../../../public/ico/icons8-editar-48.png';
import ico_engranaje from '../../../../public/ico/icons8-engranaje-48.png';

import { Link } from '@remix-run/react'




export default function AsideBarLobby() {


    

    return (
        <aside className='h-full w-[320px] flex flex-col justify-start bg-[#454545] absolute pt-[50px] pr-4 pb-4 pl-4 top-[0] gap-[1rem]'>
            <div className='w-full p-4 px-2 flex flex-row gap-4'>
                <img className='w-[20px]' src={ico_option} alt='ico-option' />
                <p className='text-white font-bold text-[1.1rem]'>Lista de opciones</p>
            </div>
            <ul className='w-full px-2 flex flex-col gap-[.5rem]'>
                <Link to='home'>
                    <li className='itemList'><img className='w-[20px] h-[20px] pointer-events-none' src={ico_home} alt="ico-home" />Home</li>
                </Link>
                <Link to='elaborate'>
                    <li className='itemList'><img className='w-[20px] h-[20px] pointer-events-none' src={lapiz} alt='ico-lapiz' />elaborar</li>
                </Link>
                <Link to='register'>
                    <li className='itemList'><img className='w-[20px] h-[20px] pointer-events-none' src={ico_folder} alt='ico-folder' />registros</li>
                </Link>
                <Link to='configuration'>
                    <li className='itemList'><img className='w-[20px] h-[20px] pointer-events-none' src={ico_engranaje} alt='ixo-engranaje' />configuración</li>
                </Link>
            </ul>
        </aside>
    )
}