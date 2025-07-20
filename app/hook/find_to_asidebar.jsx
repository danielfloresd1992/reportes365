import { useDispatch } from 'react-redux';
import { modalConfig } from '../store/slices/modal';



export default function useFindArticle() {


    const dispatch = useDispatch();


    const findNovelty = id => {
        if (typeof window !== undefined) {
            const alertById = document.getElementById(`find-${id}`);
            const asideBarArticles = document.querySelector('.aside-right');
            asideBarArticles.classList.add('aside-right-hover');

            const handdlerMouseLeave = (e) => {
                e.preventDefault();
                asideBarArticles.classList.remove('aside-right-hover');
                asideBarArticles.removeEventListener('mouseleave', handdlerMouseLeave);
            };

            asideBarArticles.addEventListener('mouseleave', handdlerMouseLeave);

            if (alertById) {
                alertById.scrollIntoView({
                    block: 'start',
                    behavior: 'smooth'
                });
                alertById.classList.add('eletedAlertAnimation');
            }
            else {
                dispatch(modalConfig({
                    type: 'warning',
                    open: true,
                    callback: null,
                    title: 'Aviso',
                    description: 'La alerta selecionada no existe en el muro de alertas, datos sin hidratar'
                }));
            }
        }
    };



    return { findNovelty };
}