import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { BiSolidMessageDetail } from "react-icons/bi";
import FeedbackAndRequestModal from '../dashboard/modals/FeedbackAndRequestModal';
import UpdateStudySessionModal from '../dashboard/modals/UpdateStudySessionModal';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const TutorsSessionsTableRow = ({ session, idx, refetch, handleDelete }) => {
    const { session_title, status } = session;
    const [showModal, setShowModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const axiosSecure = useAxiosSecure()

    function handleReasonModal() {
        setShowModal(true)
    }

    async function handleUpdate(updateData) {
        try {
            const { data } = await axiosSecure.patch(`/api/tutor/study-sessions/update/${session?._id}`, updateData)
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
        <>
            <tr>
                <th>{idx + 1}</th>
                <td>{session_title?.slice(0, 30)}{session_title?.length > 30 && '...'}</td>
                <td>
                    <span className={`badge badge-primary ${status === 'pending' ?
                        'badge-primary' :
                        status === 'rejected' ?
                            'badge-error' :
                            'badge-success'
                        }`}>{status}</span>

                </td>
                <td>{status === 'rejected' &&
                    <button title='Click to see detail' onClick={handleReasonModal} className='btn btn-ghost btn-xs'><BiSolidMessageDetail size={17} /></button>
                }
                    {showModal && <FeedbackAndRequestModal setShowModal={setShowModal} sessionId={session?._id} session={session} refetch={refetch} />}
                </td>
                <td>
                    <div className='flex items-center gap-2'>
                        <button disabled={session?.status === 'approved'} onClick={() => setShowUpdateModal(true)} className='btn btn-xs btn-ghost'><FaEdit size={14} /></button>
                        <button disabled={session?.status === 'approved'} onClick={() => handleDelete(session?._id)} className='btn btn-xs btn-ghost'><FaTrashAlt className='' /></button>
                    </div>
                    {/* {session?.status !== 'approved' &&
                        <div className='flex items-center gap-2'>
                            <button onClick={() => setShowUpdateModal(true)} className='btn btn-xs btn-ghost'><FaEdit size={14} /></button>
                            <button onClick={() => handleDelete(session?._id)} className='btn btn-xs btn-ghost'><FaTrashAlt className='' /></button>
                        </div>
                    } */}
                    {showUpdateModal && <UpdateStudySessionModal session={session} setShowModal={setShowUpdateModal} handleUpdate={handleUpdate} />}
                </td>
            </tr>
        </>
    );
};

export default TutorsSessionsTableRow;

// .replace(/\b\w/g, match => match.toUpperCase())

/*
{status === 'rejected' && <button className='btn btn-primary btn-xs'>Send new request</button>}
*/