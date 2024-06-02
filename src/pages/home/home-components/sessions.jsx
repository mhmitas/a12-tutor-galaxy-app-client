import React from 'react';
import SessionsCard from './SessionsCard';
import useStudySessions from '../../../hooks/useStudySessions';

const Sessions = () => {
    const [sessions, isLoading, error] = useStudySessions()
    // console.log(sessions);

    if (isLoading) {
        return <span>Loading...</span>
    }
    if (error) {
        return <span>{error.message}</span>
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {sessions.map(session => <SessionsCard session={session} key={session._id} />)}
        </div>
    );
};

export default Sessions;