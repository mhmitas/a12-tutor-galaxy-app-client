import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query'
import Heading from '../../../components/common/Heading';
import AllStudySessionsAdminRow from '../../../components/table-rows/AllStudySessionsAdminRow';

const AllStudySessionsAdmin = () => {
    const { user, authLoading } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: sessions = [], isLoading, refetch } = useQuery({
        queryKey: ['all-study-sessions-admin', user?.email],
        enabled: !authLoading || !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/all-sessions`)
            // console.log(data);
            return data
        }
    })

    if (isLoading) {
        <span>Loading...</span>
    }

    return (
        <div className='p-2 bg-base-100 min-h-screen'>
            <Heading heading='Manage All Sessions' />
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr className='bg-base-300'>
                            <th>#</th>
                            <th>Session Title</th>
                            <th>View detail</th>
                            <th>Tutor</th>
                            <th>Status</th>
                            {/* <th>Change Status</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.map((session, idx) => <AllStudySessionsAdminRow
                            session={session}
                            refetch={refetch}
                            key={session._id}
                            idx={idx}
                        />)}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default AllStudySessionsAdmin;