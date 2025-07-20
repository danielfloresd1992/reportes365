import logo  from '../../../public/logo-page-removebg.png';

export default function LoadingPage(){
    return(
        <div className='absolute w-full h-full top-0 right-0 flex justify-center items-center flex-col gap-5 z-100'>
            <img className='w-[110px] animation-intermitencia' src={ logo } alt="" />
            <h2>Solicitando datos</h2>
        </div>
    )
}