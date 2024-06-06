import React, { useState } from 'react';
import uploadImage from '../../../utils/uploadImage';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const UpdateMaterialModal = ({ material, setShowModal, refetch, updateEndPoint }) => {
    const [uploading, setUploading] = useState(false)
    const axiosSecure = useAxiosSecure()
    // console.log(material);
    const { materialTitle, driveLink, imageUrl: oldImageUrl } = material

    async function handleSubmit(event) {
        event.preventDefault()
        const form = event.target;
        const materialTitle = form.material_title.value;
        const driveLink = form.drive_link.value;
        // upload image on imgBB
        let imageUrl = oldImageUrl;
        try {
            setUploading(true)
            // upload img in imgBB
            if (form.material_image?.files[0]) {
                const materialImage = form.material_image?.files[0]
                imageUrl = await uploadImage(materialImage)
            }
            const materials = {
                driveLink, imageUrl, materialTitle,
            }
            console.table(materials);
            // post on db;
            const result = await axiosSecure.patch(`/${updateEndPoint}/${material?._id}`, materials)
            console.log(result.data);
            if (result.data?.modifiedCount > 0) {
                toast.success("Material Updated")
            }
            setUploading(false);
            setShowModal(false)
            refetch()
        } catch (err) {
            console.log(err);
            setUploading(false);
            toast.error(err.message)
            setShowModal(false)
        }
    }


    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-10 z-50'>
            <div className='shadow-xl p-6 bg-base-100 w-full max-w-md rounded-md mx-auto relative overflow-y-auto max-h-[90vh]'>
                <div className='space-y-1'>
                    <h2 className="text-2xl">{material.session_title}</h2>
                    <p>Session Id: {material._id}</p>
                    <p>Email: {material.tutor_email}</p>
                </div>
                <div className='divider my-2'></div>
                <div>
                    <h2 className="text-xl mb-4">Upload Materials:</h2>
                    {/* Form */}
                    <form onSubmit={handleSubmit} className=''>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Title</span>
                            </label>
                            <input
                                name='material_title'
                                required
                                defaultValue={materialTitle}
                                className='input input-bordered '
                                type="text" />
                        </div>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Google Drive link</span>
                            </label>
                            <input
                                name='drive_link'
                                defaultValue={driveLink}
                                className='input input-bordered'
                                type="text" />
                        </div>
                        <label className="form-control  ">
                            <div className="label">
                                <span className="label-text">Pick an image</span>
                            </div>
                            <input
                                type="file"
                                name='material_image'
                                className="file-input file-input-bordered w-full " />
                        </label>
                        {/* Actions */}
                        <div className="flex justify-center space-x-4 mt-8">
                            <button
                                type='submit'
                                className="btn btn-primary">
                                Update
                            </button>
                            <button
                                type='btn'
                                onClick={() => setShowModal(false)}
                                className="btn btn-error" >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
                {uploading && <div className='absolute inset-0 flex justify-center items-center bg-black bg-opacity-20 z-50'><span className='loading loading-spinner'></span></div>}
            </div>
        </div>
    );
};

export default UpdateMaterialModal;