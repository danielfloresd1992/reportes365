import icoImg from '../../../../public/RGB-Icono-AMAZONAS 365-Original.png';
import icoJarvis from '../../../../public/logo-page-removebg.png';
//logo-page-removebg.png
//./../../../public/RGB-Icono-AMAZONAS365-Original.png'



export default function PageMultiProposal({ noIcon, children }) {


    return (
        <section
            className='style-content-page w-adapter relative'
            id='page-page'
        >
            <div
                className='style-content-page'
                style={{
                    margin: 0,
                    border: 'none'
                }}
            >
                {children}
                {
                    noIcon ?
                        null :
                        <div
                            className='absolute bottom-[20px] flex h-[50px] w-full overflow-hidden items-center justify-between'
                            id='draggable-delete'
                        >
                            <img src={icoImg} className='w-[100px]' alt="Amazonas 365" />
                            <img src={icoJarvis} className='w-[50px] mr-7' alt="Jarvis" />
                        </div>
                }
            </div>
        </section>
    )
}