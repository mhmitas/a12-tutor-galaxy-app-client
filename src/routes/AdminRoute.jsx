import React from 'react';
import useRole from '../hooks/useRole';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const [role, isLoading] = useRole()
    const { user, authLoading } = useAuth()

    if (isLoading || authLoading) {
        return <LoadingSpinner />
    }

    if (role === 'admin' && user) {
        children
    }

    return <Navigate to={'/'} />
};

export default AdminRoute;