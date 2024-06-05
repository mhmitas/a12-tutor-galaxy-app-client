import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const UpdateUserRoleModal = ({ setShowModal, role, user }) => {
    const [userRole, setUserRole] = useState(role)
    const axiosSecure = useAxiosSecure()

    function handleUpdateRole() {
        const updateRole = { role: userRole }
        try {
            const { data } = axiosSecure.patch('/users/update-role')
        } catch (err) {

        }
    }

    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-20 z-50'>
            <div className='shadow-xl p-6 bg-base-100 w-full max-w-md rounded-md mx-auto'>
                <div>
                    <h2 className="text-xl mb-4">Update user role</h2>
                    <select defaultValue={userRole} className="block w-full select select-bordered">
                        <option value="student">Student</option>
                        <option value="tutor">Tutor</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="flex justify-center space-x-4 mt-8">
                    <button
                        className="btn btn-primary">
                        Update
                    </button>
                    <button
                        onClick={() => setShowModal(false)}
                        className="btn btn-error" >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserRoleModal;