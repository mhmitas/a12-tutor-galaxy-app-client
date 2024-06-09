import React from 'react';
import useAuth from '../../hooks/useAuth';
import { IoIosNotifications } from "react-icons/io";

const DashboardNavbar = () => {
    const { user } = useAuth()

    return (
        <div className='h-16'>
            <div className="navbar bg-base-100 absolute left-0 right-0 top-0">
                <div className="flex-none gap-2">

                    <div role="button" className="btn btn-ghost btn-circle avatar ">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                        </div>
                    </div>
                    <h2 className='text-lg font-semibold'>Hi! {user?.displayName?.split(' ')[0]}</h2>
                </div>
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl"></a>
                </div>
                <div className="form-control">
                    <input readOnly type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>
                <div title='Notifications' className='text-warning btn btn-circle btn-ghost'>
                    <IoIosNotifications size={28} />
                </div>
            </div>
        </div>
    );
};

export default DashboardNavbar;