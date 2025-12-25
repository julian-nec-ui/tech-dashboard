import { useState } from 'react';

const SuccessTooltip = ({ children, message }) => {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

    return (
        <div className="relative flex items-center group">
            {/* Trigger Element */}
            <div
                onDrop={() => setIsTooltipVisible(true)}
                onMouseLeave={() => setIsTooltipVisible(false)}
                className="cursor-pointer"
            >
                {children}
            </div>

            {/* Tooltip Element */}
            {isTooltipVisible && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                    <div className="px-3 py-1 text-sm text-white bg-green-600 rounded-lg shadow-lg whitespace-nowrap">
                        {message}
                    </div>
                    {/* Optional: Add a small arrow */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-t-4 border-t-green-600 border-l-4 border-l-transparent border-r-4 border-r-transparent"></div>
                </div>
            )}
        </div>
    );
};

export default SuccessTooltip;
