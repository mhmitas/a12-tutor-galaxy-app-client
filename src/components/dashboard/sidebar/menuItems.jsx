import { NavLink } from "react-router-dom";

const studentMenuItems = <>
    <li><NavLink>View booked sessions</NavLink></li>
    <li><NavLink>Create note</NavLink></li>
    <li><NavLink>Manage notes</NavLink></li>
    <li><NavLink>Study materials</NavLink></li>
</>

const tutorMenuItems = <>
    <li><NavLink to="/dashboard/create-study-session">Create a session</NavLink></li>
    <li><NavLink to="/dashboard/all-study-sessions">View all sessions</NavLink></li>
    <li><NavLink>Upload materials</NavLink></li>
    <li><NavLink>View all materials</NavLink></li>
    <li><NavLink>View all notes</NavLink></li>
</>

export { studentMenuItems, tutorMenuItems }