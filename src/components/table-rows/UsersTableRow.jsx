import React, { useState } from 'react';
import UpdateUserRoleModal from '../dashboard/modals/RoleChangeModal';
import useAuth from '../../hooks/useAuth';

const UsersTableRow = ({ user, idx, refetch }) => {
    const { user: currentUser } = useAuth()
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
                <button onClick={() => setShowRoleChangeModal(true)} disabled={currentUser?.email === user?.email} className='btn-primary btn btn-sm'>Change Role</button>
                {showRoleChangeModal && <UpdateUserRoleModal role={role} setShowModal={setShowRoleChangeModal} user={user} refetch={refetch} />}
            </td>
        </tr>
    );
};

export default UsersTableRow;