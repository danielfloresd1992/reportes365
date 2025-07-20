import { useState, useEffect, ReactNode, MouseEvent } from 'react'
import Fuse from 'fuse.js';


type props = {
    arrProp: [any],
    config: {
        key: any
    },
    seleted: (id: string) => void
}



export default function Search({ arrProp, config, seleted }: props): ReactNode{


    const [ valueState, setValueState ] = useState('');
    const [ searchResultState, serSearchResultState ] = useState([]);



    useEffect(() => {
        const arrayTitle: any = [];
        if(Array.isArray(arrProp) && arrProp.length > 0){

            const autoComplet = new Fuse(arrProp, {
                minMatchCharLength: 5,
                includeScore: true,
                keys: config.key
            });
        
           
            autoComplet.search(valueState).forEach((title: any) => {
                arrayTitle.push(title.item);
            });
        }
        serSearchResultState(arrayTitle)
        
    }, [valueState]);



    const handdlerOnchangue = (e: any): void=> {
        setValueState(e.target.value);
    };


    const handdlerSeletMenu = (e: MouseEvent<HTMLParagraphElement>): void => {
        const target = e.target as HTMLElement;
        seleted(target.id);
        setValueState('')
    };
   

    return(
        <div 
            className={`relative py-0.5 px-2 w-[300px] border-2 border-gray-300 max-h-72 bg-white ${searchResultState.length > 0 ? 'shadow-for-page' : null} z-100`} style={{ zIndex: 100 }}
            id='input-remove'
        >
            <input 
                className='w-full outline-none bg-transparent' 
                placeholder='Buqueda de novedad'
                type='text' 
                onChange={handdlerOnchangue} 
                value={ valueState }
            />
            {
                searchResultState.length > 0 ?
                    <div className='absolute w-full bg-white overflow-y-scroll h-[300px] py-4 px-0 shadow-[3px_1px_11px_#000] top-[33px] right-0'>
                        {
                            searchResultState.map((item: any) => (
                                <p className='style-hover-text_option' 
                                    onClick={handdlerSeletMenu} id={item[config.key[1]]} 
                                    title={item[config.key[0]]}
                                    key={item[config.key[1]]} 
                                >{ item[config.key[0]] }
                                </p>
                            ))
                        }
                    </div>                 
                : 
                null
            }
        </div>
    )
}