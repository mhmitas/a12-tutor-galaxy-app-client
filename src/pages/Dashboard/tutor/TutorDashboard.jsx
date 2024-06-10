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


// const ActiveSessionCard = ({ session }) => {
//     console.log(session);
//     return (
//         <div className="card card-side bg-base-100 shadow-xl">
//             <figure><img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" /></figure>
//             <div className="card-body">
//                 <h2 className="card-title">{session?.session_title}</h2>
//                 <p>Click the button to watch on Jetflix app.</p>
//                 <div className="card-actions justify-end">
//                     <button className="btn btn-primary">Watch</button>
//                 </div>
//             </div>
//         </div>
//     )
// }