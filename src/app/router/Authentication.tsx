import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../store/configureStore";

interface Props {
    roles?: number[]; // Update type to number array
}

export default function Authentication({ roles }: Props) { // Change prop name to 'roles'
    const { user } = useAppSelector(state => state.account);

    const checkAuthorization = () => {
        if (!user) {
            toast.error('You need to be logged in to do that!');
            return <Navigate to='/login' />;
        }

        if (roles && !roles.some(r => user.roles.includes(r.toString()))) {
            toast.error('Not authorised to access this area');
            return <Navigate to='/catalog' />;
        }

        return <Outlet />;
    };

    // Call checkAuthorization() to perform role-based authorization
    return checkAuthorization();
}