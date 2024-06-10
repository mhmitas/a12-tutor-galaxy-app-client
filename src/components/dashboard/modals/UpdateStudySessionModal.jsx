import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import Heading from '../../common/Heading';
import "react-datepicker/dist/react-datepicker.css";
import uploadImage from '../../../utils/uploadImage';
import useRole from '../../../hooks/useRole';

// this is for admin
const UpdateStudySessionModal = ({ session, setShowModal, handleUpdate }) => {
    const [submitting, setSubmitting] = useState(false)
    const { user } = useAuth()
    const [role, roleLoading] = useRole()
    const { register, handleSubmit, reset } = useForm()
    // destructuring from loaded detail data
    const { session_title, thumbnail_image: old_image, tutor_email, tutor_name, registrationDuration, registration_fee, classDuration, session_description, session_duration } = session;

    const handleOverlayClick = (e) => {
        if (submitting) return
        if (e.target === e.currentTarget) {
            setShowModal(false);
        }
    };

    async function onSubmit(data, event) {
        const form = event.target;
        const regStart = form.regStart.value;
        const regEnd = form.regEnd.value;
        const startDate = form.startDate.value;
        const endDate = form.endDate.value;
        const registrationDuration = { regStart, regEnd }
        const classDuration = { startDate, endDate }
        setSubmitting(true)
        let thumbnail_image = old_image
        try {
            // upload img in img-bb
            if (data.thumbnail_image[0]) {
                const imgBbRes = await uploadImage(data.thumbnail_image[0])
                thumbnail_image = imgBbRes
                // console.log(thumbnail_image);
            }
            const sessionInfo = { ...data, classDuration, registrationDuration, thumbnail_image }
            // update session: call update function
            await handleUpdate(sessionInfo)
            setSubmitting(false)
        } catch (err) {
            console.error(err);
            setSubmitting(false)
        }

        // console.table({ ...data, classDuration, registrationDuration, status: 'pending', thumbnail_image });
    }

    if (roleLoading) {
        return <span>Loading...</span>
    }

    return (
        <div onClick={handleOverlayClick} className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50'>
            <section className='shadow-xl w-[90vw] max-w-screen-lg rounded-md mx-auto bg-base-100'>
                <div className='max-w-screen-lg mx-auto rounded-t-md overflow-x-auto max-h-[90vh] overflow-y-auto bg-base-100 p-4'><Heading heading="Update Study Session" /></div>

                <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 sm:grid-cols-2 gap-6 bg-base-100 p-8 max-w-screen-lg mx-auto rounded-md overflow-x-auto max-h-[90vh] overflow-y-auto z-50 relative'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Tutor Name</span>
                        </label>
                        <input readOnly defaultValue={tutor_name} type="text" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Tutor Email</span>
                        </label>
                        <input readOnly defaultValue={tutor_email} type="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Session Title</span>
                        </label>
                        <input {...register('session_title')} type="text" defaultValue={session_title} className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Session Duration</span>
                        </label>
                        <input {...register('session_duration')} type="text" defaultValue={session_duration ? session_duration : ''} className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Registration Fee</span>
                        </label>
                        <input defaultValue={registration_fee} readOnly={role !== 'admin'} type="text" className="input input-bordered" required />
                    </div>
                    {/* registration duration */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Registration Start Date</span>
                        </label>
                        <input defaultValue={getDefaultDate(registrationDuration?.regStart)} required name="regStart" type="date" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Registration End Date</span>
                        </label>
                        <input defaultValue={getDefaultDate(registrationDuration?.regEnd)} required name="regEnd" type="date" className="input input-bordered" />
                    </div>
                    {/* class duration */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Class Start Date</span>
                        </label>
                        <input defaultValue={getDefaultDate(classDuration?.startDate)} required name="endDate" type="date" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Class End Date</span>
                        </label>
                        <input defaultValue={getDefaultDate(classDuration?.endDate)} required name="startDate" type="date" className="input input-bordered" />
                    </div>
                    <div className='text-center w-full'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Choose a Image</span>
                            </div>
                            <input {...register('thumbnail_image')} type="file" className="file-input file-input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control sm:col-span-2">
                        <label className="label">
                            <span className="label-text">Session Description</span>
                        </label>
                        <textarea defaultValue={session_description} required {...register('session_description')} className="textarea textarea-bordered" placeholder="About session"></textarea>
                    </div>

                    <div className='text-center w-full sm:col-span-2 mt-8'>
                        <button disabled={submitting} type='submit' className='btn btn-primary'>Submit</button>
                    </div>
                    {submitting && <span className='loading loading-spinner absolute top-1/2 left-1/2'></span>}
                </form>
            </section>
        </div>
    );
};

export default UpdateStudySessionModal;

// const [regStartDate, setRegStartDate] = useState(new Date(registrationDuration?.regStart));
// const [regEndDate, setRegEndDate] = useState(new Date(registrationDuration?.regEndDate));
// const [classStartDate, setClassStartDate] = useState(new Date(classDuration?.startDate));
// const [classEndDate, setClassEndDate] = useState(new Date(classDuration?.endDate));

function getDefaultDate(date) {
    const today = new Date(date)
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const defaultValue = `${year}-${month}-${day}`;
    return defaultValue
}