import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import AwaitTaskingMemoized from './components/loadingComponents/await_task'
import { Provider } from "react-redux";
import { SessionProvider } from './context/sessionContext'
import store from './store/store';
import Header from '../app/components/header';
import PushNotificatioBox from '../app/components/notifications/push_norifications/push_notification_box';
import PreViewMultimedia from './components/preview_multimedia/MultimediaContent';
import useDisableZoom from './hook/useDisableZoom';

import "@fontsource/noto-sans"; // Defaults to weight 400
import "@fontsource/noto-sans/400.css"; // Specify weight
import "@fontsource/noto-sans/400-italic.css"; // Specify weight and style



import stylesHref from "./tailwind.css?url";
import ModalAlert from './components/modal/modalAlert';


export const links: LinksFunction = () => [
    { rel: "stylesheet", href: stylesHref },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    }
];


export function Layout({ children }: { children: React.ReactNode }) {


    useDisableZoom();



    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />



                <Meta />
                <Links />
            </head>

            <body>
                <SessionProvider>
                    <Provider store={store}>
                        <Header />
                        {children}
                        <PreViewMultimedia />
                        <PushNotificatioBox />
                        <ModalAlert />
                        {
                            <AwaitTaskingMemoized />
                        }
                        <ScrollRestoration />
                        <Scripts />
                    </Provider>
                </SessionProvider>
            </body>
        </html>
    );
}


export default function App() {
    return <Outlet />
}