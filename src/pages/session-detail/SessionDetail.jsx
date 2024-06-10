import React from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { differenceInCalendarDays, format, formatISO } from "date-fns";
import useRole from '../../hooks/useRole';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import useMyBookingIds from '../../hooks/useMyBookingIds';

const SessionDetail = () => {
    const navigate = useNavigate()
    const { user, authLoading } = useAuth()
    const [role, isLoading] = useRole()
    const axiosSecure = useAxiosSecure()
    const { id } = useParams()

    // get detail data of the session
    const { data = {}, isPending: dataLoading, refetch } = useQuery({
        queryKey: ['session-detail', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/study-sessions/detail/${id}`)
            // console.log(data);
            return data
        }
    })

    // get booked sessions ids by current user/student
    const [usersBooedIds, isIdsLoading, refetchUsersBooedIds] = useMyBookingIds()

    // get session's review from database:
    const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
        queryKey: ['session-reviews', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/reviews/${id}`)
            // console.log(data);
            return data
        }
    })

    const averageRatings = reviews?.reduce((total, review) => total + review.rating, 0) / reviews?.length || 0
    // console.log(averageRatings);

    // destructuring from loaded detail data
    const { session_title, thumbnail_image, tutor_email, tutor_name, registrationDuration, registration_fee, classDuration, session_description } = data;

    // deal with date
    const regStartDate = data?.registrationDuration?.regStart;
    const regEndDate = data?.registrationDuration?.regEnd;
    let dateValidation;
    if (regEndDate && regStartDate && !dataLoading) {
        dateValidation = differenceInCalendarDays(
            new Date(regEndDate),
            new Date(),
        )
    }

    if (dataLoading || isIdsLoading || authLoading || isLoading) {
        return <span>Loading...</span>
    }

    let isBooked = usersBooedIds?.includes(data?._id)

    async function handleBookNowButton() {
        if (isBooked) {
            return toast('You have already booked this session')
        }
        // does the session is free?  
        if (Number(registration_fee) === 0) {
            const sessionData = {
                session_title, tutor_email, tutor_name, registrationDuration, classDuration,
                sessionId: data._id,
                userName: user?.displayName,
                userEmail: user?.email,
                bookingDate: formatISO(new Date())
            }
            try {
                const res = await axiosSecure.post(`/bookings`, sessionData)
                console.log(res.data);
                if (res.data.insertedId) {
                    toast.success('Session Booked')
                }
                refetch()
                refetchUsersBooedIds()
            } catch (err) {
                console.error(err);
            }
            return
        }
        // in not free make payment
        navigate(`/payment/${id}`)
    }


    return (
        <div>
            <section className="bg-base-100 my-10">
                <div className="mx-auto p-6 shadow-md rounded-lg">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-4">
                        <img src={thumbnail_image} alt="Session Thumbnail" className="w-full lg:min-w-[33%] lg:w-1/3 rounded-lg max-h-[450px]" />
                        <div className="">
                            <h1 className="text-2xl font-bold mb-2">{session_title}</h1>
                            <div className="mb-3">
                                <p className='text-lg'><strong>Tutor:</strong> {tutor_name}</p>
                                <p className='text-sm'><strong>Email:</strong> {tutor_email}</p>
                            </div>
                            <div className="flex items-center mb-2">
                                <div className="rating">
                                    <Rating readOnly value={averageRatings} style={{ maxWidth: 150 }} />
                                </div>
                                <span className="ml-2 ">{averageRatings}</span>
                            </div>
                            <p className="mb-4">{session_description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <p><strong>Registration Start Date:</strong> {format(new Date(registrationDuration?.regStart), 'dd MMM yyyy')}</p>
                                <p><strong>Registration End Date:</strong> {format(new Date(registrationDuration?.regEnd), 'dd MMM yyyy')}</p>
                                <p><strong>Class Start Date:</strong> {format(new Date(classDuration?.startDate), 'dd MMM yyyy')}</p>
                                <p><strong>Class End Date:</strong> {format(new Date(classDuration?.endDate), 'dd MMM yyyy')}</p>
                                <p><strong>Session Duration:</strong> {data.session_duration || data['Session Duration']}</p>
                                <p><strong>Registration Fee:</strong> ${registration_fee}</p>
                            </div>
                            {
                                role === 'student' &&
                                <button
                                    onClick={handleBookNowButton}
                                    className="btn btn-primary mt-4"
                                    disabled={dateValidation < 0 && true}
                                >{dateValidation < 0 ?
                                    'Registration Closed' :
                                    isBooked ?
                                        'Booked' :
                                        'Book Now'
                                    }
                                </button>
                            }
                        </div>
                    </div>
                    <div className="mt-8 lg:mt-32">
                        <h2 className="text-xl font-bold">Reviews</h2>
                        {reviews.length < 1 && <span>Not available</span>}
                        <div className="space-y-4">
                            {reviewsLoading ?
                                <span>Loading...</span> :
                                reviews.map(review => <div key={review._id} className="p-4 rounded-lg shadow-lg">
                                    <p className="font-semibold">{review?.userEmail}</p>
                                    <Rating readOnly value={review?.rating} style={{ maxWidth: 70 }} />
                                    <p className="">{review?.review}</p>
                                </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SessionDetail;