import React from 'react';
import useAuth from '../../../hooks/useAuth';
import DashboardNavbar from '../../../components/dashboard/DashboardNavbar';
import useGetQuery from '../../../hooks/useGetQuery';
import TutorStats from '../../../components/dashboard/student-booked-session-detail/TutorDashboard/TutorStats';

const TutorDashboard = () => {
    const { user } = useAuth()

    // ToDo: This method must be changed
    const [sessions, sessionsLoading] = useGetQuery('count-active-sessions', `/study-sessions/tutor/${user?.email}?status=approved`)

    return (
        <div>
            <header className='sm:block hidden'>
                <DashboardNavbar />
            </header>
            <main className='my-6'>
                <div>
                    <h3>Active Sessions: {sessions.length}</h3>
                    <div>

                    </div>
                </div>
                <TutorStats />
            </main>
        </div>
    );
};

export default TutorDashboard;