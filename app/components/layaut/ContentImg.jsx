
import { useState, useEffect, useRef, forwardRef } from 'react';




const ContentImg = forwardRef(({ styles, heigthAuto, children }, ref) => {



    const [styleState, setStyleState] = useState({
        border: '5px solid #29c709'
    });
   


    useEffect(() => {
        setStyleState({
            border: `5px solid ${styles?.borderColor ? styles.borderColor : '#29c709'}`,
            backgroundColor: styles?.bg ?? '#dddddd',
         //   height: heigthAuto ? 'auto': 'revert-layer'
        });
        if(ref?.current && styles?.pageColor) ref.current.parentNode.style.backgroundColor = styles?.pageColor;
    }, [styles]);



    return(
        <div className='w-[85%] h-[75%] style-content-img flex flex-col items-center justify-center gap-2 p-[.5rem]' ref={ref} style={styleState}>
            {children}
        </div>
    )
});


export default ContentImg;