import { useState, useEffect } from 'react';



const inputStyles = {
    textAlign: 'center',
    fontSize: '1.2rem', 
    fontWeight: 'bold',
    border: 'none',
    outline: 'none',
    width: '100%',
    backgroundColor: 'transparent'
};




export default function InputTitle({value, editTitle}) {


    const [titleState, setTitleState] = useState(value ?? 'Novedad');


    useEffect(() => {
        setTitleState(value);
    }, [value]);


    const updateTitleAndState = e => {
        setTitleState(e.target.value);
        if(typeof editTitle === 'function') editTitle(e.target.value );
    };


    return (
        <>
            <input
                style={inputStyles}
                type='text'
                onChange={updateTitleAndState}
                value={titleState}
            />
        </>
    );
}