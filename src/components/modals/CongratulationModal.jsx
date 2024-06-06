import React from 'react';
import { useNavigate } from 'react-router-dom';

const CongratulateModal = ({ message = '', setShowModal }) => {
    const navigate = useNavigate()

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50"
        >
            <div className="bg-white text-black rounded-lg shadow-lg p-6 w-96">
                <div className="text-lg font-semibold mb-6">{message}</div>
                <div className="flex justify-center space-x-4">
                    <button className="btn btn-success" onClick={() => {
                        navigate('/dashboard/view-booked-sessions')
                        setShowModal(false)
                    }}>
                        Ok
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CongratulateModal;