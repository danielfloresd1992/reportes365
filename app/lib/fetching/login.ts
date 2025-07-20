import clientHttpAxios from './clientAxios';
import { AxiosResponse, AxiosError } from 'axios';
import { ReturnPromise, UserCredential } from '../../type/auth';






export const login = ({ email, password }: UserCredential): ReturnPromise => {
    return new Promise((resolve, reject) => {
        clientHttpAxios.post('/auth/login', {email, password})
            .then((response: AxiosResponse) => resolve(response))
            .catch((error: AxiosError) => reject(error));
    });
};




export const isAuth = (): ReturnPromise => {
    return new Promise((resolve, reject) => {
        clientHttpAxios.get('auth/isAuth')
            .then((response: AxiosResponse) => resolve(response))
            .catch((error: AxiosError) =>  reject(error));
    })
};




export const closeSession = (): ReturnPromise => {
    return new Promise((resolve, reject) => {
        clientHttpAxios.get('auth/logout')
            .then((response: AxiosResponse) => resolve(response))
            .catch((error: AxiosError) =>  reject(error));
    });
};