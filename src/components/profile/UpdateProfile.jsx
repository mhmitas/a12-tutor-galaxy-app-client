import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import uploadImage from '../../utils/uploadImage';
import toast from "react-hot-toast";

const UpdateProfile = ({ setShowUpdateForm }) => {
    const [isUpdateProcessing, setIsUpdateProcessing] = useState(false)
    const axiosSecure = useAxiosSecure()
    const { handleSubmit, register } = useForm()
    const { user, authLoading, updateUserProfile } = useAuth()

    const { data: userData = {}, isLoading, refetch, error } = useQuery({
        queryKey: ['update-profile-data', user],
        queryFn: async () => {
            const { data } = await axiosSecure(`/users/role/${user?.email}?a=b`)
            console.log(data);
            return data
        }

    })

    async function onSubmit(form_data, event) {
        setIsUpdateProcessing(true)
        const image_file = event.target.image_file.files[0]
        let image = userData?.image || user?.photoULR || null;

        try {
            // upload image in imgBB
            if (image_file) {
                const imageUrl = await uploadImage(image_file)
                image = imageUrl
            }
            const updateUserInfo = { ...form_data, image }
            // update in database
            const res = await axiosSecure.patch(`/api/user/update-profile/${user?.email}`, updateUserInfo)
            console.log(res.data);
            // update in firebase
            updateUserProfile(form_data?.name, image)
            if (res.data.modifiedCount > 0) {
                toast.success('Profile Updated')
                setShowUpdateForm(false)
            }
            refetch()
            setIsUpdateProcessing(false)
        } catch (err) {
            console.error(err);
            setIsUpdateProcessing(false)
        }
    }

    if (authLoading || isLoading) {
        return <span>Loading...</span>
    }

    return (
        <div className="bg-base-100 p-6 rounded-lg shadow-lg max-w-md mx-auto ">
            <h2 className="text-2xl font-bold text-center mb-4 text-primary">Update Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input required {...register('name')} defaultValue={userData?.name || user?.displayName} type="text" placeholder="Your Name" className="input input-bordered w-full" />
                </div>
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input readOnly defaultValue={userData?.email} type="text" placeholder="Your Email" className="input input-bordered w-full" />
                </div>
                {/* image */}
                <label className="form-control mb-4">
                    <div className="label">
                        <span className="label-text">Profile Image</span>
                    </div>
                    <input name='image_file' type="file" className="file-input w-full " />
                </label>
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Phone</span>
                    </label>
                    <input {...register('phone')} defaultValue={userData?.phone} type="tel" placeholder="Your Phone Number" className="input input-bordered w-full" />
                </div>
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Address</span>
                    </label>
                    <textarea defaultValue={userData?.address && userData?.address} {...register('address')} placeholder="Your Address" className="textarea textarea-bordered w-full"></textarea>
                </div>
                <div className=" flex items-center justify-center gap-4 mt-6">
                    <button type='submit' disabled={isUpdateProcessing} className="btn btn-primary">{isUpdateProcessing ?
                        <span className='loading loading-spinner'></span> :
                        'Update Profile'
                    }</button>
                    <button onClick={() => setShowUpdateForm(false)} type='button' disabled={isUpdateProcessing} className="btn  btn-neutral hover:btn-error">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfile;
