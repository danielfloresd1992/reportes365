import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import { setOpenForm } from  '../../store/slices/openFormLogin';
import gif_await from '../../../public/icons8-reloj-de-arena.gif';


import { myUserContext } from '../../context/sessionContext';



export default function FormLogin({ }) {


    const openFormStore = useSelector(store => store.booleanFormLogin);
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [ errorLoginState, setLoginState ] = useState('');
    const [ awaitSubmit, setAwait ] = useState(false);
    const { loginUser } = useContext(myUserContext);
    const dispatch = useDispatch();



    const onSubmit = handleSubmit((data) => {
        setAwait(true);
        loginUser(data , error => {
            if(error?.response?.data){
                if(error?.response?.data.status === 404) setLoginState('Usuario o correo inválido');
                if(error?.response?.data.status === 401) setLoginState('Contraseña inválida');
                if(error?.response?.data.status === 403) setLoginState('Usuario baneado');
            }
            else{
                dispatch(setOpenForm(false));
                reset();
            }
            setAwait(false);
        });
    });



    if (!openFormStore) return null;

    return (
        <div className='background-full'>
            <form autoComplete='off' className='bg-white w-[350px] p-[2rem] flex flex-col gap-[2rem] relative rounded-[5px] overflow-hidden' onSubmit={onSubmit}>
                <div className='w-full text-center z-[2]'>
                    <p className='text-[1.2rem] font-normal font-[system-ui]'>Inicio de sessión</p>
                </div>

                <input type="text" name="fake_email" style={{ display: 'none' }} />
                <input type="password" name="fake_password" style={{ display: 'none' }} />

                <div className='w-full flex flex-col gap-[1rem]'>
                    <div className={`w-full border-b border-b-[1px] border-b-[#8d8d8d]`}>
                        <div className='w-full flex flex-col gap-[.5rem]'>
                            <label className='w-full text-[#5f5f5f] text-[0.9rem]' htmlFor='email'>email</label>
                            <input
                                className='w-full outline-none'
                                type='email'
                                id='email'
                                name='name*fake'
                                autoComplete='off'
                                {...register('email', { required: { value: true, message: 'El correo es requerido' } })}
                            />
                        </div>
                    </div>

                    {errors.email && (
                        <p className='text-[red] text-[0.9rem]' role='alert'>Correo requerido</p>
                    )}

                    <input type="text" name="dummy" style={{ display: 'none' }} />

                    <div className='w-full border-b border-b-[1px] border-b-[#8d8d8d]'>
                        <div className='w-full flex flex-col gap-[.5rem]'>
                            <label className='w-full text-[#5f5f5f] text-[0.9rem]' htmlFor='password'>password</label>
                            <input
                                className='w-full outline-none'
                                type='password'
                                id='password'
                                autoComplete='new-password'
                                {...register('password', { required: { value: true, message: 'La contraseña es requerida' } })}
                            />
                        </div>
                    </div>

                    {errors.password && (
                        <p className='text-[red] text-[0.9rem]' role='alert'>{errors.password.message}</p>
                    )}

                    <div className='w-full border-b border-b-[1px] border-b-[#8d8d8d]'>
                        <div className='w-full flex flex-col gap-[.5rem]'>
                            <label className='w-full text-[#5f5f5f] text-[0.9rem]' htmlFor='text-v'>Código de verificación</label>
                            <input className='w-full outline-none disabled:bg-gray-200 disabled:cursor-not-allowed' type='text' id='text-v' disabled={true} />
                        </div>
                    </div>
                </div>

                {errorLoginState !== '' && (
                        <p className='text-[red] text-[0.9rem] text-center' role='alert'>{errorLoginState}</p>
                    )}

                <div className='w-full flex flex-col gap-[.5rem] items-center'>
                    <div className='w-full'>
                        <button className='button-generic button-complete' >Ingresar</button>
                    </div>
                    <a className='underline text-[#020f3f] font-medium' href="">¿No tienes usuario?</a>
                </div>


                <div className='absolute m-auto w-full top-0 left-0'>
                    <img style={{ filter: 'grayscale(1)' }} className='m-auto' width="64" height="64" src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/external-padlock-cyber-security-kiranshastry-gradient-kiranshastry-1.png" alt="external-padlock-cyber-security-kiranshastry-gradient-kiranshastry-1" />
                </div>
                {
                    awaitSubmit ? 
                    <div className='w-full h-full bg-white absolute top-[0] left-[0] z-[1000] flex items-center justify-center flex-col gap-[1rem]'>
                        <img src={gif_await} alt='await' />
                        <p>Esto tomara unos segundos...</p>
                    </div>
                    : null
                }
            </form>
        </div>
    );
}