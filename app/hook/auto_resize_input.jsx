import { useRef, useEffect } from 'react';



const useAutoResizeInput = () => {

    const refInput = useRef(null);


    const adjustWidth = () => {
        if (refInput.current) {
            if (refInput.current.value.length < 3) {
                refInput.current.style.width = '10ch';
            }
            else {
                refInput.current.style.width = `${refInput.current.value.length + 1}ch`;
            }

        }
    };


    useEffect(() => {
        if (refInput.current) {
            adjustWidth();
            refInput.current.addEventListener('input', adjustWidth);
        }
        return () => {
            if (refInput.current) refInput.current.removeEventListener('input', adjustWidth);
        };
    }, []);



    return { refInput, adjustWidth };
};

export default useAutoResizeInput;