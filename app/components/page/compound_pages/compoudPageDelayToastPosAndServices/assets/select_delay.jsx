import { useState } from 'react';




export default function SelectDelay({ entriesArr, getDelay = () => { } }) {


    const [getDelayCategory, setGetDelayCategory] = useState('Toast Pos');



    return (
        <div className='w-full flex flex-col items-center justify-center gap-[.5rem]'>
            <b className='w-full text-center'>Agregar demora por categoria</b>
            <div className='w-full flex flex-row justify-around items-center gap-[1rem]'>
                <div><button className='border border-[#5f5f5f] p-[0.2rem_1rem] rounded-[0.4rem] text-[#5f5f5f]' type='button'>Toast Pos</button></div>
                <div><button className='border border-[#5f5f5f] p-[0.2rem_1rem] rounded-[0.4rem] text-[#5f5f5f]' type='button'>Entrega</button></div>
                <div><button className='border border-[#5f5f5f] p-[0.2rem_1rem] rounded-[0.4rem] text-[#5f5f5f]' type='button'>Servicio</button></div>
                <div>
                    <select className='border border-[#5f5f5f] p-[0.2rem_1rem] rounded-[0.4rem] text-[#5f5f5f]' name='name_food'
                        onChange={(e) => getDelay(getDelayCategory, e.target.value)}
                    >
                        {
                            entriesArr.length > 0 && entriesArr.map(food => (
                                <option value={food} key={food}>{food}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </div>
    )
}