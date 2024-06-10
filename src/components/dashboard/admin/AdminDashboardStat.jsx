import React from 'react';
import useGetQuery from '../../../hooks/useGetQuery';

const AdminDashboardStat = () => {
    const [activeSessionsIds, idsLoading] = useGetQuery('count-active-sessions-admin', '/api/admin/active-sessions')
    const [tutorEmails, tutorEmailsLoading] = useGetQuery('tutorEmails-count-admin', '/api/admin/count-tutors')
    const [studentEmails, studentEmailsLoading] = useGetQuery('studentEmails-count-admin', '/api/admin/count-students')

    console.log(tutorEmails);

    return (
        <div className="stats stats-vertical lg:stats-horizontal shadow w-full rounded-md mb-10">

            <div className="stat text-center">
                <div className="stat-title">Total Active Sessions</div>
                <div className="stat-value">{activeSessionsIds?.length}</div>
            </div>

            <div className="stat text-center">
                <div className="stat-title">Total Tutors</div>
                <div className="stat-value">{tutorEmails?.length}</div>
            </div>

            <div className="stat text-center">
                <div className="stat-title">Total Students</div>
                <div className="stat-value">{studentEmails?.length}</div>
            </div>

        </div>
    );
};

export default AdminDashboardStat;