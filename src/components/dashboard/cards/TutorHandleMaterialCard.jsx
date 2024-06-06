import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import askConfirm from '../../modals/confirm-modal/AskConfirm';
import toast from 'react-hot-toast';
import UpdateMaterialModal from '../modals/UpdateMateralModal';

const TutorHandleMaterialCard = ({ material, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const [showUpdateModal, setShowUpdateModal] = useState(false)

    async function handleDelete(id) {
        try {
            const ask = await askConfirm('Are you sure? You want to delete this session')
            if (!ask) { return };
            const { data } = await axiosSecure.delete(`/materials/delete/${id}`)
            console.log(data);
            toast.success('Successfully Deleted')
            refetch()
        } catch (err) {
            console.error(err);
            toast.error(err.message)
        }
    }

    return (
        <div className='card card-compact bg-base-100 rounded-md shadow'>
            <figure><img src={material?.imageUrl} alt="" /></figure>
            <div className="card-body">
                <h2 className='card-title text-lg mb-2'>Topic: {material?.materialTitle}</h2>
                <p>
                    Google Drive Link: <a className='link link-primary' target='_black' href={material?.driveLink}>Click</a>
                </p>
                <div className="card-actions justify-center mt-4 gap-3">
                    <button
                        onClick={() => setShowUpdateModal(true)}
                        className='btn btn-sm btn-neutral' >
                        <FaEdit size={17} />
                    </button>
                    <button onClick={() => handleDelete(material._id)} className='btn btn-sm btn-neutral'><FaTrashAlt size={15} /></button>
                </div>
            </div>
            {showUpdateModal && <UpdateMaterialModal setShowModal={setShowUpdateModal} material={material} refetch={refetch} updateEndPoint={'materials/update'} />}
        </div>
    );
};

export default TutorHandleMaterialCard;