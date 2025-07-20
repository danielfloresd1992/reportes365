import { useState, ReactNode, } from 'react'


type props = {
    setData: (data: any) => void
}



export default function InputPaste({ setData }: props): ReactNode {


    const [valueState, setValueState] = useState('');


    const handdlerOnchangue = (e: any): void => {
        try{
            console.log(e);
            let data = (e.clipboardData || window.clipboardData).getData('text');
    
    
            const regex = /^\d{2}\t\d{2}:\d{2}:\d{2}\t\d{2}:\d{2}:\d{2}\t\d{1}:\d{2}:\d{2}$/gm;
            const isValid = data.trim().split('\n').every(line => regex.test(line));
            console.log(`es válido: ${isValid}`);
    
            const lines = data.trim().split('\n');
            const result: any = lines.map((line: any) => {
                const [table, startTime, endTime, duration] = line.split('\t');
                return { table, startTime, endTime, duration };
            });
            setData({body: result});
        } 
        catch(e){
            console.log(e);
        }
    };



    return (
        <div 
            className='py-0.5 px-2 w-[300px] border-2 border-gray-300 max-h-72 bg-white overflow-y-scroll' style={{ zIndex:'100' }} 
            id='input-remove'
        >
            <input
                className='w-full outline-none bg-transparent'
                placeholder='Pegue los toques aqui'
                type='text'
                onPaste={handdlerOnchangue}
                value={valueState}
            />
        </div>
    )
}