import { Dispatch, ReactNode, SetStateAction } from 'react';



export type SessionState = {
    stateSession: 'loading' | 'authenticated' | 'unauthenticated';
    dataSession: any;
}



export type SessionProviderProps = {
    children: ReactNode;
}




export type ErrorAuth = {
    status: number,
    menssage: string,
    error: 'Continue' | 'Processing' | 'Bad Request' | 'Unauthorized' | 'Forbidden' | 'Conflict' | 'Internal Server Error'
}


export type SessionContextProps = {
    dataSessionState: any,
    errorState: ErrorAuth | null,
    setErrorState: Dispatch<ErrorAuth | null>,
    setState: Dispatch<SetStateAction<SessionState>>,
    loginUser: any,
    closeSession: () => any,
    addTask: any,
    eliminatedTask: any
}