import React from 'react';
import Heading from '../../../components/common/Heading';
import BookedSessionsRow from '../../../components/table-rows/BookedSessionsRow';
import useStudentBookedSessions from '../../../hooks/useStudentBookedSessions';

const BookedSessions = () => {

    const [bookedSessions, isLoading, refetch] = useStudentBookedSessions()

    if (isLoading) {
        return <span>Loading...</span>
    }

    return (
        <div className='p-2 min-h-screen'>
            <Heading heading='All Booked Sessions' />
            <div className="overflow-x-auto bg-base-100">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr className='bg-base-300'>
                            <th>#</th>
                            <th>Title</th>
                            <th>Tutor</th>
                            <th>Class Duration</th>
                            <th></th>
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