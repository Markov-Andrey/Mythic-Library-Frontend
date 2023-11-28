import React from "react";

const HealthBar = ({ health }) => {
    const percentage = (health.health_current / health.health_max) * 100;
    const overflowPercentage = Math.max(0, (health.health_current - health.health_max) / health.health_max) * 100;

    const stripeStyle = {
        width: `${percentage > 100 ? 100 : percentage}%`,
        transition: "width 0.5s ease-in-out",
    };

    const overflowStyle = {
        width: `${Math.min(overflowPercentage, 100)}%`,
        transition: "width 0.5s ease-in-out",
    };

    const tooltipContent = `${health.health_current}/${health.health_max}`;

    return (
        <div className="relative w-full min-w-max rounded-full shadow-md">
            <div className="flex w-full min-w-max rounded-full overflow-hidden">
                {percentage > 100 && <div className="h-5 extra-health-bar" style={overflowStyle} />}
                <div className="h-5 health-bar" style={stripeStyle} />
                <div className="h-5 bg-gray-200" style={{ flex: 1 }} />
            </div>
            {health.health_current > 0 && (
                <div
                    className="absolute top-1/2 font-bold transform -translate-y-1/2"
                    style={{ left: `${Math.min(percentage + 2, 100)}%` }}
                >
                    {tooltipContent}
                </div>
            )}
        </div>
    );
};

export default HealthBar;
