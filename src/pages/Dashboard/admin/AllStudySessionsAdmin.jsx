import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query'
import Heading from '../../../components/common/Heading';
import AllStudySessionsAdminRow from '../../../components/table-rows/AllStudySessionsAdminRow';

const AllStudySessionsAdmin = () => {
    const { user, authLoading } = useAuth()
    const [tabStatus, setTabStatus] = useState('pending')
    const axiosSecure = useAxiosSecure()

    const { data: sessions = [], isLoading, refetch } = useQuery({
        queryKey: ['all-study-sessions-admin', user?.email, tabStatus],
        enabled: !authLoading || !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/study-sessions/by-admin?status=${tabStatus}`)
            // console.log(data);
            return data
        }
    })

    if (isLoading) {
        <span>Loading...</span>
    }

    return (
        <div className='p-2 min-h-screen'>
            <Heading heading='Manage All Sessions' />
            <div className='my-8 '>
                <div role="tablist" className="tabs tabs-bordered w-max mx-auto font-semibold">
                    <span onClick={() => setTabStatus('pending')} role="tab" className={`tab ${tabStatus === 'pending' && 'tab-active text-primary'}`}>Pending</span>
                    <span onClick={() => setTabStatus('approved')} role="tab" className={`tab ${tabStatus === 'approved' && 'tab-active text-primary'}`}>Approved</span>
                    <span onClick={() => setTabStatus('rejected')} role="tab" className={`tab ${tabStatus === 'rejected' && 'tab-active text-primary'}`}>Rejected</span>
                </div>
            </div>
            <div className="overflow-x-auto overflow-y-auto bg-base-100">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr className='bg-base-300'>
                            <th>#</th>
                            <th>Session Title</th>
                            <th>View detail</th>
                            <th>Tutor</th>
                            <th>Status</th>
                            <th>Action</th>
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