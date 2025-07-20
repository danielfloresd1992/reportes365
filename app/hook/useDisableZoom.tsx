import { useState, useEffect, useCallback } from 'react';

const useDisableZoom = () => {
    const [zoomLevel, setZoomLevel] = useState(100);

    // Calcular el nivel de zoom actual
    const calculateZoom = useCallback(() => {
        if (typeof window === 'undefined') return 100;

        // Método 1: Usar visualViewport (más preciso)
        if (window.visualViewport) {
            return Math.round(window.visualViewport.scale * 100);
        }

        // Método 2: Comparar dimensiones (fallback)
        return Math.round(
            (window.outerWidth / window.innerWidth) * 100
        );
    }, []);

    // Resetear el zoom al 100%
    const resetZoom = useCallback(() => {
        if (typeof window === 'undefined') return;

        // 1. Actualizar meta viewport
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (viewportMeta) {
            viewportMeta.setAttribute(
                'content',
                'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
            );
        }

        // 2. Forzar zoom mediante CSS
        document.body.style.zoom = "1";
        document.body.style.transform = "scale(1)";
        document.body.style.transformOrigin = "top left";

        // 3. Resetear en el navegador
        document.documentElement.style.zoom = "1";

        // 4. Actualizar estado
        setZoomLevel(100);
    }, []);

    // Bloquear eventos que causan zoom
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && ['+', '-', '0', '='].includes(e.key)) {
                e.preventDefault();
                resetZoom();
            }
        };

        const handleWheel = (e: WheelEvent) => {
            if (e.ctrlKey) {
                e.preventDefault();
                resetZoom();
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length > 1) {
                e.preventDefault();
                resetZoom();
            }
        };

        // Inicializar zoom
        resetZoom();

        // Añadir event listeners
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('wheel', handleWheel, { passive: false });
        document.addEventListener('touchstart', handleTouchStart, { passive: false });

        // Detectar cambios de zoom
        const checkZoomInterval = setInterval(() => {
            const currentZoom = calculateZoom();
            if (currentZoom !== zoomLevel) {
                setZoomLevel(currentZoom);
                if (currentZoom !== 100) {
                    resetZoom();
                }
            }
        }, 500);

        return () => {
            // Limpieza
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('wheel', handleWheel);
            document.removeEventListener('touchstart', handleTouchStart);
            clearInterval(checkZoomInterval);
            document.body.style.zoom = "";
            document.body.style.transform = "";
            document.body.style.transformOrigin = "";
        };
    }, [resetZoom, calculateZoom, zoomLevel]);

    return { zoomLevel, resetZoom };
};

export default useDisableZoom;