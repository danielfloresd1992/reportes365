import { useEffect, useState } from 'react';
import icoBack from '../../../public/icons8-x-48.png';
import InputStandart from '../../components/inputs/input_standart';




export default function FormDocument({ franchise, establishment, deleteSeletedEstablishment, handdlerSumitProp }) {

    const [formState, setFormState] = useState({
        shift: '',
        date: new Date().toLocaleDateString()
    });


    const handdlerSubmit = e => {
        e.preventDefault();
        handdlerSumitProp(formState, franchise, establishment);
    };





    useEffect(() => {
        if (establishment) {
            setFormState({ ...formState, type: 'complete-shift', shift: establishment?.config_report?.numberOfReports === 'single-diary' ? 'all' : establishment?.config_report?.numberOfReports });
        }

        else if (franchise) setFormState({ ...formState, type: 'resume-shift' });
    }, [establishment, franchise]);




    if (establishment || franchise) {
        return (
            <form
                className='relative bg-white w-[350px] p-[2rem] flex flex-col gap-[2rem] relative rounded-[5px] overflow-hidden shadow-for-page'
                onSubmit={handdlerSubmit}
            >
                <button className='absolute top-[20px] right-[20px]' onClick={deleteSeletedEstablishment} type='button'><img className='w-[20px] h-[20px]' src={icoBack} alt='ico-back' /></button>
                {
                    franchise || establishment.config_report.numberOfReports === 'dual-diary' ?

                        <>
                            <div><p className='text-center'> Selecion de turno y fecha </p></div>
                            <InputStandart
                                type='select'
                                textLabel='Selecione el turno'
                                name='select-shift'
                                value={formState.shift}
                                setValue={value => setFormState({ ...formState, shift: value })}
                                requiered={true}
                            >
                                <option value='day'>Diurno</option>
                                <option value='night'>Nocturno</option>
                            </InputStandart>
                        </>
                        :

                        <div><p className='text-center'>Reporte diario</p></div>
                }



                <InputStandart
                    type='date'
                    textLabel='Fecha del reporte'
                    name='select-date'
                    value={formState?.date}
                    setValue={value => setFormState({ ...formState, date: value })}
                    requiered={true}
                />

                <button className='button-generic animate-for-button'> Consultar e ingresar </button>
            </form>
        );
    }
    else return null;
}