import React from 'react';
import useStudentBookedSessions from '../../../hooks/useStudentBookedSessions';
import Heading from '../../../components/common/Heading';
import StudentSessionMaterialsTableRow from '../../../components/table-rows/StudentSessionMaterialsTableRow';

const StudentSessionMaterialsTable = () => {
    const [bookedSessions, isLoading, refetch] = useStudentBookedSessions()

    if (isLoading) {
        return <span>Loading...</span>
    }

    return (
        <div>
            <Heading heading={'All Study Materials'} />
            {/* {bookedSessions.length} */}
            <div className="overflow-x-auto">
                <table className="table table-zebra bg-base-100">
                    {/* head */}
                    <thead>
                        <tr className='bg-base-300'>
                            <th>#</th>
                            <th>Session</th>
                            <th>Tutor</th>
                            <th>Materials</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookedSessions.map((session, idx) => <StudentSessionMaterialsTableRow
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
export default StudentSessionMaterialsTable;