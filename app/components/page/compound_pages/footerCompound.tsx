import icoGrabbingZone from '../../../../public/ico/icons8-arrastrar-lista-hacia-arriba-64.png';


interface IpropsFooterPage {
    eventClick: (() => void) | null | undefined
}


export default function FooterPage({ eventClick }: IpropsFooterPage){


    const handdlerClick = () => {
        if(typeof eventClick === 'function') eventClick();
    };



    return(
        <footer
            className='h-[50px] bg-[#e5ebe9] w-full p-[0.5rem_1rem] rounded-b-lg flex items-center justify-between gap-[1.5rem]'
            id='drag-handle-1'
            title='Subir o bajar'
            onClick={handdlerClick}
        >
            <div>
                <img className='w-[35px]' src={icoGrabbingZone} alt='drag-zone-01' />
            </div>
        </footer>
    );
}