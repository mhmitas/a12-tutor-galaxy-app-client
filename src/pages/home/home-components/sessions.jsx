import React from 'react';
import SessionsCard from './SessionsCard';
import useStudySessions from '../../../hooks/useStudySessions';

const Sessions = () => {
    const [sessions, isLoading, error] = useStudySessions(7, 'approved')
    // console.log(sessions);

    if (isLoading) {
        return <span>Loading...</span>
    }
    if (error) {
        return <span>{error.message}</span>
    }

    console.log('some todo exist');

    return (
        <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {sessions.map(session => <SessionsCard session={session} key={session._id} />)}
            </div>
            <div className='text-center'>
                {/* need to repair */}
                {sessions?.length >= 6 &&
                    <button className='btn btn-primary mt-8'>See all sessions</button>
                }
            </div>
        </div>
    );
};

export default Sessions;