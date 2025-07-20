import { AxiosResponse, AxiosError } from 'axios';



export type ReturnPromise = Promise<AxiosResponse | AxiosError>



export type UserCredential = {
    email: string,
    password: string
};