import React from 'react';
import { format } from "date-fns";
import { Link } from 'react-router-dom';

const BookedSessionsRow = ({ session, idx }) => {
    const { session_title, tutor_name, classDuration } = session

    return (
        <tr>
            <td>{idx + 1}</td>
            <td>{session_title}</td>
            <td>{tutor_name}</td>
            <td>
                <span>{classDuration?.startDate && format(new Date(classDuration?.startDate), 'dd MMM yyyy')}</span> -
                <span> {classDuration?.endDate && format(new Date(classDuration?.endDate), 'dd MMM yyyy')}</span>
            </td>
            <td>
                <Link to={`/dashboard/booked-session-detail/${session?.sessionId}`}><button className='btn btn-sm btn-primary'>View Detail</button></Link>
            </td>
        </tr>
    );
};

export default BookedSessionsRow;

/*
<p><strong>Class Start Date:</strong> {format(new Date(classDuration?.startDate), 'dd MMM yyyy')}</p>
<p><strong>Class End Date:</strong> {format(Date(classDuration?.startDate), 'dd MMM yyyy</p>
*/