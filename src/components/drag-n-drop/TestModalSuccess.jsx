
import { useState } from 'react';
import ModalSuccess from './ModalSuccess'; // Adjust the import path as needed

function TestModalSuccess() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">React Tailwind Modal Example</h1>

            <button
                onClick={openModal}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150"
            >
                Open Popup Window
            </button>

            <ModalSuccess isOpen={isModalOpen} onClose={closeModal}>
                <h2 className="text-xl font-semibold mb-4">Popup Title</h2>
                <p>This is the content inside the popup window.</p>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={closeModal}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                    >
                        Close
                    </button>
                </div>
            </ModalSuccess>
        </div>
    );
}

export default TestModalSuccess;
