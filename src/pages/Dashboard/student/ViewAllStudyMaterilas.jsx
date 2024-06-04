import React from 'react';
import Heading from '../../../components/common/Heading';
import Container from '../../../components/shared/Container';
import useStudentBookedSessions from '../../../hooks/useStudentBookedSessions';
import BookedSessionsRow from '../../../components/table-rows/BookedSessionsRow';
import StudentsBookedMaterialsRow from '../../../components/table-rows/StudentsBookedMaterials';

const ViewAllStudyMaterials = () => {
    const [bookedSessions, isLoading, refetch] = useStudentBookedSessions()

    return (
        <Container>
            <Heading heading={'All Study Materials'} />
            {bookedSessions.length}
            <div className="overflow-x-auto">
                <table className="table table-zebra">
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
                        {bookedSessions.map((session, idx) => <StudentsBookedMaterialsRow
                            session={session}
                            refetch={refetch}
                            key={session._id}
                            idx={idx}
                        />)}
                    </tbody>
                </table>

            </div>
        </Container>
    );
};

export default ViewAllStudyMaterials;