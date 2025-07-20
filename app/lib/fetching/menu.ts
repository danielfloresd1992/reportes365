import clientHttpAxios from './clientAxios';
import { AxiosResponse, AxiosError } from 'axios';




export const getManeuAll = (): Promise<AxiosResponse> => {
    return new Promise((resolve, reject) => {
        clientHttpAxios.get('/menu?compact=true&&alertDocument=true')
            .then((response: AxiosResponse) => {
                resolve(response);
            })
            .catch((error: AxiosError) => {
                reject(error); 
            })
    })
}



export const getMenuById = (id: string) => { 
    return new Promise((resolve, reject) => {
        clientHttpAxios.get(`/menu/id=${id}`)
            .then((response: AxiosResponse) => {
                resolve(response);
            })
            .catch((error: AxiosError) => {
                reject(error);
            })
    })
}