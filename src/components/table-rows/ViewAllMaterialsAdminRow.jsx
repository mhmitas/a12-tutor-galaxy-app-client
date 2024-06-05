import React from 'react';

const ViewAllMaterialsAdminRow = ({ material, idx }) => {
    const { session_title, materialTitle, tutor_email, tutor_name } = material

    return (
        <tr>
            <td>{idx + 1}</td>
            <td>{session_title}</td>
            <td>{materialTitle}</td>
            <td>
                <p>{tutor_name}</p>
                <p className='text-xs'>{tutor_email}</p>
            </td>
            <td>
                <button className='btn btn-sm btn-neutral'>View</button>
            </td>
            <td></td>
        </tr>
    );
};

export default ViewAllMaterialsAdminRow;