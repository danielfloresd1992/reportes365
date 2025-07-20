import { useState, useEffect, useCallback, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalConfig } from '../store/slices/modal';
import Cover from '../components/cover';
import FormDocument from '../components/form/form_document';
import { myUserContext } from '../context/sessionContext';
import { setDocument, isExistDocument } from '../lib/fetching/documents';
import { getFranchiseWithItsEstablishments } from '../lib/fetching/establishment';
import { useNavigate } from '@remix-run/react';
import IcoResumeShift from '../components/ico/icoResumeShift';




function Elaborate() {


    const [groupEstablishmentsState, setGroupEstablishmentsState] = useState(null);
    const [establishmentsState, setEstablishmentsState] = useState(null);
    const [franchiseState, setFranchiseState] = useState(null);
    const { addTask } = useContext(myUserContext);
    const establishmentsArr = useSelector(store => store.establishment);
    const dispatch = useDispatch();
    const navigate = useNavigate();



    useEffect(() => {
        const group = establishmentsArr.reduce((acc, item) => {
            const { franchiseReference } = item;
            const name = franchiseReference?.name_franchise;
            if (!acc[name]) {
                acc[name] = [];
            }
            acc[name].push(item);
            return acc;
        }, {});

        setGroupEstablishmentsState(group);
    }, [establishmentsArr]);



    const seletedFranchise = (name_franchise) => {
        console.log(name_franchise);
        getFranchiseWithItsEstablishments(name_franchise)
            .then(response => {
                setFranchiseState(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };



    const seletedEstablishment = (establishments) => {
        setEstablishmentsState(establishments);
    };



    const deleteSeletedEstablishment = () => {
        setEstablishmentsState(null);
        setFranchiseState(null);
    };




    const handdlerSumit = useCallback((params, franchiseParams, establishmentParams) => {
        console.log(params)
        console.log(franchiseParams)
        const bodyForRequest = { ...params };
        if (establishmentParams) {
            bodyForRequest.establishmentName = establishmentParams.name;
            bodyForRequest.establishmentId = establishmentParams._id;
            bodyForRequest.rout = '/document';
        }
        else if (franchiseParams) {
            bodyForRequest.franchiseName = franchiseParams.franchise.name;
            bodyForRequest.franchiseId = franchiseParams.franchise._id;
            bodyForRequest.rout = '/resume_document';
        };

        isExistDocument(bodyForRequest)
            .then(response => {
                const boolean = response.data.result;
                if (!boolean) {
                    dispatch(modalConfig({
                        type: 'warning',
                        title: 'Aviso',
                        description: 'Esta fecha esta disponible, al aceptar se creara un reporte a realizar',
                        open: true,
                        callback: () => handdlerCallback(bodyForRequest)
                    }));
                }
                else {
                    dispatch(modalConfig({
                        type: 'warning',
                        title: 'Aviso',
                        description: '¡Esta fecha no esta disponible, intente otro!',
                        open: true,
                        callback: null
                    }));
                }
            })
            .catch(error => console.log(error));
    }, [establishmentsState]);




    const handdlerCallback = useCallback((bodyForRequest) => {
        console.log(bodyForRequest)
        setDocument({ ...bodyForRequest })
            .then(response => {
                addTask(response.data.task);
                navigate(bodyForRequest.rout);
            })
            .catch(error => {
                console.log(error);
                if (error.status === 409) {
                    const establishmentName = error?.response?.data?.data?.establishmentName;
                    dispatch(modalConfig({
                        type: 'error',
                        title: 'Error',
                        description: `No se puede asignar una nueva tarea por que este usuario ya se encuentra en una. ${establishmentName}, comuniquese con el administrador`,
                        open: true,
                        callback: null
                    }));
                }

            });
    }, [establishmentsState]);



    console.log(groupEstablishmentsState);



    return (
        <>
            <div className='relative w-full h-full flex items-start justify-center'>
                <div className=' relative w-full flex justify-center items-center flex-wrap gap-[2rem] p-[3rem]'>
                    {
                        groupEstablishmentsState && Object.keys(groupEstablishmentsState).map((franchise, index) => (
                            <div className='w-full flex justify-center flex-col gap-[2rem]' key={index}>
                                <p className='text-center' style={{ fontSize: '1.3rem' }}>{franchise}</p>
                                <hr />
                                <div>
                                    <div className='flex items-start justify-center gap-[2rem] flex-wrap'>
                                        {
                                            groupEstablishmentsState[franchise].map(establishment => (
                                                <>
                                                    <Cover establishment={establishment} seleted={seletedEstablishment} key={establishment._id} />
                                                </>
                                            ))
                                        }
                                        <IcoResumeShift nameFranchise={franchise} seleted={seletedFranchise} />
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
                {
                    franchiseState || establishmentsState ?
                        <div className='fixed w-[calc(100%-320px)] h-full top-[0] flex items-center justify-center backdrop-blur-[3px]'>
                            <FormDocument franchise={franchiseState} establishment={establishmentsState} deleteSeletedEstablishment={deleteSeletedEstablishment} handdlerSumitProp={handdlerSumit} />
                        </div>
                        :
                        null
                }
            </div>
        </>
    );
}


export default Elaborate;