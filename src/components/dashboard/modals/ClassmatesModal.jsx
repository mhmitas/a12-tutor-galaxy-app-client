import React from 'react';

const ClassmatesModal = ({ classmates, setShowModal }) => {
    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-20 z-50'>
            <div className='shadow-xl p-6 bg-base-100 w-full max-w-md rounded-md mx-auto'>
                <div>
                    <h2 className="text-xl mb-4">All student of this session</h2>
                    <div>
                        {classmates?.map((classmate) => <div>

                        </div>)}
                    </div>
                </div>
                <div className="flex justify-center space-x-4 mt-8">
                    <button
                        className="btn btn-primary btn-sm">
                        Update
                    </button>
                    <button
                        onClick={() => setShowModal(false)}
                        className="btn btn-neutral btn-sm" >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClassmatesModal;