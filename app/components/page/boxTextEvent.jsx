import { useState, useEffect } from 'react';
import useAutoResizeInput from '../../hook/auto_resize_input';


export default function BoxTextEvent({ label, value, styles, getValue }) {


    const [ valueState, setValueState ] = useState('');
    const { adjustWidth, refInput } = useAutoResizeInput({ value: valueState});


    useEffect(() => {
        if(valueState === '') setValueState(value);
    }, [valueState]);


    useEffect(( ) => {
        adjustWidth();
    }, [valueState])



    return (
        <div
            className='min-w-[300px] p-[.2rem_1rem] bg-[#fff] border-[1px] border-[#28b90c] text-center flex justify-center items-center gap-[.3rem]'
            style={{ backgroundColor: styles?.bgTextBox ? styles?.bgTextBox : '#ffffffc9', borderColor: styles?.colorBorderBox }}
        >
            <label
                className='text-center font-semibold'
                style={{ color: styles?.colorTextBox ? styles?.colorTextBox : '#000000' }}
                htmlFor='input'
            >
                {`${label}: `} 
            </label>
            <input
                className='unstyledInput font-semibold min-w[4ch]'
                type='text'
                name='input'
                value={valueState.trim()}
                style={{ color: styles?.colorTextBox ? styles?.colorTextBox : '#000000', mimWidth: 'min-width: 4ch;' }}
                onChange={e => {
                    setValueState(e.target.value);
                    getValue(e.target.value.trim());
                }}
                ref={refInput}
            />
        </div>
    );
}