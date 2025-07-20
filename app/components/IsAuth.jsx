
import { Navigate } from '@remix-run/react';
import {  useContext } from 'react';
import { myUserContext } from '../context/sessionContext';

//components
import LoadingPage from '../components/loadingComponents/LoadingPage'
import ErrorPage from '../components/loadingComponents/error_page';


export default function IsAuthWiddleware({ children }){
   
    const { dataSessionState, errorState} =  useContext(myUserContext);

    if(errorState && errorState?.code === 'ERR_NETWORK') return <ErrorPage />
    if (dataSessionState.stateSession === 'loading') return <LoadingPage />
    if(dataSessionState.stateSession === 'authenticated') return <Navigate to='/lobby' replace />
    return children;
};