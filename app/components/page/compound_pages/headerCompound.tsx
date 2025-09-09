import { ReactNode } from 'react';
import deleteIco from '../../../../public/ico/icons8-remove-50.png';
import icoGrabbingZone from '../../../../public/ico/icons8-arrastrar-lista-hacia-arriba-64.png'




interface Iprops {
    deletePage: () => void,
    children: ReactNode | null
}



export default function HeaderPage({ deletePage, children }: Iprops): ReactNode {


    return (
        <header
            className='min-h-[50px] bg-[#e5ebe9] w-full p-[0.5rem_1rem] rounded-t-lg flex items-center justify-between gap-[1.5rem]'

            title='Subir o bajar'
        >
            <div className='flex items-center justify-center gap-[.5rem]' id='drag-handle-1'>
                <img className='w-[35px]' src={icoGrabbingZone} alt='drag-zone-01' />

            </div>
            {children}
            <div className='flex flex-row justify-center items-center gap-[1rem]'>

                <button
                    onClick={deletePage}
                    type='button'
                    title='Eliminar seccion'
                    className='flex items-center justify-center gap-[.2rem]'>
                    <img className='w-[30px]'
                        src={deleteIco}
                        alt='delete-ico-page'
                    />
                </button>
            </div>
        </header>
    );
}