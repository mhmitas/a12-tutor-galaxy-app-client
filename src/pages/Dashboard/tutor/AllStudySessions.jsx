import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Heading from '../../../components/common/Heading';
import TutorsSessionsTableRow from '../../../components/table-rows/TutorsSessionsTableRow';
import askConfirm from '../../../components/modals/confirm-modal/AskConfirm';
import toast from 'react-hot-toast';

const AllStudySessions = () => {
    const { user, authLoading } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: sessions = [], isLoading, refetch } = useQuery({
        queryKey: ['all-study-sessions', user?.email],
        enabled: !authLoading || !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/study-sessions/tutor/${user?.email}`)
            // console.log(data);
            return data
        }
    })

    async function handleDelete(id) {
        try {
            const ask = await askConfirm('Are you sure? You want to delete this material')
            if (!ask) { return };
            const { data } = await axiosSecure.delete(`/study-sessions/delete/${id}`)
            console.log(data);
            toast.success('Successfully Deleted')
            refetch()
        } catch (err) {
            console.error(err);
        }
    }


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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.map((session, idx) => <TutorsSessionsTableRow
                            session={session}
                            refetch={refetch}
                            key={session._id}
                            idx={idx}
                            handleDelete={handleDelete}
                        />)}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default AllStudySessions;