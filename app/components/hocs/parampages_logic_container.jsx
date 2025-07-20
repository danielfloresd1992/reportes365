import { useEffect, forwardRef, useContext } from 'react';
import Sortable from 'sortablejs';
import { useDispatch } from 'react-redux';
import { setConfigAwait } from '../../store/slices/awaitStore';
import useAdapterResize from '../../hook/adapter_resize';
import { htmlToPng } from '../../lib/file/toPng';
import { myUserContext } from '../../context/sessionContext';
import { pdfClassic } from '../../lib/file/pdf';
import shiftToEs from '../../lib/script/shit_lang';

import NavBarOption from '../headerComponens/NasBarOption';





const ContentPages = forwardRef(({ nameDocument, children }, ref) => {


    const dispatch = useDispatch();
    const { htmlAdapterRef, resetDefault } = useAdapterResize({ breackWidth: 1530, breackMinWidth: { breackWidth: 1210, limit: 1100 } });
    const { dataSessionState } = useContext(myUserContext);
    const documentDataCookie = dataSessionState?.dataSession?.activity;



    useEffect(() => {
        if (htmlAdapterRef.current) {
            const sortable = Sortable.create(htmlAdapterRef.current, {
                handle: '#drag-handle-1',
                animation: 150,
                easing: 'cubic-bezier(1, 0, 0, 1)',
                swapThreshold: 1,
                ghostClass: 'sortable-ghost',
                onEnd: () => {
                    const newOrder = sortable.toArray();
                    updateDataPage(newOrder, true);
                },
                onMove: e => {
                    if (e.target.classList.contains('locked')) return false;
                },
                forceFallback: true,

            });


            return () => {
                sortable.destroy();
            }
        }
    }, []);





    useEffect(() => {
        if (htmlAdapterRef.current) {
            const observer = new MutationObserver((mutations) => {

                const arrElement = document.querySelectorAll('#page-page');
                const countElement = document.getElementById('count-page-25');
                countElement.textContent = arrElement.length;

            });

            observer.observe(htmlAdapterRef.current, {
                childList: true, // Observar cambios en hijos
                subtree: true,   //
            });


            return () => observer.disconnect();
        }
    }, [htmlAdapterRef.current]);






    const handdler_exportation = async () => {
        try {
            resetDefault(true);
            dispatch(setConfigAwait({
                open: true,
                title: 'Exportación del documento',
                description: 'analizando imágenes para el renderizado'
            }));
            if (typeof document !== undefined) document.body.style.cursor = 'wait';



            const htmlCollection = Array.from(htmlAdapterRef.current.querySelectorAll('#page-page'));

            const result = await htmlToPng(htmlCollection);

            dispatch(setConfigAwait({
                open: true,
                title: 'Exportación del documento',
                description: 'creación del archivo'
            }));

            dispatch(setConfigAwait({
                open: true,
                title: 'Exportación del documento',
                description: 'preparando para la descarga'
            }));
            const docPdf = await pdfClassic(result);

            docPdf.save(`${nameDocument}.pdf`);
        }
        catch (error) {
            console.log(error)
        }
        finally {
            if (typeof document !== undefined) document.body.style.cursor = 'unset';
            dispatch(setConfigAwait({
                open: false,
                title: '',
                description: ''
            }));
            resetDefault(false);
        }
    };





    return (
        <div className='w-full h-full bg-[#ddd]'>
            <NavBarOption actionPdf={handdler_exportation} />
            <div className='w-full h-full' ref={ref} style={{ height: 'calc(100% - 80px)' }}>
                <form
                    ref={htmlAdapterRef}
                    className='w-full h-full scroll-y p-[2rem]'
                >
                    {children}
                </form>
            </div>
            <footer className='w-full h-[40px]'>
                <hr />
                <div className='w-full h-full'>
                    <input type="range" name="" id="" />
                </div>
            </footer>
        </div>
    );
});



export default ContentPages;