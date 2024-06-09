import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Controller, useForm } from "react-hook-form";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast'
import Classmates from '../../../components/dashboard/student-booked-session-detail/Classmates';

const BookedSessionDetail = () => {
    const { id } = useParams()
    const { user, authLoading } = useAuth()
    const axiosSecure = useAxiosSecure()
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            review: '',
            rating: 0,
        },
    });


    // get detail data of the session
    const { data: session = {}, isPending, refetch } = useQuery({
        queryKey: ['booked-session-detail', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/study-sessions/detail/${id}`)
            // console.log(data);
            return data
        }
    })
    const { session_title, thumbnail_image, tutor_email, tutor_name, classDuration, session_description } = session;

    // load materials of the session
    const { data: materials = [], isLoading: materialsLoading } = useQuery({
        queryKey: ['browse-a-sessions-materials', id],
        enabled: !authLoading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/materials/session/${id}`)
            // console.log(data);
            return data
        }
    })

    // review and rating function
    async function onSubmit(data) {
        const reviewInfo = {
            ...data,
            sessionId: session._id,
            userEmail: user?.email
        }
        try {
            const res = await axiosSecure.put('/reviews', reviewInfo)
            console.log(res.data);
            toast.success('Thanks')
            reset()
        } catch (err) {
            console.error(err);
        }
    }

    if (isPending || authLoading) {
        return <span>Loading...</span>
    }

    return (
        <div>
            <section className="my-10">
                <div className="container mx-auto p-6 shadow-md rounded-lg">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-4">
                        <img src={thumbnail_image} alt="Session Thumbnail" className="w-full lg:w-1/2 rounded-lg" />
                        <div className="lg:my-auto">
                            <h1 className="text-2xl font-bold mb-2">{session_title}</h1>
                            <div className="mb-3">
                                <p className='text-lg'><strong>Tutor:</strong> {tutor_name}</p>
                                <p className='text-sm'><strong>Email:</strong> {tutor_email}</p>
                            </div>
                            <p className="mb-4">{session_description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <p><strong>Class Start Date:</strong> {format(new Date(classDuration?.startDate), 'dd MMM yyyy')}</p>
                                <p><strong>Class End Date:</strong> {format(new Date(classDuration?.endDate), 'dd MMM yyyy')}</p>
                            </div>

                            {/* classmates section */}
                            <Classmates sessionId={id} />
                        </div>
                    </div>
                    {/* session contents */}
                    <div className=' mt-16'>
                        <h3 className='card-title my-2'>Materials</h3>
                        <div className='flex overflow-x-auto gap-3'>
                            {materials.map(material => <div key={material._id} className='card card-compact bg-base-100 w-max min-w-52 rounded-md'>
                                <div className='card-body'>
                                    <h3 className='card-title text-lg'>{material?.session_title}</h3>
                                    <div>Google Drive Link: <a className='link link-primary' target='_blank' href={material?.driveLink}>Click</a></div>
                                    <div>Image Link: <a className='link link-primary' target='_blank' href={material?.imageUrl}>Click</a></div>
                                </div>
                            </div>)}
                        </div>
                    </div>
                    <div className='mt-10'>
                        <h3 className='card-title my-2'>Videos</h3>
                        <div className='flex overflow-x-auto gap-3'>
                            <p>Coming soon</p>
                            <div className='card bg-base-100'>
                            </div>
                        </div>
                    </div>
                    {/* review section */}
                    <div className="mt-20">
                        <h2 className="text-xl mb-3">Please review this session</h2>
                        <div>
                            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center max-w-md p-6 bg-base-100 rounded-md'>
                                <div className='w-full flex flex-col justify-center items-center '>
                                    <div id="rating_label">Rating</div>
                                    <Controller
                                        control={control}
                                        name="rating"
                                        rules={{
                                            validate: (rating) => rating > 0,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Rating
                                                value={value}
                                                isRequired
                                                style={{ maxWidth: 180 }}
                                                onChange={onChange}
                                                visibleLabelId="rating_label"
                                                onBlur={onBlur}
                                            />
                                        )}
                                    />
                                    {errors.rating && <span className='text-error'>Rating is required.</span>}
                                    <label className="form-control  w-full">
                                        <div className="label">
                                            <span className="label-text">Your Review</span>
                                        </div>
                                        <textarea
                                            {...register('review', { required: true })}
                                            required
                                            className="textarea textarea-bordered h-24 max-w-md"
                                            placeholder="Your Review"
                                        ></textarea>
                                    </label>
                                </div>

                                <button className='btn btn-primary mt-6' type="submit">
                                    Submit review
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default BookedSessionDetail;