import React, { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Heading from '../../../components/common/Heading';
import TutorAllSessionsTab from '../../../components/dashboard/tutor/TutorAllSessionsTab';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import queryString from 'query-string';
import TutorsSessionsTableRow from '../../../components/table-rows/TutorsSessionsTableRow';
import askConfirm from '../../../components/modals/confirm-modal/AskConfirm';
import toast from 'react-hot-toast';

const TutorAllStudySessions = () => {
    const { user, authLoading } = useAuth()
    const location = useLocation()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        if (!searchParams.get('status')) {
            const query = queryString.stringifyUrl({
                url: '/dashboard/tutor/all-study-sessions',
                query: { status: 'approved' }
            })
            navigate(query, { replace: true })
        }
    }, [searchParams.get('status')])

    const { data: sessions = [], isLoading, refetch } = useQuery({
        queryKey: ['all-study-sessions', user?.email, searchParams.get('status')],
        enabled: !authLoading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/study-sessions/tutor/${user?.email}?status=${searchParams.get('status') || 'approved'}`)
            // console.log(data);
            return data
        }
    })

    async function handleDelete(id) {
        try {
            const ask = await askConfirm('Are you sure? You want to delete this session')
            if (!ask) { return };
            const { data } = await axiosSecure.delete(`/study-sessions/delete/${id}`)
            console.log(data);
            toast.success('Successfully Deleted')
            refetch()
        } catch (err) {
            console.error(err);
            toast.error(err.message)
        }
    }


    return (
        <div className='mb-12'>
            <Heading heading='All Sessions' />
            <div className='my-8 flex justify-center items-center'>
                <TutorAllSessionsTab />
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra bg-base-100">
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
                        />)
                        }
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default TutorAllStudySessions;