import React from 'react';
import useRole from '../hooks/useRole';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Navigate } from 'react-router-dom';

const TutorRoute = ({ children }) => {
    const [role, isLoading] = useRole()
    const { user, authLoading } = useAuth()

    if (isLoading || authLoading) {
        return <LoadingSpinner />
    }

    if (role === 'tutor' && user) {
        return children
    }

    return <Navigate to={'/'} replace={true} />
};

export default TutorRoute;