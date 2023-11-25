import React from "react";

const HealthBar = ({ health }) => {
    const percentage = (health.health_current / health.health_max) * 100;

    const stripeStyle = {
        width: `${percentage}%`,
        transition: "width 0.5s ease-in-out",
    };

    const tooltipContent = `${health.health_current}/${health.health_max}`;

    return (
        <div className="relative w-full min-w-max rounded-full shadow-md">
            <div className="flex w-full min-w-max rounded-full overflow-hidden">
                <div className="h-5 bg-red-700" style={stripeStyle} />
                <div className="h-5 bg-gray-300" style={{ flex: 1 }} />
            </div>
            {health.health_current > 0 && (
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

export default HealthBar;
