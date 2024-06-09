import React from 'react';
import useAuth from '../../../hooks/useAuth';
import DashboardNavbar from '../../../components/dashboard/DashboardNavbar';
import useGetQuery from '../../../hooks/useGetQuery';

const TutorDashboard = () => {
    const { user } = useAuth()

    // ToDo: This method must be changed
    const [sessions, sessionsLoading] = useGetQuery('count-active-sessions', `/study-sessions/tutor/${user?.email}?status=approved`)

    return (
        <div>
            <header className='sm:block hidden'>
                <DashboardNavbar />
            </header>
            <main>
                <div>
                    <h3>Active Sessions: {sessions.length}</h3>
                </div>
            </main>
        </div>
    );
};

export default TutorDashboard;