import { NavLink } from "react-router-dom";
import { FaPlusCircle, FaBookOpen, FaUpload, FaFolderOpen, FaChartPie, FaUsers } from 'react-icons/fa';

const studentMenuItems = <>
    <li><NavLink to="/dashboard/view-booked-sessions">View booked sessions</NavLink></li>
    <li><NavLink to="/dashboard/create-note">Create note</NavLink></li>
    <li><NavLink to="/dashboard/manage-notes">Manage notes</NavLink></li>
    <li><NavLink to="/dashboard/student/session-materials">Study materials</NavLink></li>
</>

const tutorMenuItems = <>
    <li><NavLink to="/dashboard/tutor" end><FaChartPie size={16} />Overview</NavLink></li>
    <li><NavLink to="/dashboard/create-study-session"><FaPlusCircle size={16} /> Create a session</NavLink></li>
    {/* <li><NavLink to="/dashboard/all-study-sessions"><FaBookOpen size={16} /> View all sessions</NavLink></li> */}
    <li><NavLink to="/dashboard/tutor/all-study-sessions"><FaBookOpen size={16} /> View all sessions</NavLink></li>
    <li><NavLink to="/dashboard/upload-materials"><FaUpload size={16} /> Upload materials</NavLink></li>
    <li><NavLink to="/dashboard/tutor/view-all-materials">   <FaFolderOpen size={16} />View all materials</NavLink></li>
    {/* <li><NavLink>View all notes</NavLink></li> */}
</>


const adminMenuItems = <>
    <li><NavLink to="/dashboard/admin" end><FaChartPie size={16} />Overview</NavLink></li>
    <li><NavLink to="/dashboard/admin/manage-users"><FaUsers size={16} />Manage users</NavLink></li>
    <li><NavLink to="/dashboard/admin/all-study-sessions"><FaBookOpen size={16} />All study sessions</NavLink></li>
    <li><NavLink to="/dashboard/admin/all-study-materials"><FaFolderOpen size={16} />All materials</NavLink></li>
</>


export { studentMenuItems, tutorMenuItems, adminMenuItems }