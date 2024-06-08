import React from 'react';
import { GoMail, GoX } from "react-icons/go";

const ClassmatesModal = ({ classmates, setShowModal }) => {
    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-20 z-50'>
            <div className='shadow-xl p-6 bg-base-200 w-full rounded-md mx-auto relative max-w-lg max-h-[90vh] overflow-x-auto'>
                <div>
                    <h2 className="text-xl mb-4">All student of this session</h2>
                    <div className='flex flex-col gap-3'>
                        {classmates?.map((classmate) => <div key={classmate?.userEmail}>
                            <div className='bg-base-100 shadow-lg p-2 rounded-md font-semibold'>
                                <h3 className='font-semibold'>Name: {classmate?.userName}</h3>
                                <p className='flex items-center gap-2'><GoMail /> <span className='link link-primary'>{classmate?.userEmail}</span></p>
                            </div>
                        </div>)}
                    </div>
                    <button onClick={() => setShowModal(false)} className="btn btn-sm hover:btn-error absolute top-1 right-1 btn-circle" ><GoX size={19} /></button>
                </div>
            </div>
        </div>
    );
};

export default ClassmatesModal;