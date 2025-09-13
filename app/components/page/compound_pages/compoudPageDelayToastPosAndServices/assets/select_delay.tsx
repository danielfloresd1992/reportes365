import { useState } from 'react';



type Props = {
    entriesArr: [],
    toast: () => void
}



export default function SelectDelay({ entriesArr = [], add }: any): JSX.Element {


    const [dishName, setDishName] = useState<string>('');



    return (
        <div className='w-full flex flex-col items-center justify-center gap-[.5rem]'>
            <b className='w-full text-center'>Agregar demora por categoria</b>
            <div className='w-full flex flex-row justify-start items-center gap-[1rem]'>
                <div>
                    <select
                        className='border border-[#5f5f5f] p-[0.2rem_1rem] rounded-[0.4rem] text-[#5f5f5f]'
                        name='name_food'
                        onChange={(e) => {
                            setDishName(e.target.value)
                        }}
                    >
                        <option value=''>Seleccione</option>
                        {
                            entriesArr.length > 0 && entriesArr.map((food: string) => (
                                <option value={food} key={food}>{food}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <button
                        className='border border-[red] p-[0.2rem_1rem] rounded-[0.4rem] text-[#5f5f5f]'
                        type='button'
                        onClick={() => {
                            add(dishName);
                        }}
                        disabled={dishName === '' ? true : false}
                    >Toast Pos</button>
                </div>
                <div>
                    <button
                        className='border border-[green] p-[0.2rem_1rem] rounded-[0.4rem] text-[#5f5f5f]'
                        type='button'
                        onChange={() => { }}
                        disabled={dishName === '' ? true : false}
                    >Entrega</button>
                </div>
                <div>
                    <button
                        className='border border-[green] p-[0.2rem_1rem] rounded-[0.4rem] text-[#5f5f5f]'
                        type='button'
                        onChange={() => { }}
                        disabled={dishName === '' ? true : false}
                    >Servicio</button>
                </div>
            </div>
        </div>
    );
}