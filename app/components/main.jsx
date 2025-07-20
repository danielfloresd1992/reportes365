import { Outlet } from '@remix-run/react';


export default function Main() {



    return (
        <div className='fixed right-0 top-0 pt-[50px] bg-aqua w-[calc(100%-320px)] h-full p-[1rem_1rem_1rem_1rem] flex justify-center items-center overflow-y-scroll'>
            <Outlet />
        </div>
    );
}