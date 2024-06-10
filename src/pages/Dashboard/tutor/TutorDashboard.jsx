import React from 'react';
import useAuth from '../../../hooks/useAuth';
import DashboardNavbar from '../../../components/dashboard/DashboardNavbar';
import TutorStats from '../../../components/dashboard/student-booked-session-detail/TutorDashboard/TutorStats';
import TutorActiveSessionsSection from '../../../components/dashboard/tutor/TutorActiveSessionsSection';

const TutorDashboard = () => {
    const { user } = useAuth()

    return (
        <div>
            <header className='sm:block hidden'>
                <DashboardNavbar />
            </header>
            <main className='my-10'>
                <TutorStats />
                <div>
                    <TutorActiveSessionsSection />
                </div>
            </main>
        </div>
    );
};

export default TutorDashboard;
