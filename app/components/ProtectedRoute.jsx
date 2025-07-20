
import { Navigate, useLocation } from '@remix-run/react';
import { useEffect, useContext } from 'react';
import { myUserContext } from '../context/sessionContext';

//components
import LoadingPage from '../components/loadingComponents/LoadingPage';
import ErrorPage from '../components/loadingComponents/error_page';


const ProtectedRoute = ({ children }) => {

    const { dataSessionState, errorState } = useContext(myUserContext);
    const location = useLocation();



    if (errorState && errorState.code === 'ERR_NETWORK') return <ErrorPage />
    if (dataSessionState.stateSession === 'loading') return <LoadingPage />;

    else if (dataSessionState.stateSession === 'unauthenticated') {
        return <Navigate to='/' />
    }
    else if (location.pathname !== '/resume_document' && location.pathname !== '/document' && dataSessionState.stateSession === 'authenticated') {
        if (dataSessionState.dataSession?.activity?.SMU) {
            if (dataSessionState.dataSession?.activity?.SMU.type === 'resume-shift') return <Navigate to='/resume_document' />;
            if (dataSessionState.dataSession?.activity?.SMU.type === 'complete-shift') return <Navigate to='/document' />
            else return <Navigate to='/' />
        }



        else return children;
    }

    return children;
};

export default ProtectedRoute;