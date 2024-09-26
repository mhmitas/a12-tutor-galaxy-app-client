import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { Link, NavLink } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const NavbarConditionalSection = () => {
    const { user, authLoading, signOutUser } = useAuth()

    function handleSignOut() {
        signOutUser()
    }

    return (
        <>
            {authLoading ? <span className=''>Loading...</span> :
                user ?
                    <div className="dropdown dropdown-end">
                        {/* Profile image section */}
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div title={user?.displayName} className="w-10 rounded-full">
                                <img alt={user?.displayName && user.displayName} src={user?.photoURL ? user.photoURL : "https://i.ibb.co/tY0hxsg/default-profile.jpg"} width={40} height={40}
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
                        <Link to="/sign-up" className="btn btn-sm btn-outline">Sign up</Link>
                    </div>
            }
        </>
    );
};

export default NavbarConditionalSection;