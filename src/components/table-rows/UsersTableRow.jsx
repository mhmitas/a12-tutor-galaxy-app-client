import React, { useState } from 'react';
import UpdateUserRoleModal from '../dashboard/modals/RoleChangeModal';

const UsersTableRow = ({ user, idx }) => {
    const { name, email, role } = user;
    const [showRoleChangeModal, setShowRoleChangeModal] = useState(false)
    function handleRoleChange(r) {
        console.log(r);
    }

    return (
        <tr>
            <td>{idx + 1}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td><span className='badge badge-primary'>{role}</span></td>
            <td>
                <button onClick={() => setShowRoleChangeModal(true)} className='btn-primary btn btn-sm'>Change Role</button>
                {showRoleChangeModal && <UpdateUserRoleModal role={role} setShowModal={setShowRoleChangeModal} user={user} />}
            </td>
        </tr>
    );
};

export default UsersTableRow;