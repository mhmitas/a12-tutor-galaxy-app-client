import React from 'react';

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50"
            onClick={handleOverlayClick}
        >
            <div className="bg-base-100 rounded-lg shadow-lg p-6 w-96">
                <h2 className="mb-2">Confirm Action</h2>
                <p className="text-lg font-semibold mb-6">{message}</p>
                <div className="flex justify-end space-x-4">
                    <button className="btn btn-primary" onClick={onConfirm}>
                        Confirm
                    </button>
                    <button className="btn btn-error" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;