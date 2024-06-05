import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const CheckoutForm = ({ registration_fee }) => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [errorMessage, setErrorMessage] = useState('')
    const [processing, setProcessing] = useState(false)
    const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe()
    const elements = useElements()

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: registration_fee })
            .then((res) => {
                // console.log('clientSecret:', res.data?.clientSecret);
                setClientSecret(res.data?.clientSecret)
            })
    }, [])


    async function handleSubmit(event) {
        event.preventDefault()

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
        }
        if (paymentIntent) {
            console.log('paymentIntent:', paymentIntent);
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
                    <button type="submit" disabled={!stripe} className="btn btn-primary btn-sm rounded-sm">
                        Pay ${registration_fee}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;