import React, { useState } from 'react';
import UpdateMaterialModal from '../modals/UpdateMateralModal';
import { FaEdit, FaTrashAlt } from "react-icons/fa";


const EditStudyMaterial = ({ material, refetch }) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false)

    async function handleDelete(id) {
        try {
            const ask = await askConfirm('Are you sure? You want to delete this session')
            if (!ask) { return };
            const { data } = await axiosSecure.delete(`/material/delete-by-admin/${id}`)
            console.log(data);
            toast.success('Successfully Deleted')
            refetch()
        } catch (err) {
            console.error(err);
            toast.error(err.message)
        }
    }

    return (
        <>
            <div className="card-actions justify-center mt-4 gap-3">
                <button onClick={() => {
                    setShowUpdateModal(true)
                    // setShowModal(false)
                }} className='btn btn-sm btn-neutral'><FaEdit size={20} /></button>
                <button onClick={() => handleDelete(material._id)} className='btn btn-sm btn-neutral'><FaTrashAlt size={20} /></button>
            </div>
            {showUpdateModal && <UpdateMaterialModal setShowModal={setShowUpdateModal} material={material} refetch={refetch} />}
        </>
    );
};

export default EditStudyMaterial;