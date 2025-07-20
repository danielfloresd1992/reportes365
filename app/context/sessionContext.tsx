import { useNavigate } from '@remix-run/react';
import { useState, useEffect, createContext, useCallback } from 'react';
import { SessionState, SessionProviderProps, SessionContextProps, ErrorAuth } from '../type/user';
import { login, isAuth, closeSession } from '../lib/fetching/login';



export const myUserContext = createContext<SessionContextProps | undefined>(undefined);


export const SessionProvider = ({ children }: SessionProviderProps) => {


    const [dataSessionState, setState] = useState<SessionState>({
        stateSession: 'loading',
        dataSession: null
    });
    const [errorState, setErrorState] = useState<ErrorAuth | null>(null);
    const navigate = useNavigate();





    const loginUser = useCallback((data: any, callback: (error: any) => void) => {
        login(data)
            .then((response: any) => {
                const setDataResult: SessionState = {
                    stateSession: 'loading',
                    dataSession: null
                }
                if (response.status === 200) {

                    setDataResult.stateSession = 'authenticated';
                    setDataResult.dataSession = response.data;
                    setState(setDataResult);
                    navigate('/lobby', { replace: true });
                    callback(null);
                }
            })
            .catch(error => {
                callback(error);
            });
    }, []);




    const closeSessionProp = (): any => {
        closeSession()
            .then((response: any) => {
                setState({
                    stateSession: 'unauthenticated',
                    dataSession: null
                })
            })
            .catch((error: any) => {
                console.log(error);
            });
    }


    const eliminatedTask = useCallback(() => {
        if (dataSessionState?.dataSession?.activity) {
            const newObject = { ...dataSessionState };
            delete newObject?.dataSession?.activity;
            setState(newObject);
        }
    }, [dataSessionState]);



    const addTask = useCallback((task: any) => {
        const newObject = { ...dataSessionState };
        newObject.dataSession.activity = task;
        setState(newObject)
    }, [dataSessionState]);




    useEffect(() => {
        if (dataSessionState.stateSession === 'loading') {
            const setDataResult: SessionState = {
                stateSession: 'loading',
                dataSession: null
            };
            isAuth()
                .then((response: any) => {
                    setDataResult.stateSession = 'authenticated';
                    setDataResult.dataSession = response.data;
                    setState(setDataResult);
                })
                .catch((error: any) => {
                    if (error?.response) {
                        setDataResult.stateSession = 'unauthenticated';
                        setDataResult.dataSession = null;
                        setErrorState(error.response.data);
                        setState(setDataResult);
                    }
                    setErrorState(error);
                });
        }
    }, []);



    return (
        <myUserContext.Provider value={{
            dataSessionState,
            setState,
            errorState,
            setErrorState,
            loginUser,
            closeSession:
                closeSessionProp,
            addTask,
            eliminatedTask
        }}
        >{children}</myUserContext.Provider>
    );
}