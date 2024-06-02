import React from 'react';

const UploadMaterialRow = ({ session, idx }) => {
    const { session_title, thumbnail_image, tutor_email, tutor_name, registrationDuration, registration_fee, classDuration, status } = session;

    return (
        <>
            <tr>
                <th>{idx + 1}</th>
                <td>{session_title}</td>
                <td></td>
                <td>
                    <button className='btn btn-sm btn-primary'>Upload materials</button>
                </td>
            </tr>
        </>
    );
};

export default UploadMaterialRow;