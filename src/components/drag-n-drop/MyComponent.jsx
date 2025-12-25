import SuccessTooltip from './SuccessTooltip';

const MyComponent = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <SuccessTooltip message="Successfully saved!">
                <div className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                    Hover for Success
                </div>
            </SuccessTooltip>
        </div>
    );
};

export default MyComponent;
