import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import { toast } from 'react-toastify';


interface Props {
    roles?: number[];
}

export default function Authentication({ roles }: Props) {
    const { user } = useAppSelector(state => state.account);

    const checkAuthorization = () => {
        if (!user) {
            toast.error('You need to be logged in to do that!');
            return <Navigate to='/login' />;
        }

        if (roles && !roles.some(r => user.role === r)) {
            toast.error('Not authorised to access this area');
            return <Navigate to='/catalog' />;
        }

        return <Outlet />;
    };

    // Call checkAuthorization() to perform role-based authorization
    return checkAuthorization();
}