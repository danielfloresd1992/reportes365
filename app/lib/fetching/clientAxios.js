import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import returnIpBase from './origen'

const jar = new CookieJar();


const instance = { jar, 
    withCredentials: true,
    baseURL: returnIpBase(),
    headers: {
    'Source-Application': 'Reporte365',
    'Version-App': '1.0'
}};


const clientHttpAxios = wrapper(axios.create(instance));


export default clientHttpAxios;