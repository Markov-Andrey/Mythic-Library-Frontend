import React from "react";

const ExpBar = ({ exp }) => {
    const percentage = (exp.exp / exp.exp_next_level) * 100;

    const stripeStyle = {
        width: `${percentage}%`,
        transition: "width 0.5s ease-in-out",
    };

    const tooltipContent = `${exp.exp}/${exp.exp_next_level}`;

    return (
        <div className="relative w-full min-w-max rounded-full shadow-md">
            <div className="flex w-full min-w-max rounded-full overflow-hidden">
                <div className="h-5 bg-stone-500" style={stripeStyle} />
                <div className="h-5 bg-gray-200" style={{ flex: 1 }} />
            </div>
            {exp.exp > 0 && (
                <div
                    className="absolute top-1/2 font-bold transform -translate-y-1/2"
                    style={{ left: `${percentage + 2}%` }}
                >
                    {tooltipContent}
                </div>
            )}
        </div>
    );
};

export default ExpBar;
