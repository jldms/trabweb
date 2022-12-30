import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import AuthContext from '../context/AuthContext';

const PrivateRoutes = () => {

    const { isLogged } = useContext(AuthContext);

    
    
    return (
        isLogged? <Outlet /> : <Navigate to="/signin" />
    )
}

export default PrivateRoutes;