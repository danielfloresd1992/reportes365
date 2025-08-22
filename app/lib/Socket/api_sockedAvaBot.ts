import { io, Socket } from 'socket.io-client';
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from '../../type/socketOi';


let socket_ava_bot: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;


socket_ava_bot = io(import.meta.env.VITE_SOCKET_AVA_URL, {
    secure: true,
    rejectUnauthorized: false,
});



socket_ava_bot.on('connect', () => {
    console.log('Io is connect');
});



export default socket_ava_bot;