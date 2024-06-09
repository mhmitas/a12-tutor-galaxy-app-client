import React, { useEffect } from 'react';
import { MdMenuOpen } from "react-icons/md";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/dashboard/sidebar/Sidebar';
import useRole from '../hooks/useRole';


const DashboardRoutes = () => {
    const [role, isLoading] = useRole()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (role === 'student' && location.pathname === '/dashboard') {
            console.log(';hello');
            navigate('/dashboard/view-booked-sessions', { replace: true })
        }
        if (role === 'tutor' && location.pathname === '/dashboard') {
            console.log(';hello');
            navigate('/dashboard/tutor', { replace: true })
        }
    }, [location])

    if (isLoading) {
        <span>Loading</span>
    }
    return (
        <div className="drawer sm:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">
                <div className="p-4 sm:hidden">
                    <label htmlFor="my-drawer-2" className="btn btn-sm btn-neutral drawer-button "><MdMenuOpen size={20} /></label>
                </div>
                {/* Page content here */}
                <>
                    <Outlet />
                </>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <Sidebar />
            </div>
        </div>
    );
};

export default DashboardRoutes;