import logo from '../../../public/10772726.png';
import { Link } from "@remix-run/react";


export default function ErrorPage() {
    return (
        <div className='absolute w-full h-full top-0 right-0 flex justify-center items-center flex-col gap-5 z-100'>
            <div>
                <img className='w-[150px]' src={logo} alt="" />
            </div>

            <div className='flex flex-col gap-[0.5rem] items-center'>
                <h1
                    style={{
                        fontSize: '1.5rem',
                        color: 'brown',
                        fontWeight: 400
                    }}
                >¡Error de conexión al servidor!</h1>
                <p>Contacta urgentemente al equipo de sistemas</p>

                <Link to="/">
                    <p style={{
                        color: '#0c249f',
                        fontWeight: 500,
                        textDecoration: 'underline'
                    }} href="">Volver al inicio</p>
                </Link>
            </div>
        </div >
    )
}