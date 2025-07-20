import { useState } from 'react'
import { ObjectComplete } from '~/type/dataPage';
import { matrisToObject } from '../../lib/dataParser/tableFormater';

type paramsSetData = {
    bodyForTable: any[][],
    parser: ObjectComplete
}

type Props = {
    name: string,
    value: string,
    setData: (data: any) => void
}



export default function InputPasteEventReusable({ name, value, setData }: Props){


    const [valueState, setValueState] = useState<string>('');


    const handdlerOnchangue: React.ClipboardEventHandler<HTMLInputElement>  = (e)=> {
        try{
            const data = e.clipboardData?.getData('text') || '';
            const regex = /^\d{2}\t\d{2}:\d{2}:\d{2}\t\d{2}:\d{2}:\d{2}\t\d{1}:\d{2}:\d{2}$/gm;
            const isValid: boolean = data.trim().split('\n').every(line => regex.test(line));
    
            const lines = data.trim().split('\n');

            const matris: any[][] = lines.map((line) => {
                const newString = line.replace('\r', '');
                return newString.split('\t');
            });
            setData({bodyForTable: matris, parser: matrisToObject(matris, name)});
        } 
        catch(e){
            console.log(e);
        
        }
    };


    return(
        <div 
            className='py-0.5 px-2 w-[300px] border-2 border-gray-300 max-h-72 bg-white overflow-y-scroll' style={{ zIndex:'100' }} 
            id='input-remove'
        >
            <input
                className='w-full outline-none bg-transparent'
                placeholder={value}
                type='text'
                onPaste={handdlerOnchangue}
                defaultValue={valueState} /// changue debbug
            />
        </div>
    )
}