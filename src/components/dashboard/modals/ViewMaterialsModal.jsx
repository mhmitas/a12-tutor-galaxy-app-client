import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import askConfirm from '../../modals/confirm-modal/AskConfirm';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const ViewMaterialsModal = ({ material, setShowModal, refetch, setShowUpdateModal }) => {
    const axiosSecure = useAxiosSecure()
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setShowModal(false);
        }
    };

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
        <div onClick={handleOverlayClick} className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-10 z-50'>
            <div className='card bg-base-100 rounded-md shadow max-w-sm max-h-screen overflow-y-auto'>
                <figure><img className='max-w-sm ' src={material?.imageUrl} alt="" /></figure>
                <div className="card-body">
                    <div className=''>
                        <h2 className='card-title text-lg mb-2'>Topic: {material?.materialTitle?.slice(0, 55)}</h2>
                        <div>Google Drive Link: <a className='link link-primary' target='_black' href={material?.driveLink}>Click</a></div>
                    </div>
                    <div className="card-actions justify-center mt-4 gap-3">
                        <button onClick={() => {
                            setShowUpdateModal(true)
                            // setShowModal(false)
                        }} className='btn btn-sm btn-neutral'><FaEdit size={20} /></button>
                        <button onClick={() => handleDelete(material._id)} className='btn btn-sm btn-neutral'><FaTrashAlt size={20} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewMaterialsModal;