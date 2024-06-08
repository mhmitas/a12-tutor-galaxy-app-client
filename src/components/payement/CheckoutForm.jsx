import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { formatISO } from "date-fns";

const CheckoutForm = ({ session, setComplete }) => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [errorMessage, setErrorMessage] = useState('')
    const [processing, setProcessing] = useState(false)
    const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe()
    const elements = useElements()

    const { session_title, tutor_email, tutor_name, registration_fee, classDuration } = session

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: registration_fee })
            .then((res) => {
                // console.log('clientSecret:', res.data?.clientSecret);
                setClientSecret(res.data?.clientSecret)
            })
    }, [])


    async function handleSubmit(event) {
        event.preventDefault()
        setProcessing(true)

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('[error]', error);
            setErrorMessage(error.message)
            setProcessing(false)
            return
        } else {
            setErrorMessage('')
            console.log('[PaymentMethod]', paymentMethod);
        }

        if (!clientSecret) return

        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName,
                    email: user?.email
                }
            }
        })
        if (confirmError) {
            setErrorMessage(confirmError.message)
            console.log(confirmError);
            setProcessing(false)
        }
        console.log(paymentIntent);
        if (paymentIntent.status === 'succeeded') {
            const sessionData = {
                session_title, tutor_email, tutor_name, classDuration, registration_fee,
                sessionId: session._id,
                userName: user?.displayName,
                userEmail: user?.email,
                uid: user?.uid,
                bookingDate: formatISO(new Date()),
                // payment info
                paymentInfo: {
                    amount: paymentIntent?.amount,
                    paymentId: paymentIntent?.id
                }
            }
            try {
                const res = await axiosSecure.post(`/bookings`, sessionData)
                console.log(res.data);
                if (res.data.insertedId) {
                    toast.success('Congratulation! Payment successful')
                    setComplete(true)
                }
            } catch (err) {
                console.error(err);
                setErrorMessage(err.message)
                setProcessing(false)
            }

            console.log('paymentIntent:', paymentIntent);
            setErrorMessage('')
            setProcessing(false)
        }

    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {errorMessage && <p className='text-error mb-4'>{errorMessage}</p>}
                <div className='flex justify-center'>
                    <button type="submit" disabled={!stripe || processing} className="btn btn-primary btn-sm rounded-sm">Pay ${registration_fee}</button>
                </div>
                {processing && <div className='absolute z-50 inset-0 flex justify-center items-center bg-black bg-opacity-20'><span className='loading loading-spinner '></span></div>}
            </form>
        </div>
    );
};

export default CheckoutForm;