import React from 'react';
import { Link } from 'react-router-dom';

const StudentsBookedMaterialsRow = ({ session, idx }) => {
    return (
        <tr>
            <td>{idx + 1}</td>
            <td>{session?.session_title}</td>
            <td>{session?.tutor_name}</td>
            <td>
                <Link to={`/dashboard/student/session-materials/${session?.sessionId}`}><button className='btn btn-sm btn-primary'>View Materials</button></Link>
            </td>
        </tr>
    );
};

export default StudentsBookedMaterialsRow;