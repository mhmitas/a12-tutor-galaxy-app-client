import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Heading from '../../../components/common/Heading';
import TutorsSessionsTableRow from '../../../components/table-rows/TutorsSessionsTableRow';
import FeedbackAndRequestModal from '../../../components/dashboard/modals/FeedbackAndRequestModal';

const AllStudySessions = () => {
    const { user, authLoading } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: sessions = [], isLoading } = useQuery({
        queryKey: ['all-study-sessions', user?.email],
        enabled: !authLoading || !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/study-sessions/tutor/${user?.email}`)
            // console.log(data);
            return data
        }
    })

    if (isLoading) {
        return <span>Loading...</span>
    }

    return (
        <div className='p-2 bg-base-100 min-h-screen'>
            <Heading heading='All Sessions' />
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr className='bg-base-300'>
                            <th>#</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Reason</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.map((session, idx) => <TutorsSessionsTableRow
                            session={session}
                            key={session._id}
                            idx={idx}
                        />)}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default AllStudySessions;