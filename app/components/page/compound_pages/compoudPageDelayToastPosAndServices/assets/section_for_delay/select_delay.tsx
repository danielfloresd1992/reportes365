import { useState } from 'react';



type Props = {
    entriesArr: [],
    toast: () => void
}



export default function SelectDelay({ dishItem = [], title = '', add }: any): JSX.Element {

    return (
        <div className='w-full flex flex-col items-center justify-center gap-[1rem] p-[1rem_.8rem] bg-[white]'>
            <b className='w-full text-center'>{title}</b>
            <div className='w-full flex flex-row justify-start items-center flex-wrap gap-[1rem]'>
                {
                    dishItem.length > 0 && dishItem.map((food: any) => {

                        return (
                            <div key={food._id}>
                                <button
                                    className='border border-[grey] p-[0.2rem_1rem] rounded-[0.4rem] text-[#5f5f5f]'
                                    type='button'
                                    onClick={() => {
                                        add(food.nameDishe);
                                    }}
                                >{food.nameDishe}</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}