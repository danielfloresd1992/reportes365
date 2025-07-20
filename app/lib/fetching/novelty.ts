import { AxiosResponse, AxiosError } from 'axios';
import clientHttpAxios from './clientAxios';


interface IQueryNovelty{
    date: `${number}-${number}-${number}`,
    shift: `${number}-${number}-${number}` | null,
    nameEstablishment: string,
    populate: 'menuRef' | undefined | null,
    properties: string | undefined
}


export function getNoveltyForHydration({date, shift, nameEstablishment, populate, properties}: IQueryNovelty): Promise<any>{
    return new Promise((resolve, reject) => {
        clientHttpAxios.get(`/noveltie/date=${date}/shift=${shift}/establishments=${nameEstablishment}/extract?${populate ? `populate=${populate}` : '' }${properties ? `&properties=${properties}` : ''}`)
        .then((response: AxiosResponse) => resolve(response))
        .catch((error: AxiosError) => reject(error));
    });
}