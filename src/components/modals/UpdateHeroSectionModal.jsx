import React from 'react';

const UpdateHeroModal = ({ setShowModal }) => {
    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-20 z-50'>
            <div className='shadow-xl p-6 bg-white w-full max-w-md rounded-md mx-auto'>
                <div>
                    <h2 className="text-xl mb-4">Select an option</h2>
                    <select className="block w-full mb-4 p-2 border rounded">
                        <option value="">Choose an option</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                    </select>
                </div>
                <div className="flex justify-center space-x-4 mt-8">
                    <button
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded transition-transform transform hover:bg-blue-600 active:scale-95">
                        Update
                    </button>
                    <button
                        onClick={() => setShowModal(false)}
                        className="bg-rose-500 text-white font-semibold py-2 px-4 rounded transition-transform transform hover:bg-rose-600 active:scale-95" >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateHeroModal;