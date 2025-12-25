import React from 'react';

const ModalSuccess = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    // Handle clicks on the backdrop to close the modal
    const handleBackdropClick = (e) => {
        if (e.target.id === 'modal-backdrop') {
            onClose();
        }
    };

    return (
        // Backdrop overlay
        <div
            id="modal-backdrop"
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
        >
            {/* Modal content container */}
            <div className="bg-white p-6 rounded-lg shadow-2xl w-11/12 max-w-lg mx-auto transform transition-all duration-300 scale-100">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition duration-150"
                    aria-label="Close modal"
                >
                    &times;
                </button>
                {/* Modal content */}
                {children}
            </div>
        </div>
    );
};

export default ModalSuccess;
