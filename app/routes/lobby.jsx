
import AsideBarLobby from '../components/aside/asidebar_lobby/asidebar_lobby';
import Main from '../components/main';
import ProtectedRoute from '../components/ProtectedRoute';
import CompleteLayaut from '../components/layaut/Content';



export default function Lobby(){
    return (
        <ProtectedRoute>
            <CompleteLayaut>
                <AsideBarLobby />
                <Main />
            </CompleteLayaut>   
        </ProtectedRoute>
    );
}