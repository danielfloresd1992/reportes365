import { ReactNode } from 'react';


interface Iprops {
    dataId: string,
    children: ReactNode | undefined | null
}



export default function LayautPages({ dataId, children }: Iprops): ReactNode {
    return (
        <section
            className='relative flex items-center justify-between flex-col gap-[.5rem] shadow-[2px_2px_14px_#000000ab] overflow-hidden rounded-[10px] min-h-[500px]'
            id={dataId}
            data-id={dataId}
            style={{ margin: '1rem 0' }}
        >
            {children}
        </section>
    );
}