import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ApprovalModal from '../dashboard/modals/ApproveModal';
import RejectSessionModal from '../dashboard/modals/RejectModal';

const AllStudySessionsAdminRow = ({ session, idx, refetch }) => {
    const [showModal, setShowModal] = useState(false)
    const [showRejectModal, setShowRejectModal] = useState(false)
    const { session_title, status, tutor_name, tutor_email } = session

    function handleApprove() {
        setShowModal(true)
    }
    function handleReject() {
        setShowRejectModal(true)
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
                <span className={`badge badge-primary ${status === 'pending' ?
                    'badge-primary' :
                    status === 'rejected' ?
                        'badge-error' :
                        'badge-success'
                    }`}>{status}</span>
            </td>
            <td>
                <div className="dropdown dropdown-bottom">
                    <div tabIndex={0} role="button"
                        className={`btn btn-sm m-1 ${status === 'approved' ? 'btn-success' :
                            status === 'pending' ?
                                'btn-primary' :
                                status === 'rejected' ?
                                    'btn-error' : ''
                            }`}
                    >{status}</div>
                    <ul tabIndex={0}
                        className={`dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box`}>
                        <li><button onClick={handleApprove}>Approve</button></li>
                        <li><button onClick={handleReject}>Reject</button></li>
                    </ul>
                </div>
                {showModal && <ApprovalModal setShowModal={setShowModal} refetch={refetch} session={session} />}
                {showRejectModal && <RejectSessionModal setShowRejectModal={setShowRejectModal} refetch={refetch} session={session} />}
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