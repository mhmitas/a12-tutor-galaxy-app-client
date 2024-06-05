import { NavLink } from "react-router-dom";

const studentMenuItems = <>
    <li><NavLink to="/dashboard/view-booked-sessions">View booked sessions</NavLink></li>
    <li><NavLink to="/dashboard/create-note">Create note</NavLink></li>
    <li><NavLink to="/dashboard/manage-notes">Manage notes</NavLink></li>
    <li><NavLink to="/dashboard/student/all-materials">Study materials</NavLink></li>
</>

const tutorMenuItems = <>
    <li><NavLink to="/dashboard/create-study-session">Create a session</NavLink></li>
    <li><NavLink to="/dashboard/all-study-sessions">View all sessions</NavLink></li>
    <li><NavLink to="/dashboard/upload-materials">Upload materials</NavLink></li>
    <li><NavLink to="/dashboard/view-all-materials">View all materials</NavLink></li>
    {/* <li><NavLink>View all notes</NavLink></li> */}
</>


const adminMenuItems = <>
    {/* <li><NavLink>All users</NavLink></li> */}
    <li><NavLink to="/dashboard/admin/manage-users">Manage users</NavLink></li>
    <li><NavLink to="/dashboard/admin/all-study-sessions">All study sessions</NavLink></li>
    <li><NavLink to="/dashboard/admin/all-study-materials">All materials</NavLink></li>
</>


export { studentMenuItems, tutorMenuItems, adminMenuItems }