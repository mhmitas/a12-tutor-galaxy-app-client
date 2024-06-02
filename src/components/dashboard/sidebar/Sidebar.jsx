import React from 'react';
import { RxCross1 } from "react-icons/rx";
import { FaBook, FaCalendar, FaHome, FaList, FaRegCalendarCheck, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom'
import { MdMenuBook, MdReviews } from "react-icons/md";
import { ImSpoonKnife } from "react-icons/im";
import { studentMenuItems } from './menuItems';
// import { useQuery } from '@tanstack/react-query';


const Sidebar = () => {
    // const { user } = useAuth()
    let isAdmin = true;
    // const [admin, isPending] = useAdmin()
    // const { user } = useAuth()
    // const { data: admin, isPending } = useQuery({
    //     queryKey: ['isAdmin', user],
    //     queryFn: async () => {
    //         const res = await axiosInstance.get(`/users/admin/${user?.uid}`)
    //         console.log(res.data);
    //         return res.data.admin
    //     }
    // })

    return (
        <ul className="menu p-4 lg:w-64 w-60 min-h-full bg-base-300 text-base-content">

            {/* Sidebar content here */}
            <label
                htmlFor="my-drawer-2" className="btn btn-sm btn-ghost absolute top-4 right-4 z-10 sm:hidden"><RxCross1 size={16}
                />
            </label>
            <Link to="/" className="lg:text-3xl  text-2xl p-4 font-semibold cursor-pointer">Tutor Galaxy</Link>
            {
                <>
                    <li><NavLink to="/dashboard/create-study-session">Create Study Session</NavLink></li>
                </>
            }

            <div className="divider divider-neutral"></div>
            {/* SHARED Navlinks */}
            <li>
                <NavLink to="/"><FaHome className='text-lg' />home</NavLink>
            </li>
            <li>
                <NavLink to="/menu"><MdMenuBook className='text-lg' />menu</NavLink>
            </li>
        </ul>
    );
};

export default Sidebar;

/*
<li className='hidden'>
    <div className='flex items-center'>
        <div className="avatar">
            <div className="w-9 rounded-full">
                <img src={user?.photoURL} alt="" />
            </div>
        </div>
        <div className='flex flex-col'>
            <span>{user?.displayName}</span>
            <span className='text-xs'>{user?.email}</span>
        </div>
    </div>
</li>
*/