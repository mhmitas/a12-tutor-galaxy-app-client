import React, { useState } from 'react';
import Heading from '../../../components/common/Heading';
import { useForm } from 'react-hook-form';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from "react-date-range";
import useAuth from '../../../hooks/useAuth';
import axios from "axios";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast, { } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

// TODO: have to fix loading states
const CreateStudySession = () => {
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [submitting, setSubmitting] = useState(false)
    const { register, handleSubmit, reset } = useForm()
    const [registrationDate, setRegistrationDate] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    const [classDate, setClassDate] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);


    async function onSubmit(data) {
        setSubmitting(true)
        const classDuration = { startDate: classDate[0].startDate, endDate: classDate[0].endDate, }
        const registrationDuration = { regStart: registrationDate[0].startDate, regEnd: registrationDate[0].endDate }
        let thumbnail_image = 'https://i.ibb.co/fGVzbks/default-learning.jpg'
        const ThumbnailImage = { image: data.thumbnail_image[0] }
        try {
            // upload img in img-bb
            if (data.thumbnail_image[0]) {
                const imgbbRes = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`, ThumbnailImage, {
                    headers: { "Content-Type": "multipart/form-data" }
                })
                thumbnail_image = imgbbRes.data.data.display_url
            }
            const sessionInfo = { ...data, classDuration, registrationDuration, status: 'pending', thumbnail_image }
            // post on database
            const res = await axiosSecure.post('/study-sessions', sessionInfo)
            console.log(res.data);
            toast.success('Session created. Please wait admins will respond soon')
            reset()
            navigate('/dashboard/all-study-sessions')
            setSubmitting(false)
        } catch (err) {
            console.error(err);
            setSubmitting(false)
        }

        // console.table({ ...data, classDuration, registrationDuration, status: 'pending', thumbnail_image });
    }


    return (
        <div>
            <Heading heading="Create Study Session" />
            <section className='mt-8 mb-20'>
                <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 md:grid-cols-2 gap-6 bg-base-100 p-8 max-w-screen-lg mx-auto rounded-md relative'>
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
                    <div className='flex flex-col lg:flex-row  gap-6 overflow-x-auto md:col-span-2 '>
                        {/* registration duration */}
                        <div className="">
                            <label className="label">
                                <span className="label-text text-lg">Select registration start to end date</span>
                            </label>
                            <DateRange className=''
                                editableDateInputs={true}
                                onChange={item => setRegistrationDate([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={registrationDate}
                            />
                        </div>
                        {/* class start to end date duration */}
                        <div className="">
                            <label className="label">
                                <span className="label-text text-lg">Select Class Start and End Date</span>
                            </label>
                            <DateRange className=''
                                editableDateInputs={true}
                                onChange={item => setClassDate([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={classDate}
                            />
                        </div>
                    </div>
                    <div className="form-control md:col-span-2">
                        <label className="label">
                            <span className="label-text">Session Description</span>
                        </label>
                        <textarea required {...register('session_description')} className="textarea textarea-bordered" placeholder="About session"></textarea>
                    </div>
                    <div className='text-center w-full md:col-span-2'>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Choose a Image</span>
                            </div>
                            <input {...register('thumbnail_image')} type="file" className="file-input file-input-bordered w-full max-w-xs" />
                        </label>
                    </div>
                    <div className='text-center w-full md:col-span-2 mt-8'>
                        <button disabled={submitting} type='submit' className='btn btn-primary'>{submitting ? <span className='loading loading-spinner'></span> : 'Submit'}</button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default CreateStudySession;