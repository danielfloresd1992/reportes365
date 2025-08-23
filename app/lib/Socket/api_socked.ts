import { io, Socket } from 'socket.io-client';
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from '../../type/socketOi';


let conection: string = import.meta.env.VITE_SOCKET_JARVIS_URL;
let socket_jarvis: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;




socket_jarvis = io(conection, {
    secure: true,
    rejectUnauthorized: false,
});



socket_jarvis.on('connect', () => {
    console.log('Io is connect');
});



export default socket_jarvis;