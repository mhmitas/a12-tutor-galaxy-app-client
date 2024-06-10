import React from 'react';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const location = useLocation()
    const { user, authLoading } = useAuth()

    if (authLoading) {
        return <LoadingSpinner />
    }

    if (user) {
        return children
    }

    return <Navigate to='/sign-in' state={{ from: location }} replace={true} />
};

export default PrivateRoute;