import React, { useState } from 'react';
import ViewMaterialsModal from '../dashboard/modals/ViewMaterialsModal';
import UpdateMaterialModal from '../dashboard/modals/UpdateMateralModal';

const ViewAllMaterialsAdminRow = ({ material, idx, refetch }) => {
    const { session_title, materialTitle, tutor_email, tutor_name } = material;
    const [showModal, setShowModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
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
                <button onClick={() => setShowModal(true)} className='btn btn-sm btn-neutral'>View</button>
                {showModal && <ViewMaterialsModal material={material} setShowModal={setShowModal} refetch={refetch} setShowUpdateModal={setShowUpdateModal} />}
                {showUpdateModal && <UpdateMaterialModal material={material} setShowModal={setShowUpdateModal} refetch={refetch} />}
            </td>
        </tr>
    );
};

export default ViewAllMaterialsAdminRow;