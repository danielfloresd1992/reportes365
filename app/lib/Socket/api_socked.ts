import { io, Socket } from 'socket.io-client';
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from '../../type/socketOi';


let conection: string = '';
let socket_jarvis: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;



const mode = process.env.NODE_ENV === 'development';


if (typeof window !== 'undefined') {
    const origin = window.location.hostname;
    if (!mode) {
        if (origin === '72.68.60.254') {
            conection = 'https://72.68.60.254:455';
        }
        else {
            conection = 'https://amazona365.ddns.net:455';
        }
    }
    else {
        if (origin === '72.68.60.201' || origin === 'localhost') {
            conection = 'https://72.68.60.201:3007';
        }
        else {
            conection = 'https://amazona365.ddns.net:3007';
        }
    }

    socket_jarvis = io(conection, {
        secure: true,
        rejectUnauthorized: false,
    });



    socket_jarvis.on('connect', () => {
        console.log('Io is connect');
    });

}



export default socket_jarvis;