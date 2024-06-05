import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import Heading from '../../common/Heading';

const UpdateStudySessionModal = ({ setShowUpdateModal }) => {
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { register, handleSubmit, reset } = useForm()

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setShowUpdateModal(false);
        }
    };

    return (
        <div onClick={handleOverlayClick} className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50'>
            <section className='shadow-xl w-[90vw] max-w-screen-lg rounded-md mx-auto bg-base-100'>
                <div className='max-w-screen-lg mx-auto rounded-t-md overflow-x-auto max-h-[90vh] overflow-y-auto bg-base-100 p-4'><Heading heading="Update Study Session" /></div>

                <form className='grid grid-cols-1 sm:grid-cols-2 gap-6 bg-base-100 p-8 max-w-screen-lg mx-auto rounded-md overflow-x-auto max-h-[90vh] overflow-y-auto z-50'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Tutor Name</span>
                        </label>
                        <input {...register('tutor_name')} readOnly defaultValue={user?.displayName} type="text" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Tutor Email</span>
                        </label>
                        <input {...register('tutor_email')} readOnly defaultValue={user?.email} type="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Session Title</span>
                        </label>
                        <input {...register('session_title')} type="text" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Session Duration</span>
                        </label>
                        <input {...register('session_duration')} type="text" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Registration Fee</span>
                        </label>
                        <input {...register('registration_fee')} defaultValue={0} readOnly type="text" className="input input-bordered" required />
                    </div>
                    {/* registration duration */}

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Registration Start Date</span>
                        </label>
                        <input name="regStart" type="date" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Registration End Date</span>
                        </label>
                        <input name="regEnd" type="date" className="input input-bordered" />
                    </div>
                    {/* <div className="divider divider-horizontal hidden md:flex"></div> */}
                    {/* class start to end date duration */}

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Class Start Date</span>
                        </label>
                        <input name="endDate" type="date" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Class End Date</span>
                        </label>
                        <input name="startDate" type="date" className="input input-bordered" />
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
                        <textarea required {...register('session_description')} className="textarea textarea-bordered" placeholder="About session"></textarea>
                    </div>

                    <div className='text-center w-full sm:col-span-2 mt-8'>
                        <button type='submit' className='btn btn-primary'>Submit</button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default UpdateStudySessionModal;