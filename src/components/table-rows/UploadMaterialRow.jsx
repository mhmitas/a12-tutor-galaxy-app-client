import React, { useState } from 'react';
import UploadMaterialsModal from '../dashboard/modals/UploadMaterialsModal';

const UploadMaterialRow = ({ session, idx }) => {
    const { session_title, } = session;
    const [showModal, setShowModal] = useState(false)


    return (
        <>
            <tr>
                <th>{idx + 1}</th>
                <td>{session_title}</td>
                <td>
                    <button onClick={() => setShowModal(true)} className='btn btn-sm btn-primary'>Upload materials</button>
                    {showModal && <UploadMaterialsModal setShowModal={setShowModal} session={session} />}
                </td>
            </tr>
        </>
    );
};

export default UploadMaterialRow;

//  thumbnail_image, tutor_email, tutor_name, registrationDuration, registration_fee, classDuration, status 