import React, { useEffect } from 'react';
import { MdMenuOpen } from "react-icons/md";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/dashboard/sidebar/Sidebar';
import useRole from '../hooks/useRole';
import Container from '../components/shared/Container';


const DashboardRoutes = () => {
    const [role, isLoading] = useRole()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (role === 'student' && location.pathname === '/dashboard') {
            // console.log(';hello');
            navigate('/dashboard/view-booked-sessions', { replace: true })
        }
        if (role === 'tutor' && location.pathname === '/dashboard') {
            // console.log(';hello');
            navigate('/dashboard/tutor', { replace: true })
        }
        if (role === 'admin' && location.pathname === '/dashboard') {
            // console.log(';hello');
            navigate('/dashboard/admin', { replace: true })
        }
    }, [location])

    if (isLoading) {
        <span>Loading</span>
    }
    return (
        <div className="drawer sm:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">
                <div className="p-4 pb-0 sm:hidden">
                    <label htmlFor="my-drawer-2" className="btn btn-sm btn-neutral drawer-button "><MdMenuOpen size={20} /></label>
                </div>
                {/* Page content here */}
                {/* dashboard navbar problem create korle ekhane asbo */}
                <div className='relative'>
                    <Container>
                        <Outlet />
                    </Container>
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <Sidebar />
            </div>
        </div>
    );
};

export default DashboardRoutes;