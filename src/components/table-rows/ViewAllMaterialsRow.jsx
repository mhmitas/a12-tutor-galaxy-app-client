import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import UpdateMaterialModal from '../dashboard/modals/UpdateMateralModal';

const ViewAllMaterialsRow = ({ material, handleDelete, refetch }) => {
    const [showModal, setShowModal] = useState(false)


    return (
        <div className="card card-compact max-w-96 bg-base-100 shadow-lg rounded-md">
            <figure><img src={material?.imageUrl} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title">{material.session_title}</h2>
                <div className='overflow-x-hidden'>
                    <p className='font-semibold mb-2'>Topic: <span className='underline'>{material?.materialTitle}</span></p>
                    <div>Google Drive Link: <a className='link link-primary' target='_black' href={material?.driveLink}>Click</a></div>
                    {material?.imageUrl && <>
                        Image: <a className='link link-primary' target='_black' href={material?.imageUrl}>Click</a>
                    </>}
                </div>
                <div className="card-actions justify-end mt-2">
                    <button onClick={() => setShowModal(true)} className='btn btn-sm btn-ghost'><FaEdit size={20} /></button>
                    <button onClick={() => handleDelete(material._id)} className='btn btn-sm btn-ghost'><FaTrashAlt className='text-lg' /></button>
                </div>
            </div>
            {showModal && <UpdateMaterialModal material={material} setShowModal={setShowModal} refetch={refetch} />}
        </div>
    );
};

export default ViewAllMaterialsRow;