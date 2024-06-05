import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ApprovalModal from '../dashboard/modals/ApproveModal';
import RejectSessionModal from '../dashboard/modals/RejectModal';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import askConfirm from '../modals/confirm-modal/AskConfirm';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import UpdateStudySession from '../../pages/Dashboard/shared/UpdateStudySession';
import UpdateStudySessionModal from '../dashboard/modals/UpdateStudySessionModal';

const AllStudySessionsAdminRow = ({ session, idx, refetch }) => {
    const axiosSecure = useAxiosSecure()
    // approval modal state
    const [showModal, setShowModal] = useState(false)
    // rejection modal state
    const [showRejectModal, setShowRejectModal] = useState(false)
    // update by admin modal state
    const [showUpdateModal, setShowUpdateModal] = useState(false)

    const { session_title, status, tutor_name, tutor_email } = session

    function handleApprove() {
        setShowModal(true)
    }
    function handleReject() {
        setShowRejectModal(true)
    }
    async function handleDelete(id) {
        try {
            const ask = await askConfirm('Are you sure? You want to delete this session')
            if (!ask) { return };
            const { data } = await axiosSecure.delete(`/study-sessions/delete-by-admin/${id}`)
            console.log(data);
            toast.success('Successfully Deleted')
            refetch()
        } catch (err) {
            console.error(err);
            toast.error(err.message)
        }
    }

    async function handleUpdate(updateData) {
        // console.log(updateData);
        try {
            const { data } = await axiosSecure.patch(`/study-session/update-by-admin/${session?._id}`, updateData)
            console.log(data);
            if (data?.modifiedCount > 0) {
                toast.success('Session updated successfully')
            }
            setShowUpdateModal(false)
            refetch()
        } catch (err) {
            console.error(err);
            toast.error(err.message)
            setShowUpdateModal(false)
        }

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
                <div className="dropdown dropdown-bottom">
                    <div tabIndex={0} role="button"
                        className={`btn btn-sm m-1 ${status === 'approved' ? 'btn-success' :
                            status === 'pending' ?
                                'btn-primary' :
                                status === 'rejected' ?
                                    'btn-error' : ''
                            }`}
                    >{status.replace(/\b\w/g, match => match.toUpperCase())}</div>
                    <ul tabIndex={0}
                        className={`dropdown-content z-50 menu p-2 shadow bg-base-300 rounded-box `}>
                        <li><button onClick={handleApprove}>Approve</button></li>
                        <li><button onClick={handleReject}>Reject</button></li>
                    </ul>
                </div>
                {showModal && <ApprovalModal setShowModal={setShowModal} refetch={refetch} session={session} />}
                {showRejectModal && <RejectSessionModal setShowRejectModal={setShowRejectModal} refetch={refetch} session={session} />}
            </td>
            <td>
                {status === 'approved' &&
                    <div className='flex items-center gap-2'>
                        <button onClick={() => setShowUpdateModal(true)} className='btn btn-xs btn-ghost'><FaEdit size={16} /></button>
                        <button onClick={() => handleDelete(session._id)} className='btn btn-xs btn-ghost'><FaTrashAlt size={15} /></button>
                    </div>
                }
                {showUpdateModal && <UpdateStudySessionModal setShowModal={setShowUpdateModal} session={session} handleUpdate={handleUpdate} />}
            </td>
        </tr>
    );
};

export default AllStudySessionsAdminRow;



