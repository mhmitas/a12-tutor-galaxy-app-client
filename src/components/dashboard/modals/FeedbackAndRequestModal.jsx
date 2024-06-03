import React, { useState } from 'react';
import { GoX } from "react-icons/go";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast'

const FeedbackAndRequestModal = ({ sessionId, setShowModal, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const [processing, setProcessing] = useState(false)
    const [checked, setChecked] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault()
        setProcessing(true)
        const updateDoc = { status: 'pending' }
        try {
            const { data } = await axiosSecure.patch(`/study-sessions/update/${sessionId}`, updateDoc)
            console.log(data);
            refetch()
            if (data.modifiedCount > 0) {
                toast.success('Request Sent')
            }
            setShowModal(false)
            setProcessing(false)
        } catch (err) {
            console.error(err);
            toast.error(err?.message)
            setShowModal(false)
            setProcessing(false)
        }
    }

    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-10 z-50'>
            <div className='shadow-xl p-8 bg-base-100 w-full max-w-md rounded-md mx-auto relative'>
                <div>
                    <div className='mb-4'>
                        <h2 className="text-xl">Rejection Reason:</h2>
                        <p>The posting lacks details about the specific subject or topic of the study session.</p>
                    </div>
                    <div className='mb-4'>
                        <h2 className="text-xl">Feedback:</h2>
                        <p>Needs details: specify subject & target student level (beginner, intermediate, advanced).
                            Briefly mention your relevant qualifications.
                            Consider adding session details (date, time, duration).</p>
                    </div>
                </div>
                <button onClick={() => setShowModal(false)} className="btn btn-sm hover:btn-error absolute top-1 right-1 btn-circle" ><GoX size={19} /></button>
                <div className='divider my-0'></div>
                <form onSubmit={handleSubmit} className="space-y-3 mt-4">
                    <p className='font-semibold'>You can send another new approval request to the admin</p>
                    <div className="form-control gap-2">
                        <label className="label cursor-pointer justify-start gap-2">
                            <input
                                checked={checked}
                                onChange={(e) => setChecked(e.target.checked)}
                                type="checkbox"
                                className="checkbox checkbox-xs checkbox-primary"
                            />
                            <span className="label-text ">I will consider all feedback and improve the session</span>
                        </label>
                    </div>
                    <button
                        disabled={!checked}
                        className="btn btn-sm btn-primary">
                        Send Request
                    </button>
                </form>
                {processing &&
                    <div className='flex inset-0 bg-black bg-opacity-20 items-center justify-center absolute'><span className='loading loading-spinner'></span></div>
                }
            </div>
        </div>
    );
};

export default FeedbackAndRequestModal;