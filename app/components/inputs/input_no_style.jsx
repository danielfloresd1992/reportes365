import { useState, useEffect } from 'react';



export default function UnstyledInput({ value, eventChangue, styles }) {

    const [valueState, setValueState] = useState('');

    useEffect(() => {
        setValueState(value);
    }, [])


    return (
        <input
            type='text'
            className='unstyledInput font-bold w-full monotext'
            style={styles ? styles : null}
            value={valueState}
            onChange={e => {
                setValueState(e.target.value);
                if (typeof eventChangue === 'function') {
                    eventChangue(e.target.value);
                }
            }}
        />
    );
}