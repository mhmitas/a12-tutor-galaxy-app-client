import React, { useState } from 'react';
import uploadImage from '../../../utils/uploadImage';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const UploadMaterialsModal = ({ setShowModal, session }) => {
    const axiosSecure = useAxiosSecure()
    const [uploading, setUploading] = useState(false)

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (materials) => {
            const { data } = await axiosSecure.post(`/materials`, materials)
            return data
        },
        onSuccess: () => {
            setShowModal(false)
        },
        onError: (error) => {
            toast.error(error.message)
            setShowModal(false)
        }
    })

    async function handleSubmit(event) {
        event.preventDefault()
        const form = event.target;
        const driveLink = form.drive_link.value;
        // upload image on imgBB
        let imageUrl = null;
        try {
            setUploading(true)
            const materialImage = form.material_image?.files[0]
            if (form.material_image?.files[0]) {
                imageUrl = await uploadImage(materialImage)
            }
            const materials = { driveLink, imageUrl, sessionId: session._id, tutor_name: session?.tutor_name, tutor_email: session?.tutor_email }
            // post on db
            const result = await mutateAsync(materials)
            console.log(result);
            toast.success("Materials Uploaded")
            setUploading(false);
            // setShowModal(false)
        } catch (err) {
            console.log(err);
            setUploading(false);
            // setShowModal(false)
        }
    }

    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-10 z-50'>
            <div className='shadow-xl p-6 bg-base-100 w-full max-w-md rounded-md mx-auto relative'>
                <div className='space-y-1'>
                    <h2 className="text-2xl">{session.session_title}</h2>
                    <p>Session Id: {session._id}</p>
                    <p>Email: {session.tutor_email}</p>
                </div>
                <div className='divider my-2'></div>
                <div>
                    <h2 className="text-xl mb-4">Upload Materials:</h2>
                    {/* Form */}
                    <form onSubmit={handleSubmit} className=''>
                        <input
                            name='drive_link'
                            required
                            className='input input-bordered '
                            placeholder='Google Drive link'
                            type="text" />
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
                                Upload
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

export default UploadMaterialsModal;