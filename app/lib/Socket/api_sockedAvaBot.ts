import { io, Socket } from 'socket.io-client';
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from '../../type/socketOi';


let conection: string = '';
let socket_ava_bot: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;



const mode = process.env.NODE_ENV === 'development';


if (typeof window !== 'undefined') {
    const origin = window.location.hostname;
    if (!mode) {
        if (origin === '72.68.60.254') {
            conection = 'https://72.68.60.254:3000';
        }
        else {
            conection = 'https://amazona365.ddns.net:3000';
        }
    }
    else {
        if (origin === '72.68.60.201' || origin === 'localhost') {
            conection = 'https://72.68.60.254:3000';
        }
        else {
            conection = 'https://amazona365.ddns.net:3000';
        }
    }
    socket_ava_bot = io(conection, {
        secure: true,
        rejectUnauthorized: false,
    });



    socket_ava_bot.on('connect', () => {
        console.log('Io is connect');
    });


}



export default socket_ava_bot;