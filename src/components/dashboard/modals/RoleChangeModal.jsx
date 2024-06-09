import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast, { } from "react-hot-toast";

const UpdateUserRoleModal = ({ setShowModal, role, user, refetch }) => {
    const [userRole, setUserRole] = useState(role)
    const axiosSecure = useAxiosSecure()
    const [submitting, setSubmitting] = useState(false)

    async function handleUpdateRole() {
        setSubmitting(true)
        const updateRole = { role: userRole }
        try {
            const { data } = await axiosSecure.patch(`/api/admin/users/update-role/${user._id}`, updateRole)
            console.log(data);
            if (data.modifiedCount > 0) {
                toast.success(`${user?.name}'s role updated as ${userRole}`)
            }
            setShowModal(false)
            refetch()
            setSubmitting(false)
        } catch (err) {
            console.error(err);
            toast.error(err.message)
            setSubmitting(false)
            setShowModal(false)
        }
    }

    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-20 z-50'>
            <div className='shadow-xl p-6 bg-base-100 w-full max-w-md rounded-md mx-auto relative'>
                <div>
                    <h2 className="text-xl mb-4">Update user's role</h2>
                    <select onChange={(e) => setUserRole(e.target.value)} defaultValue={userRole} className="block w-full select select-bordered">
                        <option value="student">Student</option>
                        <option value="tutor">Tutor</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="flex justify-center space-x-4 mt-8">
                    <button
                        onClick={handleUpdateRole}
                        disabled={submitting}
                        className="btn btn-sm btn-primary">
                        Update
                    </button>
                    <button
                        onClick={() => setShowModal(false)}
                        disabled={submitting}
                        className="btn btn-sm btn-error" >
                        Cancel
                    </button>
                </div>
                {submitting && <span className='loading loading-spinner absolute top-1/2 left-1/2'></span>}
            </div>
        </div>
    );
};

export default UpdateUserRoleModal;