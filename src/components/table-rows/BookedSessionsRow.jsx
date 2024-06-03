import React from 'react';
import { format } from "date-fns";

const BookedSessionsRow = ({ session }) => {
    const { session_title, tutor_name, classDuration } = session
    return (
        <tr>
            <td>#</td>
            <td>{session_title}</td>
            <td>{tutor_name}</td>
            <td>
                <span>{format(new Date(classDuration?.startDate), 'dd MMM yyyy')}</span> -
                <span> {format(new Date(classDuration?.endDate), 'dd MMM yyyy')}</span>
            </td>
            <td>Action</td>
        </tr>
    );
};

export default BookedSessionsRow;

/*
<p><strong>Class Start Date:</strong> {format(new Date(classDuration?.startDate), 'dd MMM yyyy')}</p>
<p><strong>Class End Date:</strong> {format(Date(classDuration?.startDate), 'dd MMM yyyy</p>
*/