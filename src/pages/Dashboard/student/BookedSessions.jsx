import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query'
import Heading from '../../../components/common/Heading';
import BookedSessionsRow from '../../../components/table-rows/BookedSessionsRow';

const BookedSessions = () => {
    const axiosSecure = useAxiosSecure()
    const { user, authLoading } = useAuth()

    const { data: bookedSessions = [], isLoading, refetch } = useQuery({
        queryKey: ['bookedSessions', user?.email],
        enabled: !authLoading || !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/bookings/${user?.email}`)
            console.log(data);
            return data
        }
    })
    if (isLoading) {
        return <span>Loading...</span>
    }

    return (
        <div className='p-2 bg-base-100 min-h-screen'>
            <Heading heading='All Booked Sessions' />
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr className='bg-base-300'>
                            <th>#</th>
                            <th>Title</th>
                            <th>Tutor</th>
                            <th>Class Duration</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookedSessions.map((session, idx) => <BookedSessionsRow
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

export default BookedSessions;