import React from 'react';
import { RxCross1 } from "react-icons/rx";
import { FaHome, FaRegUserCircle } from 'react-icons/fa';
import { MdOutlineLogout } from "react-icons/md";
import { Link, NavLink } from 'react-router-dom'
import { tutorMenuItems, studentMenuItems, adminMenuItems } from './menuItems';
import useRole from '../../../hooks/useRole';
import useAuth from '../../../hooks/useAuth';
// import { useQuery } from '@tanstack/react-query';


const Sidebar = () => {
    const { signOutUser } = useAuth()
    const [role, isLoading] = useRole()
    console.log(role);

    return (
        <ul className="menu p-4 lg:w-64 w-60 min-h-full bg-base-300 text-base-content ">

            {/* Sidebar content here */}
            <label
                htmlFor="my-drawer-2" className="btn btn-sm btn-ghost absolute top-4 right-4 z-10 sm:hidden"><RxCross1 size={16}
                />
            </label>
            <Link to="/" className="lg:text-3xl  text-2xl p-4 font-semibold cursor-pointer">TutorGalaxy</Link>
            {isLoading ?
                <span>Loading...</span>
                :
                <>
                    {role === 'student' && studentMenuItems}
                    {role === 'tutor' && tutorMenuItems}
                    {role === 'admin' && adminMenuItems}
                </>
            }

            {/* SHARED Navlinks */}
            {/* <div className="divider divider-neutral"></div> */}
            {/* <li><NavLink to="/"><FaHome className='text-lg' />home</NavLink></li> */}
            <div className='divider mt-auto'></div>
            <li><NavLink to={'/dashboard/profile'}><FaRegUserCircle size={17} />Profile</NavLink></li>
            <li className='mb-2'><button onClick={() => signOutUser()}><MdOutlineLogout size={20} />Sign out</button></li>
        </ul>
    );
};

export default Sidebar;