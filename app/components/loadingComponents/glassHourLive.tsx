import icoHourGlass from '../../../public/icons8-reloj-de-arena.gif';
import { ReactNode } from 'react';

interface IProps {
    children: ReactNode
}

export default function GlassHourLive(): ReactNode {
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className='flex items-center flex-col gap-[1rem]'>
                <img className='w-[25px] h-[25px]' src={icoHourGlass} alt='ico-hour-glass' />
                <p>Sincronizando con el servidor</p>
            </div>
        </div>
    );
}