import { useState, useEffect, useRef } from 'react';



interface IProp {
    breackWidth: number;
    breackMinWidth: any,
    reload: any
}



export default function useAdapterResize({ breackWidth, breackMinWidth, reload }: IProp) {

    const initZoom: number = typeof window !== 'undefined' ? (window.innerWidth < 1518 ? ((window.innerWidth / 1518 - 0.1)) : 1) : 1;
    const minInitZoon: number = typeof window !== 'undefined' ? (window.innerWidth < breackMinWidth?.breackWidth ? ((window.innerWidth / breackMinWidth.breackWidth - 0.1)) : 1) : 1
    const htmlAdapterRef = useRef<HTMLDivElement>(null);


    const [defaultState, setDefaultState] = useState(false);


    useEffect(() => {
        if (typeof window !== 'undefined') {

            if (htmlAdapterRef.current) handleResize();

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [breackWidth, reload, defaultState]);




    const handleResize = (): void => {

        if (defaultState && htmlAdapterRef?.current) {
            htmlAdapterRef.current.style.zoom = 1;
        }
        else {

            const newWidth: number = window.innerWidth;

            if (newWidth < breackWidth && htmlAdapterRef.current) {

                if (breackMinWidth && newWidth <= breackMinWidth?.limit) {
                    htmlAdapterRef.current.style.zoom = ((newWidth / breackMinWidth.breackWidth) - 0.1).toString();
                }

                else {
                    htmlAdapterRef.current.style.zoom = ((newWidth / breackWidth) - 0.1).toString();
                }

            }

            else if (htmlAdapterRef.current) {
                htmlAdapterRef.current.style.zoom = 1
            }
        }

    };



    const resetDefault = (value: boolean) => {
        setDefaultState(value);
    };




    return { htmlAdapterRef, resetDefault }
}
