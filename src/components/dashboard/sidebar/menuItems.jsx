import { NavLink } from "react-router-dom"
import { MdMenuBook, MdReviews } from "react-icons/md";
import { ImSpoonKnife } from "react-icons/im";
import { FaBook, FaCalendar, FaHome, FaList, FaPlus, FaRegCalendarCheck, FaShoppingCart, FaUsers } from 'react-icons/fa';

const studentMenuItems = <>
    <li>
        <NavLink to="/dashboard/user-home"><FaHome className='text-lg' />My Home</NavLink>
    </li>
    <li>
        <NavLink to="/dashboard/reservation"><FaCalendar className='text-lg' />Reservation</NavLink>
    </li>
    <li>
        <NavLink to="/dashboard/cart"><FaShoppingCart className='text-lg' /> My Cart</NavLink>
    </li>
    <li>
        <NavLink to="/dashboard/review"><MdReviews className='text-lg' />Add Review</NavLink>
    </li>
    <li>
        <NavLink to="/dashboard/review"><FaRegCalendarCheck className='text-lg' />My Booking</NavLink>
    </li>
</>

const adminMenuItems = <>
    <li>
        <NavLink to="/dashboard/admin-home"><FaHome className='text-lg' />Admin Home</NavLink>
    </li>
    <li>
        <NavLink to="/dashboard/add-items"><ImSpoonKnife className='text-lg' />Add Items</NavLink>
    </li>
    <li>
        <NavLink to="/dashboard/manage-items"><FaList className='text-lg' />Manage Items</NavLink>
    </li>
    <li>
        <NavLink to="/dashboard/manage-bookings"><FaBook className='text-lg' />Manage Bookings</NavLink>
    </li>
    <li>
        <NavLink to="/dashboard/manage-users"><FaUsers className='text-lg' />Manage Users</NavLink>
    </li>
</>

export { studentMenuItems, adminMenuItems }