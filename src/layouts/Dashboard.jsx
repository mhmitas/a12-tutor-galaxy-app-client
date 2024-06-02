import React from 'react';
import { MdMenuOpen } from "react-icons/md";
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/sidebar/Sidebar';


const DashboardRoutes = () => {
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