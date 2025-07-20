
import { useState, useEffect, useCallback, useContext } from 'react';
import { useLocation } from "@remix-run/react";
import { v4 as uuidv4 } from 'uuid';
import { myUserContext } from '../../../context/sessionContext';
import socket_jarvis from '../../../lib/Socket/api_socked';
import socket_ava_bot from '../../../lib/Socket/api_sockedAvaBot';
import Box_notification from './box_notification';




export default function PushNotificatioBox() {


    const [notifications, setNotifications] = useState([]);
    const { dataSessionState } = useContext(myUserContext);
    const location = useLocation();





    useEffect(() => {
        setNotifications([...notifications, { id: uuidv4(), title: 'Hola mundo 🌎', description: 'Bienvenido al sistema de notificaciones de Jarvis365' }]);
    }, []);









    useEffect(() => {
        let keyNotificationsAva = true && dataSessionState.stateSession === 'authenticated';
        let keyNotificationsJarvis = true && dataSessionState.stateSession === 'authenticated';


        const handlerWarningAva = msm => {
            if (keyNotificationsAva) {
                setNotifications([...notifications, {
                    title: 'Aviso',
                    description: msm?.text ?? 'Error en el mensaje',
                    id: uuidv4(),
                }]);
            }
        }


        const handlerNotificationJarvis = msm => {
            if (keyNotificationsJarvis) {
                setNotifications([...notifications, {
                    title: msm?.title ?? 'Error',
                    description: msm?.description ?? 'Error en el mensaje',
                    id: uuidv4(),
                }]);
            }
        };


        socket_jarvis.on('jarvis365reporte-alert-receive', handlerNotificationJarvis);
        socket_ava_bot.on('warning', handlerWarningAva);


        return () => {
            keyNotificationsAva = false;
            keyNotificationsJarvis = false;
            socket_jarvis.off('jarvis365reporte-alert-receive', handlerNotificationJarvis);
            socket_ava_bot.off('warning', handlerWarningAva);
        }
    }, [notifications]);




    const deleteNotification = useCallback((id) => {
        setNotifications(state => state.filter(msm => msm.id !== id));
    }, [notifications]);



    if (location.pathname === '/document') return null;




    return (
        <div className='absolute bottom-[0] right-[0] p-[3rem] flex gap-[1rem] pointer-never'>
            {
                notifications.map(msm => (
                    dataSessionState.stateSession === 'authenticated' ?
                        <Box_notification msmProps={msm} deleteMsm={deleteNotification} key={msm.id} />
                        :
                        null
                ))
            }
            <p className='absolute bottom-[20px] right-[50px] w-[260px] text-custom-small font-medium text-customGrayText text-center'>Integración continua con la api de Jarvis</p>
        </div>
    );
};