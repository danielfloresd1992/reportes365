import { useState, useRef, useEffect } from 'react';
import useAutoResizeInput from '../../hook/auto_resize_input';

export default function NoteDescription({ text, getValue, input, eventClick, hidden, styles }) {
    const [textState, setTextState] = useState(text ?? '');
    const refTextArea = useRef(null);
    const { refInput } = useAutoResizeInput();

    // Altura mínima para el textarea
    const MIN_TEXTAREA_HEIGHT = 50;

    useEffect(() => {
        if (refTextArea.current) {
            // Resetear altura antes de calcular
            refTextArea.current.style.height = "auto";
            
            // Calcular nueva altura con mínimo de 50px
            const newHeight = Math.max(
                refTextArea.current.scrollHeight,
                MIN_TEXTAREA_HEIGHT
            );
            
            refTextArea.current.style.height = `${newHeight}px`;
        }
    }, [textState]);

    const handleChange = (value) => {
        getValue(value);
        setTextState(value);
    };

    const callbackClick = () => {
        eventClick?.();
    };

    return (
        input ? (
            <div 
                className='p-[0rem_1rem] font-medium shadow-lg bg-gray-100 flex items-center justify-center'
                onDoubleClick={callbackClick}
                style={{
                    backgroundColor: styles?.bgTextBox || 'unset',
                    display: hidden ? 'none' : 'block',
                    border: styles?.colorBorderBox ? `2px solid ${styles?.colorBorderBox}` : 'unset'
                }}
            >
                <input
                    className='unstyledInput h-full font-semibold p-[.3rem_0rem]'
                    type='text'
                    style={{ color: styles?.colorTextBox || 'unset' }}
                    placeholder='Escriba aquí'
                    value={textState}
                    onChange={(e) => handleChange(e.target.value)}
                    ref={refInput}
                />
            </div>
        ) : (
            <div 
                className='min-w-[50%] shadow-lg bg-gray-100 flex items-center justify-center' 
                onDoubleClick={callbackClick}
                style={{
                    backgroundColor: styles?.bgTextBox || 'unset',
                    display: hidden ? 'none' : 'block',
                    border: styles?.colorBorderBox ? `2px solid ${styles?.colorBorderBox}` : 'unset'
                }}
            >
                <textarea
                    className='w-[300px] text-center bg-transparent resize-none max-w-[248px]'
                    value={textState}
                    ref={refTextArea}
                    placeholder="Escribe algo aquí..."
                    onChange={(e) => handleChange(e.target.value)}
                    style={{
                        padding: '0.5rem 0.2rem',
                        display: hidden ? 'none' : 'block',
                        color: styles?.colorTextBox || 'unset',
                        minHeight: `${MIN_TEXTAREA_HEIGHT}px` // Aseguramos altura mínima inicial
                    }}
                />
            </div>
        )
    );
}