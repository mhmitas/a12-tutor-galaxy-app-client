import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AllStudySessionsAdminRow = ({ session, idx }) => {
    const { session_title, status, tutor_name, tutor_email } = session

    function handleStatusChange(e) {
        console.log(e.target);
    }

    return (
        <tr>
            <td>{idx}</td>
            <td>{session_title}</td>
            <td><Link className='link link-primary' to={`/detail/${session?._id}`}>View</Link></td>
            <td>
                <p>{tutor_name}</p>
                <p className='text-xs'>{tutor_email}</p>
            </td>
            <td>
                <td>
                    <span className={`badge badge-primary ${status === 'pending' ?
                        'badge-primary' :
                        status === 'rejected' ?
                            'badge-warning' :
                            'badge-success'
                        }`}>{status}</span>

                </td>
            </td>
            <td>
                <div className="dropdown dropdown-bottom">
                    <div tabIndex={0} role="button"
                        className={`btn btn-sm m-1 ${status === 'approved' ? 'btn-success' :
                            status === 'pending' ? 'btn-primary' :
                                status === 'rejected' ? 'btn-error' : ''
                            }`}>{status}</div>
                    <ul tabIndex={0}
                        className={`dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box`}>
                        <li><button onClick={handleStatusChange}>Pending</button></li>
                        <li><button onClick={handleStatusChange}>Conform</button></li>
                        <li><button onClick={handleStatusChange}>Completed</button></li>
                    </ul>
                </div>
            </td>
        </tr>
    );
};

export default AllStudySessionsAdminRow;




/*
<div className=" ">
    <div onClick={() => setShowMenu(!showMenu)} tabIndex={0} role="button" className={`btn btn-sm m-1 ${status === 'approved' ? 'btn-success' :
        status === 'rejected' ? 'btn-info' :
            status === 'pending' ? 'btn-warning' : ''
        }`}>Click</div>
    {showMenu &&
        <ul tabIndex={0} className="dropdown-content absolute z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
        </ul>
    }
</div>
*/