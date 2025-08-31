// useDOMProtector.js
import { useEffect, useRef } from 'react';

// Opciones por defecto para el hook
const defaultOptions = {
    revertChanges: true, // ¿Revertir cambios en el DOM?
    onTamper: () => { }, // Callback a ejecutar cuando se detecta manipulaciónd
    disable: false,      // Para desactivar fácilmente el hook en desarrollo
};


export const useDOMProtector = (options = {}) => {



    const protectedRef = useRef(null);
    const mergedOptions = { ...defaultOptions, ...options };

    // Guardamos una referencia a las opciones y el HTML original que no cambie en cada render
    const optionsRef = useRef(mergedOptions);
    const originalHTMLRef = useRef('');

    useEffect(() => {
        // Si el hook está desactivado, no hacemos nada
        if (optionsRef.current.disable) {
            return;
        }

        const node = protectedRef.current;
        if (!node) {
            return;
        }

        // Guardamos una "foto" del HTML original al montar el componente
        originalHTMLRef.current = node.innerHTML;

        let devToolsOpen = false;
        let observer = null;

        const startObserver = () => {
            if (observer || !node) return;

            const config = { attributes: true, childList: true, subtree: true, characterData: true };

            const callback = (mutationsList) => {
                // Ejecutamos el callback proporcionado por el usuario
                optionsRef.current.onTamper(mutationsList);

                // Si la opción de revertir está activa
                if (optionsRef.current.revertChanges) {
                    console.warn('Manipulación del DOM detectada. Revirtiendo cambios.');
                    // Desconectamos temporalmente para evitar un bucle infinito al revertir
                    observer.disconnect();
                    // Revertimos al HTML original
                    node.innerHTML = originalHTMLRef.current;
                    // Volvemos a observar
                    observer.observe(node, config);
                }
            };

            observer = new MutationObserver(callback);
            observer.observe(node, config);
            console.log('🛡️ DOM Protector: Observador activado.');
        };

        const stopObserver = () => {
            if (observer) {
                observer.disconnect();
                observer = null;
                console.log('🛡️ DOM Protector: Observador detenido.');
            }
        };

        const devToolsDetector = () => {
            const startTime = performance.now();
            debugger; // Pausa la ejecución si la consola está abierta
            const endTime = performance.now();

            if (endTime - startTime > 100) {
                if (!devToolsOpen) {
                    devToolsOpen = true;
                    startObserver();
                }
            } else {
                if (devToolsOpen) {
                    devToolsOpen = false;
                    stopObserver();
                }
            }
        };

        const intervalId = setInterval(devToolsDetector, 1000);

        // Función de limpieza: se ejecuta cuando el componente se desmonta
        return () => {
            clearInterval(intervalId);
            stopObserver();
        };
    }, [mergedOptions.disable]); // El efecto se ejecuta solo si cambia el estado 'disable'

    return protectedRef;
};