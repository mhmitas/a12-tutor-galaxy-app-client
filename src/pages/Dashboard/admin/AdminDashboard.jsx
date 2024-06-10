import React, { useState } from 'react';
import DashboardNavbar from '../../../components/dashboard/DashboardNavbar';
import AdminDashboardStat from '../../../components/dashboard/admin/AdminDashboardStat';
import { FaPlus } from 'react-icons/fa';
import AdminAnnouncementModal from '../../../components/dashboard/modals/AdminAnnouncementModal';

const AdminDashboard = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [showAnnouncementModal, setShowAnnouncementModal] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log({ title, message });
        // Reset form fields
        setTitle('');
        setMessage('');
    };

    return (
        <div>
            <header className='sm:block hidden'>
                <DashboardNavbar />
            </header>
            <div className='my-10'>
                <button onClick={() => setShowAnnouncementModal(true)} className='btn btn-info'>Create Announcement <FaPlus size={16} /></button>
            </div>
            <AdminDashboardStat />
            {/*  */}
            {showAnnouncementModal && <AdminAnnouncementModal setShowModal={setShowAnnouncementModal} />}
        </div >
    );
};

export default AdminDashboard;