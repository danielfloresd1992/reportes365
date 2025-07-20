import { setOpenForm } from '../../store/slices/openFormLogin';
import { useDispatch } from 'react-redux';



export default function ButtonOpenFormLogin() {


    const dispatch = useDispatch();


    const openForm = () => {
        dispatch(setOpenForm(true));
    };


    return (
        <button className='button-generic animate-for-button' type='button' onClick={openForm}>
            Iniciar sesión
        </button>
    );
}