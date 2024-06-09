import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { BiSolidMessageDetail } from "react-icons/bi";
import FeedbackAndRequestModal from '../dashboard/modals/FeedbackAndRequestModal';

const TutorsSessionsTableRow = ({ session, idx, refetch, handleDelete }) => {
    const { session_title, status } = session;
    const [showModal, setShowModal] = useState(false)

    function handleReasonModal() {
        setShowModal(true)
    }

    return (
        <>
            <tr>
                <th>{idx + 1}</th>
                <td>{session_title?.slice(0, 30)}</td>
                <td>
                    <span className={`badge badge-primary ${status === 'pending' ?
                        'badge-primary' :
                        status === 'rejected' ?
                            'badge-error' :
                            'badge-success'
                        }`}>{status}</span>

                </td>
                <td>{status === 'rejected' &&
                    <button title='Click to see detail' onClick={handleReasonModal} className='btn btn-ghost btn-xs'><BiSolidMessageDetail size={20} /></button>
                }
                    {showModal && <FeedbackAndRequestModal setShowModal={setShowModal} sessionId={session?._id} session={session} refetch={refetch} />}
                </td>
                <td>
                    {session?.status !== 'approved' &&
                        <div className='flex items-center gap-2'>
                            <button className='btn btn-xs btn-ghost'><FaEdit size={14} /></button>
                            <button onClick={() => handleDelete(session?._id)} className='btn btn-xs btn-ghost'><FaTrashAlt className='' /></button>
                        </div>
                    }
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