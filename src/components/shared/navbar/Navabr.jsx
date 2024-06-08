import React from 'react';
import { navLinks } from './NavLinks';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
    const { user, authLoading, signOutUser } = useAuth()

    function handleSignOut() {
        signOutUser()
    }

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-circle btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul
                        tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        {navLinks}
                    </ul>
                </div>
                <NavLink to="/" className="btn btn-ghost text-xl md:text-2xl">TutorGalaxy</NavLink>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                <div>
                    {/* login logout */}
                    {authLoading ? <span className=''>Loading...</span> :
                        user ?
                            <div className="dropdown dropdown-end">
                                {/* Profile image section */}
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div title={user?.displayName} className="w-10 rounded-full">
                                        <img alt={user?.displayName && user.displayName} src={user?.photoURL ? user.photoURL : "https://i.ibb.co/tY0hxsg/default-profile.jpg"}
                                        />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="mt-3 z-[1] p-2 menu menu-sm dropdown-content bg-base-100 rounded-md w-52 shadow-xl">
                                    <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
                                    <div className='divider my-0 py-0'></div>
                                    <li><span onClick={handleSignOut}><FaSignOutAlt /> Sign out</span></li>
                                </ul>
                            </div>
                            :
                            <div className='flex gap-3'>
                                <Link to="/sign-in" className="btn btn-sm btn-outline">Sign in</Link>
                                {/* <Link to="/sign-up" className="btn btn-sm btn-outline">Sign up</Link> */}
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;