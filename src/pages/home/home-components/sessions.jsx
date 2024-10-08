import React from 'react';
import SessionsCard from './SessionsCard';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Heading from '../../../components/common/Heading';
import SessionCardSkeleton2 from '../../../components/common/SessionCardSkeleton2';

const Sessions = () => {
    const axiosSecure = useAxiosSecure()
    const { data: sessions = [], isLoading, error } = useQuery({
        queryKey: ['home-page-sessions'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/study-sessions?limit=7&status=approved`)
            return data
        }
    })

    if (error) {
        return <span>{error.message}</span>
    }

    // console.log('some todo exist');

    return (
        <div className='mb-16'>
            <div className='mb-8'>
                <Heading heading={'Latest Learning Opportunities'} subHeading={'Stay ahead with our newest study sessions, covering a wide range of subjects and topics. Book a session with expert tutors and enhance your learning experience today!'} />
            </div>
            {!isLoading ?
                (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {sessions.slice(0, 4).map(session => <SessionsCard session={session} key={session._id} />)}
                    </div>
                )
                :
                (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {[...Array(4).keys()].map((_, i) => <SessionCardSkeleton2 key={i} />)}
                    </div>
                )
            }
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