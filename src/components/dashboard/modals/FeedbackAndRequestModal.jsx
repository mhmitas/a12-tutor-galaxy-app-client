import React from 'react';
import { GoX } from "react-icons/go";

const FeedbackAndRequestModal = ({ setShowModal }) => {
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
                <div className="space-y-3 mt-4">
                    <p className='font-semibold'>You can send another new approval request to the admin</p>
                    <button
                        className="btn btn-sm btn-primary">
                        Send Request
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeedbackAndRequestModal;