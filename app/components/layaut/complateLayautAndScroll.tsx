import { AxiosResponse, AxiosError } from 'axios';
import { useState, useEffect, ReactNode } from 'react';
import GlassHourLive from '../../components/loadingComponents/glassHourLive';



interface Iprops {
    callback: () => Promise<any>,
    children: (data: any) => ReactNode,
    classNameProp: string
};



export default function ComplateLayautAndScroll({classNameProp, callback, children}: Iprops): ReactNode{


    const [ dataState, setDataState ] = useState<AxiosResponse | null>(null);
    const [errorState, setErrorState] = useState<AxiosError | null>(null);



    useEffect(() => {
        if(typeof callback === 'function') {
            callback()
            .then((response: AxiosResponse) => {
                if(response.status === 200) setDataState(response);
            })
            .catch((error: AxiosError) => setErrorState(error));
        }
    }, [callback]);

    

    if(!dataState && !errorState) return <GlassHourLive />
    if(dataState && children) return <div className={`w-full h-full ${classNameProp ? classNameProp : ''}`}>{children(dataState)}</div>
    return null;
}