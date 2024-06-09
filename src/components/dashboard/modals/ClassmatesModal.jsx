import React from 'react';
import { GoMail, GoX } from "react-icons/go";

const ClassmatesModal = ({ classmates, setShowModal }) => {
    function handleOverlayClick(e) {
        if (e.target === e.currentTarget) {
            setShowModal(false)
        }
    }

    return (
        <div onClick={handleOverlayClick} className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-20 z-50'>
            <div className='max-w-lg w-full relative'>
                <div className='shadow-xl px-6 bg-base-200 w-full rounded-md mx-auto overflow-x-auto max-h-[90vh] py-10'>
                    <div>
                        <h2 className="text-xl mb-4">All student of this session</h2>
                        <div className='flex flex-col gap-3'>
                            {classmates?.map((classmate) => <ClassmateCard classmate={classmate} key={classmate?.email} />)}
                        </div>
                    </div>
                </div>
                <button onClick={() => setShowModal(false)} className="btn btn-sm hover:btn-error absolute top-4 right-4 btn-circle" ><GoX size={19} /></button>
            </div>
        </div>
    );
};

export default ClassmatesModal;

// ------------------

function ClassmateCard({ classmate }) {
    return (
        <div className='flex items-center justify-center w-full gap-2 bg-base-100 shadow-lg p-4 rounded-md font-semibold'>
            <div className="avatar">
                <div className="w-12 rounded-full">
                    <img src={classmate?.image || "https://i.ibb.co/tY0hxsg/default-profile.jpg"} />
                </div>
            </div>
            <div className='flex-1'>
                <h3 className='font-semibold'>Name: {classmate?.name}</h3>
                <p className='flex items-center gap-2'><GoMail /> <span className='link link-primary'>{classmate?.email}</span></p>
            </div>
        </div>
    )
}