import React from 'react';
import Heading from '../../components/common/Heading';
import { useParams } from 'react-router-dom';
import useGetQuery from '../../hooks/useGetQuery';
import useAuth from '../../hooks/useAuth';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../components/payement/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK)

const Payment = () => {
    const { id } = useParams()
    const { user, authLoading } = useAuth()
    // console.log(id);
    const [data, isLoading, refetch, error] = useGetQuery(`payment-${id}`, `/study-sessions/detail/${id}`)

    const { session_title, thumbnail_image, tutor_email, tutor_name, registrationDuration, registration_fee, classDuration, session_description } = data

    if (isLoading || authLoading) {
        return <span>Loading...</span>
    }

    return (
        <div>
            <Heading heading={'💲Make your payment💲'} />
            {/* session info */}
            <div className='mb-40 mt-4'>
                <div className="max-w-md mx-auto bg-base-100 rounded-lg shadow-md overflow-hidden ">
                    <div className="flex flex-col p-4">
                        <div className="md:flex-shrink-0">
                            <img className="w-full object-cover rounded-md" src={thumbnail_image} alt="Session Thumbnail" />
                        </div>
                        <div className="p-4 mt-3">
                            <div className="uppercase tracking-wide  text-primary font-semibold">Study Session</div>
                            <h1 className="block mt-1 text-lg leading-tight font-medium hover:underline">
                                {session_title}
                            </h1>
                            <div className='divider my-2'></div>
                            <p className="mb-1 font-semibold">
                                Session Description
                            </p>
                            <div className="text-neutral-400">
                                <div className="">
                                    <p><strong>Tutor:</strong> {tutor_name}</p>
                                    <p className='text-xs'>{tutor_email}</p>
                                </div>
                                <p ><strong>Registration Fee:</strong> ${registration_fee} </p>
                            </div>
                            <div className='divider my-2'></div>
                            {/* checkout form */}
                            <Elements stripe={stripePromise}>
                                <CheckoutForm registration_fee={registration_fee} />
                            </Elements>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;