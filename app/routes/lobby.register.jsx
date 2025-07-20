import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalConfig } from '../store/slices/modal';
import { getPaginateDocument, deleteDocumentFetching } from '../lib/fetching/documents';
import ComplateLayautAndScroll from '../components/layaut/complateLayautAndScroll';
import InputStandart from '../components/inputs/input_standart';
import DocIcoDocument from '../components/ico/DocIcoDocument';
import icoGet from '../../public/ico/icons8-reiniciar-50.png';
import icoBack from '../../public/ico/icons8-atrás-64.png';
import icoNext from '../../public/ico/icons8-chevron-derecha-en-círculo-64.png';
import icoFill from '../../public/ico/icons8-filtrar-50.png';
import icoDate from '../../public/ico/icons8-calendario-50.png';
import icoDelete from '../../public/ico/gray-icons8-basura-50.png';



export default function Register() {


    const [numberPageState, setNumberPageState] = useState(0);
    //    const [deleteDocument, setDeleteDocument] = useState(null);
    const [nameFranchiseState, setNameFranchiseState] = useState('');
    const [dateQueryState, setDateQueryState] = useState(null);
    const [nameEstablishmentState, setEstablishmentState] = useState('');
    const establishments = useSelector(state => state.establishment);
    const dispath = useDispatch();



    const handdlerSetRemovePaginate = useCallback((e) => {
        if (numberPageState === 0) return;
        setNumberPageState(state => state = state - 1);
    }, [numberPageState]);



    const handdlerSetAddPaginate = useCallback((e) => {
        setNumberPageState(state => state = state + 1);
    }, [numberPageState]);


    function getNameFranchise(arrEstablishments) {
        const newArr = [];
        for (let i = 0; i < arrEstablishments.length; i++) {
            const index = newArr.indexOf(arrEstablishments[i].franchise);

            if (index > -1) continue; else newArr.push(arrEstablishments[i].franchise);
        }
        return newArr;
    }


    const handdlerOnChange = useCallback((value) => {
        console.log(value);
        if (nameEstablishmentState === value) return;
        setEstablishmentState(value);
    }, [nameEstablishmentState]);




    const consultElimination = (id) => {
        dispath(modalConfig({
            title: 'Aviso',
            description: 'Seguro de eliminar este recurso de manera permanente',
            open: true,
            warning: 'warning',
            callback: () => { deleteDocuemntCallback(id) }
        }))
    };


    const deleteDocuemntCallback = useCallback(async (id) => {
        const modalConfigObject = {
            title: 'Aviso',
            description: '',
            open: true,
            warning: 'warning',
            callback: null
        }

        try {
            await deleteDocumentFetching(id);
            modalConfigObject.title = 'Succesfull';
            modalConfigObject.description = 'Documento eliminado';
            modalConfigObject.type = 'succesfull';
        }
        catch (error) {
            console.log(error);
            if (error.response) {
                if (error.response.status === 404) modalConfigObject.description = 'El documento ya no esta disponible';
                if (error.response.status === 403) modalConfigObject.description = 'No cuenta con permiso para eliminar este recurso';
            }
        }
        finally {
            dispath(modalConfig(modalConfigObject));
        }
    }, []);



    const deleteFilternameEstablishmentState = () => {
        setEstablishmentState('');
    };



    const deleteFilterDate = () => {
        setDateQueryState(null);
    };




    return (
        <div className='w-full h-full p-[1rem_0_0_0]'>
            <ComplateLayautAndScroll callback={() => getPaginateDocument({ page: numberPageState, limit: 20, franchise: nameFranchiseState, establishment: nameEstablishmentState, date: dateQueryState })}>
                {(data) => (
                    <div className='h-full w-full flex flex-col justify-between flex-wrap'>

                        <div className='w-[5%] h-full flex items-center  justify-center'>
                            <button id='remove' onClick={handdlerSetRemovePaginate}>
                                <img className='w-[40px]' src={icoBack} alt='back-ico' />
                            </button>
                        </div>

                        <header className='w-[90%] h-[80px]'>
                            {/* 
                            <div className='flex items-center gap-[1rem]'>
                                <img className='w-[20px] h-[20px]' src={icoFill} alt="" />
                                <div className='w-[90%]'
                                    title='filtro no disponible'
                                >
                                    <InputStandart
                                        type='select'
                                        disabled={true}
                                        setValue={handdlerOnChange}
                                        textLabel='Filtrar por franquicia'
                                    >   
                                        {
                                            getNameFranchise(establishments).map(item => (
                                                <option value={item} hey={item}>{item}</option>
                                            ))
                                        }
                                    </InputStandart>
                                </div>
                            </div>
                            
                            */}


                            <div className='w-full flex flex-col items-center gap-[0.4rem]'>
                                <div className='w-full flex items-center justify-between gap-[.5rem]'>
                                    <img className='w-[20px] h-[20px]' src={icoFill} alt='icofill' />
                                    <div className='w-[95%] flex items-center gap-[0.5rem]'>
                                        <InputStandart
                                            type='select'
                                            setValue={handdlerOnChange}
                                            textLabel='Filtrar por establecimiento'
                                            value=''
                                        >
                                            <option value=''>Todos</option>
                                            {
                                                establishments.map(item => (
                                                    <option value={item.name} key={item._id}>{item.name}</option>
                                                ))
                                            }
                                        </InputStandart>
                                        <button className='w-[20px] h-[20px]' onClick={deleteFilternameEstablishmentState} title='Eliminar filtro'>
                                            <img className='w-full h-full' src={icoDelete} alt='ico-delete-filter' />
                                        </button>

                                    </div>
                                </div>

                                <div className='w-full flex items-center justify-between gap-[1rem]'>
                                    <img className='w-[20px] h-[20px]' src={icoDate} alt='icofill' />
                                    <div className='w-[95%] flex items-center gap-[0.5rem]'>
                                        <InputStandart
                                            type='date'
                                            setValue={(value) => setDateQueryState(value)}
                                            textLabel='Fecha'
                                        />
                                        <button className='w-[20px] h-[20px]' onClick={deleteFilterDate} title='Eliminar filtro'>
                                            <img className='w-full h-full' src={icoDelete} alt='ico-delete-filter' />
                                        </button>
                                    </div>

                                </div>
                                {
                                    console.log(dateQueryState)
                                }
                            </div>

                        </header>


                        <div className='w-[90%] h-[calc(95%_-_80px)] flex flex-wrap gap-[3rem] justify-center content-start items-start justify-start overflow-y-auto p-[2rem_1rem]'>
                            {
                                data.data.data.length === 0 ?
                                    <div className='w-[90%] h-full flex items-center justify-center'>
                                        <p>Sin resultados</p>
                                    </div>
                                    :
                                    data.data.data.map(document => (
                                        <DocIcoDocument document={document} deleteProps={consultElimination} key={document._id} />
                                    ))
                            }
                        </div>


                        <div className='w-[90%] flex justify-center'>
                            {
                                /**
                                 * <button 
                                className='flex justify-center items-center gap-[1rem] bg-[#8b8b8b] py-2 px-4 rounded-md'
                                onClick={handdlerSetPaginate}
                            >
                                <p className='text-white'>Cargar mas</p>
                                <img className='w-[20px]' src={icoGet} alt='ico-getTeen' />
                            </button>
                                 * 
                                 */
                            }
                            <p>Pagina: {numberPageState + 1}</p>
                        </div>

                        <div className='w-[5%] h-full flex items-center justify-center'>
                            <button id='add' onClick={handdlerSetAddPaginate}>
                                <img className='w-[40px]' src={icoNext} alt='back-ico' />
                            </button>
                        </div>
                    </div>

                )}
            </ComplateLayautAndScroll>
        </div>
    );
}