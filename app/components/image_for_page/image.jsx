import { useState, useEffect, useRef } from 'react';
import imgDefault from '../../../public/25-10-21-how-to-create-file-dropzone-in-react-and-typescript-blog.jpg'
import compressFile from '../../lib/file/compress';
import arrow from '/ico/icons8-flecha-100.png';

import useDraggableElement from '../../hook/draggable_element';
import useAutoResizeInput from '../../hook/auto_resize_input';


export default function Image({
    item,
    count,
    full,
    h_full,
    styles,
    layautDouble,
    setSrc,
    getFile,
    style,
    arrowCordernate,
    setCoordinates,
    saveCordenate,
    caption,
    title,
    boubleClickEvent,
    updateCaption
}) {



    const refSrc = useRef();
    const { elementRef, styleState } = useDraggableElement(setCoordinates);
    const [captionState, setCaptionState] = useState(caption);
    const { adjustWidth, refInput } = useAutoResizeInput({ value: caption });



    useEffect(() => {
        if (arrowCordernate && saveCordenate) {
            saveCordenate(styleState);
        }
    }, [styleState]);



    const handlerOnDragEnter = e => {
        e.preventDefault();
        refSrc.current.classList.add('enterAdd');
    };

    const handlerOnDragOver = e => {
        e.preventDefault();
    };

    const handlerOnLeave = e => {
        e.preventDefault();
        refSrc.current.classList.remove('enterAdd');
    };


    const handlerOnDrop = e => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        compressFile({
            file: file, callback: (result, error) => {
                refSrc.current.classList.remove('enterAdd');
                if (error) return error;
                getFile(result);

                let fileReader = new FileReader();

                const setImg = (e) => {
                    refSrc.current.src = e.target.result;
                    fileReader.onload = null
                };

                fileReader.readAsDataURL(result);
                fileReader.onload = setImg
                fileReader = null;
            }
        });
    };




    const handdlerDoubleClick = () => {
        if (typeof boubleClickEvent === 'function') boubleClickEvent();
    };




    return (
        <div
            className={`${layautDouble ? 'w-[250px]' : 'w-[48%]'}  ${layautDouble ? 'h-[235px]' : 'h-[200px]'} relative ${count === 1 ? 'one-img-max' : ''} ${full === true ? 'w-full' : ''} ${h_full ? 'h-[230px]' : ''} overflow-hidden`}
            onDragEnter={handlerOnDragEnter}
            onDragOver={handlerOnDragOver}
            onDragLeave={handlerOnLeave}
            onDrop={handlerOnDrop}
            style={full ? { width: '100%', ...style } : { ...style }}
            title={title ?? ''}
            onDoubleClick={handdlerDoubleClick}
        >
            <img
                className={`w-full ${layautDouble ? 'h-[235px]' : 'h-full'}`} style={{ zIndex: 30 }}
                src={setSrc ?? imgDefault}
                alt='pegue la imagen aqui'
                ref={refSrc}
                draggable={false}
            />

            {
                caption ?
                    (

                        <div
                            className={`absolute min-w-[100px] bottom-[0] p-[.2rem_1rem] bg-[#fff] border-2 border-[#03b77e] text-center`}
                            style={{
                                backgroundColor: styles?.bgTextBox ?? '#ffffff',
                                borderColor: styles?.colorBorderBox ?? '#000000'
                            }}

                        >

                            <input
                                className='unstyledInput font-semibold text-center min-w-[4ch]'
                                type='text'
                                name='input'
                                value={captionState}
                                ref={refInput}
                                style={{ color: styles?.colorTextBox ? styles?.colorTextBox : '#000000' }}
                                onChange={e => {
                                    if (typeof updateCaption === 'function') {
                                        setCaptionState(e.target.value);
                                        updateCaption(e.target.value);
                                    }
                                }}

                            />

                        </div>

                    )
                    :
                    (
                        null
                    )
            }
            {
                arrowCordernate ?
                    <div
                        ref={elementRef}
                        draggable={false}
                        className='w-[65px] top-[-150px] left-[10%] cursor-pointer'
                        style={{ cursor: 'grab' }}
                        onDoubleClick={handdlerDoubleClick}
                    >
                        <img
                            draggable={false}
                            className='w-[100%]'
                            style={{ filter: 'drop-shadow(2px 0px 10px white)', pointerEvents: 'none' }}
                            src={arrow}
                            alt={`arroe-${setSrc ?? imgDefault}`}
                        />
                    </div>
                    :
                    null
            }


        </div>
    );
}