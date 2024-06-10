import React, { useState } from 'react';
import DashboardNavbar from '../../../components/dashboard/DashboardNavbar';
import AdminDashboardStat from '../../../components/dashboard/admin/AdminDashboardStat';
import { TfiAnnouncement } from "react-icons/tfi";
import AdminAnnouncementModal from '../../../components/dashboard/modals/AdminAnnouncementModal';

const AdminDashboard = () => {
    const [showAnnouncementModal, setShowAnnouncementModal] = useState(false)


    return (
        <div>
            <header className='sm:block hidden'>
                <DashboardNavbar />
            </header>
            <div className='my-10'>
                <button onClick={() => setShowAnnouncementModal(true)} className='btn btn-success rounded-md'>Create Announcement <TfiAnnouncement size={20} /></button>
            </div>
            <AdminDashboardStat />
            {/*  */}
            {showAnnouncementModal && <AdminAnnouncementModal setShowModal={setShowAnnouncementModal} />}
        </div >
    );
};

export default AdminDashboard;