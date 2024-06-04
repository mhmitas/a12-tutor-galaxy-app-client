import React, { useState } from 'react';
import { GoX } from "react-icons/go";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast'

const ApprovalModal = ({ session, setShowModal, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const [processing, setProcessing] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        const registration_fee = parseFloat(e.target.registration_fee.value)
        setProcessing(true)
        const updateDoc = { status: 'approved', registration_fee }
        try {
            const { data } = await axiosSecure.patch(`/study-sessions/update-by-admin/${session?._id}`, updateDoc)
            console.log(data);
            refetch()
            if (data.modifiedCount > 0) {
                toast.success('Approved')
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
                    <h3 className='card-title'>{session?.session_title}</h3>
                </div>
                <div className='divider my-0'></div>
                <form onSubmit={handleSubmit} className="space-y-3 mt-4">
                    <p className='font-semibold pb-1'>Please, fix the registration fee to approve the session.</p>
                    <div className="form-control gap-2">
                        <label className="label-text">Registration Fee</label>
                        <input
                            required
                            name='registration_fee'
                            type="number"
                            className="input input-bordered"
                        />
                    </div>
                    <div className="flex justify-center gap-4 pt-5">
                        <button
                            type='submit'
                            className="btn btn-sm btn-primary">
                            Approve
                        </button>
                        <button
                            onClick={() => setShowModal(false)}
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

export default ApprovalModal;