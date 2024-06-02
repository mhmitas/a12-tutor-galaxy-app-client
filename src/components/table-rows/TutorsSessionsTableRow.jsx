import React from 'react';
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

const TutorsSessionsTableRow = ({ session, idx }) => {
    const { session_title, thumbnail_image, tutor_email, tutor_name, registrationDuration, registration_fee, classDuration, status } = session;

    return (
        <>
            <tr>
                <th>{idx + 1}</th>
                <td>{session_title?.slice(0, 30)}</td>
                <td>
                    <span className={`badge badge-primary ${status === 'pending' ?
                        'badge-primary' :
                        status === 'rejected' ?
                            'badge-warning' :
                            'badge-success'
                        }`}>{status}</span>

                </td>
                <td></td>
                <td>
                    <div className='flex items-center gap-2'>
                        <span className='btn btn-xs btn-ghost'><FaEdit size={14} /></span>
                        <span className='btn btn-xs btn-ghost'><FaTrashAlt className='' /></span>
                    </div>
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