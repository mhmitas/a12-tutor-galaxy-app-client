import React, { useState } from 'react';
import { GoX } from "react-icons/go";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast'

const RejectSessionModal = ({ session, setShowRejectModal, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const [processing, setProcessing] = useState(false)
    console.log(session);
    async function handleSubmit(e) {
        e.preventDefault()
        const form = e.target
        const rejection_reason = form.rejection_reason.value
        const feedback = form.feedback.value
        const rejection_info = { rejection_reason, feedback };
        setProcessing(true)
        const updateDoc = { rejection_info, status: 'rejected' }
        try {
            const { data } = await axiosSecure.patch(`/study-sessions/update-by-admin/${session?._id}`, updateDoc)
            console.log(data);
            refetch()
            if (data.modifiedCount > 0) {
                toast.success('Rejection success')
            }
            setShowRejectModal(false)
            setProcessing(false)
        } catch (err) {
            console.error(err);
            toast.error(err?.message)
            setShowRejectModal(false)
            setProcessing(false)
        }
    }

    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-10 z-50'>
            <div className='shadow-xl p-8 bg-base-100 w-full max-w-md rounded-md mx-auto relative'>
                <div className='space-y-1'>
                    <h3 className='card-title'>Do you want to reject this session?</h3>
                    <p>Session: {session?.session_title}</p>
                    <p className='font-semibold pb-1'>To provide feedback and formally reject this session request, please complete the rejection form below.</p>
                </div>
                <div className='divider my-2'></div>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="form-control gap-2">
                        <label className="label-text">Rejection Reason </label>
                        <textarea required name="rejection_reason" className='textarea textarea-bordered'></textarea>
                    </div>
                    <div className="form-control gap-2">
                        <label className="label-text">Feedback </label>
                        <textarea required name="feedback" className='textarea textarea-bordered'></textarea>
                    </div>
                    <div className="flex justify-center gap-4 pt-5">
                        <button
                            type='submit'
                            className="btn btn-sm btn-primary">
                            Confirm
                        </button>
                        <button
                            onClick={() => setShowRejectModal(false)}
                            type='button'
                            className="btn btn-sm btn-error">
                            Cancel
                        </button>
                    </div>
                </form>
                {processing &&
                    <div className='flex inset-0 bg-black bg-opacity-20 items-center justify-center absolute'><span className='loading loading-spinner'></span></div>
                }
            </div>
        </div>
    );
};

export default RejectSessionModal;