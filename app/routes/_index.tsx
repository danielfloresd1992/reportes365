import type { MetaFunction } from "@remix-run/node";
import logo_port from '../../public/logo_reporte-removebg-preview.png';
import gifIco from '../../public/69f1dae606.gif'
import { Link } from "react-router-dom";
import IsAuthWiddleware from '../components/IsAuth';

//.public/logo_reporte-removebg-preview.png
//public/69f1dae606.gif



import FormLogin from '../components/form/formLogin';
import ButtonOpenFormLogin from '../components/button/buttonOpenFormLogin';


export const meta: MetaFunction = () => {
    return [
        { title: "Jarvis365" },
        { name: "para la creración de documento", content: "Welcome to Remix!" },
    ];
};



export default function Index() {



    return (
        <IsAuthWiddleware>
            <section className="flex h-screen w-full items-center flex-col justify-center gap-[5rem]">
                <div className='w-full flex flex-col items-center'>
                    <img className='w-[60%]' draggable={false} src={logo_port} alt='logo-app' />
                    <div className='w-full flex justify-center gap-[1rem]'>
                        <h1 className='font-sans text-[1.2rem] tracking-[.2em] font-semibold'>Rapidez y eficiencia</h1>
                        <img className='w-9' draggable={false} alt='logo-app-ico' src={gifIco} />
                    </div>
                </div>
                <div>
                    <ButtonOpenFormLogin />
                </div>
            </section>

            <FormLogin />
        </IsAuthWiddleware>
    );
}


