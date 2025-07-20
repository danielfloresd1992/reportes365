import { useState, useRef, useEffect, useCallback } from 'react';



export default function useDraggableElement(coordinates) {


    const elementRef = useRef(null);
    const positionRef = useRef(coordinates ? coordinates.position : { x: 0, y: 0 });
    const mousePositionRef = useRef({ x: 0, y: 0 });
    const isDraggingRef = useRef(false);

    const inputRotate = useRef(null);
    const elementRotate = useRef(null);
    const refRotate = useRef(coordinates ? coordinates.rotate : 0);

    const [styleState, setStyleState] = useState({
        position: coordinates ? coordinates.position : { x: 0, y: 0 },
        rotate: coordinates ? coordinates.rotate : 0,
    });





    useEffect(() => {
        if (elementRef.current) {
            elementRef.current.style.position = 'relative';
            const handlerMousedown = (e) => {
                if (e.target.id === 'nodragg-3030') return null;
                isDraggingRef.current = true;
                mousePositionRef.current = { x: e.clientX, y: e.clientY };
                elementRef.current.style.cursor = 'grabbing';
            };

            const handlerMousemove = (e) => {
                if (isDraggingRef.current) {
                    const dx = e.clientX - mousePositionRef.current.x;
                    const dy = e.clientY - mousePositionRef.current.y;
                    positionRef.current = {
                        x: positionRef.current.x + dx,
                        y: positionRef.current.y + dy,
                    };
                    mousePositionRef.current = { x: e.clientX, y: e.clientY };
                    updatePotition();
                }
            };


            const handlerMouseup = () => {
                if (elementRef.current) {
                    isDraggingRef.current = false;
                    elementRef.current.style.cursor = 'grab';
                    setStyleState({
                        position: { x: positionRef.current.x, y: positionRef.current.y },
                        rotate: refRotate.current
                    });
                }
            };


            const handlerMouseleave = e => {
                e.preventDefault();
                if (isDraggingRef.current) return;
                isDraggingRef.current = false;
                elementRef.current.style.cursor = 'grab';
                elementRotate.current.style.display = 'none';
                setStyleState({
                    position: { x: positionRef.current.x, y: positionRef.current.y },
                    rotate: refRotate.current
                });
            };




            const isExist = elementRef.current.querySelector('#nodragg-3030');
            if (!isExist) {
                const newElement = document.createElement('input');
                elementRotate.current = newElement;
                newElement.id = 'nodragg-3030';
                newElement.type = 'range';
                inputRotate.current = newElement;
                newElement.setAttribute('min', '0');
                newElement.setAttribute('max', '360');
                newElement.style.width = '100%';
                newElement.style.height = '15px';
                newElement.style.display = 'none';
                newElement.style.position = 'absolute';
                newElement.style.marginBottom = '0';
                newElement.style.bottom = '-10px';
                newElement.oninput = e => {
                    refRotate.current = e.target.value;
                    updatePotition();
                    setStyleState({
                        position: { x: positionRef.current.x, y: positionRef.current.y },
                        rotate: refRotate.current
                    });
                };
                newElement.style.cursor = 'pointer';
                elementRef.current.appendChild(newElement);
            }


            const handlerClickDisplay = e => {
                e.preventDefault();
                elementRotate.current.style.display = 'block'
            };


            const handdlerSeleted = e => {
                e.preventDefault();
            };


            elementRef.current.addEventListener('mouseover', handlerClickDisplay);
            elementRef.current.addEventListener('mousedown', handlerMousedown);
            document.addEventListener('mousemove', handlerMousemove);
            document.addEventListener('mouseup', handlerMouseup);
            elementRef.current.addEventListener('mouseleave', handlerMouseleave);
            elementRef.current.addEventListener('selectstart', handdlerSeleted);


            return () => {
                if (elementRef.current) {
                    elementRef.current.removeEventListener('mouseover', handlerClickDisplay);
                    elementRef.current.removeEventListener('mousedown', handlerMousedown);
                    document.removeEventListener('mousemove', handlerMousemove);
                    document.removeEventListener('mouseup', handlerMouseup);
                    elementRef.current.removeEventListener('mouseleave', handlerMouseleave);
                    elementRef.current.removeEventListener('selectstart', handdlerSeleted);
                }
            };
        }
    }, []);


    const updatePotition = useCallback(() => {
        const transformTraslate = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;
        elementRef.current.style.transform = transformTraslate;

        const transformRotate = `rotate(${refRotate.current}deg)`;
        elementRef.current.children[0].style.transform = transformRotate;
    }, [elementRef.current]);


    useEffect(() => {
        if (elementRotate.current) updatePotition();
    }, []);


    return { elementRef, styleState };
}
