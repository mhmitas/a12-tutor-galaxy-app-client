import React from 'react';
import SessionsCard from './SessionsCard';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const Sessions = () => {
    const axiosSecure = useAxiosSecure()
    const { data: sessions = [], isLoading, error } = useQuery({
        queryKey: ['home-page-sessions'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/study-sessions?limit=7&status=approved`)
            return data
        }
    })

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
                    <Link to='/all-sessions'><button className='btn btn-primary mt-8'>See all sessions</button></Link>
                }
            </div>
        </div>
    );
};

export default Sessions;