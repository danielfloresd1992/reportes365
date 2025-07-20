
import icoImg from '../../../public/RGB-Icono-AMAZONAS 365-Original.png';
import icoJarvis from '../../../public/logo-page-removebg.png';
import { useState, useRef, useEffect, ReactNode } from 'react';

import { useSpring, animated } from '@react-spring/web';
import { useDrag } from 'react-use-gesture'

import ContentImg from '../../components/layaut/ContentImg';
import InputTitle from '../inputs/inputTitle';





type configHammer = {
    callbackDelete: () => void,
    deleteOnSwipe: boolean
}


interface LayautNoveltyProps {
    children: ReactNode;
    namePage: string;
    numberPage?: number;
    styles?: React.CSSProperties;
    dataId?: string;
    editTitle?: boolean;
    heigthAuto?: boolean;
    title?: string;
    onSwipeRight: configHammer;
    getElementLayaut: any,
    boubleClickEvent: any,
    idNovelty: string | null | undefined
}



export default function LayautNovelty({
    children,
    namePage,
    numberPage,
    styles,
    dataId,
    editTitle,
    heigthAuto,
    title,
    onSwipeRight,
    getElementLayaut,
    boubleClickEvent,
    idNovelty,
}: LayautNoveltyProps): ReactNode {



    const RefHtml = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<HTMLDivElement>(null);
    const refLayautNovelty = useRef<HTMLDivElement>(null)

    const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))


    const bind = useDrag(
        ({ active, movement: [mx], event }) => { // Solo usamos mx (eje X)

            if (onSwipeRight.deleteOnSwipe && Math.max(0, mx) > 650) onSwipeRight.callbackDelete();

            if (onSwipeRight.deleteOnSwipe && event?.target?.id == 'draggable-delete') {
                set({
                    x: active ? Math.max(0, mx) : 0, // Solo valores >= 0
                    y: 0 // Bloquea eje Y
                });
            }
        },
        {
            axis: 'x', // Solo movimiento horizontal
            bounds: { left: 0 }, // Bloquea movimiento negativo
            rubberband: 0.5, // Resistencia al llegar al límite
            from: () => [x.get(), 0] // Mantiene posición actual
        }
    );




    useEffect(() => {

        if (typeof getElementLayaut === 'function') {
            if (refLayautNovelty.current) getElementLayaut(refLayautNovelty);
        }
    }, []);






    return (
        <animated.div {...bind()} style={{ x, y, touchAction: 'none' }} >
            <div
                className='style-content-page w-adapter relative'
                data-id={dataId}

                onDoubleClick={() => {
                    if (typeof boubleClickEvent === 'function') boubleClickEvent();
                }
                }
                id='page-page'
            >
                <div
                    className='style-content-page'
                    style={{
                        margin: 0,
                        border: 'none'
                    }}
                    id={idNovelty ? `find-page-${idNovelty}` : ''}
                >
                    <InputTitle value={namePage} editTitle={editTitle} />
                    <ContentImg ref={refLayautNovelty} styles={styles} heigthAuto={heigthAuto}>{children}</ContentImg>

                    <p className='absolute bottom-[6px] right-[26px] pointer-events-none' >{numberPage ?? null}</p>
                    <div
                        className='flex h-[50px] w-full overflow-hidden items-center justify-between'
                        id='draggable-delete'
                        ref={RefHtml}
                        style={{ cursor: onSwipeRight ? 'move' : 'auto' }}
                    >
                        <img id='draggable-delete' src={icoImg} className='w-[100px]' alt="Amazonas 365" />

                        <div className='w-[80%]' id='draggable-delete'>
                            <div id='draggable-delete' className='arrow_indicate w-[100%] bg-tranparent h-[50px]' ref={arrowRef} title='Arrastrar para eliminar'>
                                <p id='draggable-delete' className='absolute text-white'>Arrastrar para eliminar página</p>
                            </div>
                        </div>
                        <img id='draggable-delete' src={icoJarvis} className='w-[50px] mr-7' alt="Jarvis" />
                    </div>
                </div>
            </div>
        </animated.div>
    );
}